import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { pickme_backend } from '../../../../../declarations/pickme_backend';
import { useAuth } from '../../../AuthProvider';
import { pickme_face_recognition } from '../../../../../declarations/pickme_face_recognition';

export default function FaceRecognition() {

    const { principal } = useAuth();
    const [progress, setProgress] = useState(10);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState('');
    const {eventId} = useParams();
    const [usernameTickets, setUsernameTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [event, setEvent] = useState('');

    useEffect(() => {
        pickme_backend.getTicketsByEventId(eventId).then((res) => {
            if (res.ok) {
                const allTicket = res.ok;
                const usernames = allTicket.map(ticket => ticket.username);
                setTickets(allTicket);
                setUsernameTickets(usernames);
            }
        });

        pickme_backend.getAllAttendanceByEventId(eventId).then((res) => {
            if (res.ok) {
                const attendances = res.ok;
                pickme_backend.getEventById(eventId).then((res) => {
                    if (res.ok) {
                        const eventDetail = res.ok;
                        setEvent(eventDetail);
                        const progress = attendances.length / eventDetail.total_ticket * 100;
                        setAttendance(attendances);
                        setProgress(progress);
                    }
                });
            }
        });
        
        document.querySelector('header').classList.add('d-none');
    },[]);

    const startFaceRecognition = async () => {
        document.querySelector('#start-attendance').classList.add('d-none');
        elem("recognize").onclick = recognize;
        elem("store").onclick = store;
        elem("file").onchange = load_local_image;
        elem("canvas").onclick = restart;
        elem("restart").onclick = restart;
        elem("video").oncanplay = () => {
            show("video");
            hide("image");
            hide("canvas");
        }

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                const video = elem("video");
                video.srcObject = stream;
                video.play();
                show("buttons");
            })
            .catch((err) => {
                show("image");
                hide("buttons");
                hide("video");
                hide("canvas");
                //   console.error(`An error occurred: ${err}`);
                message("Couldn't start camera, but you can upload photos.")
            });
    }

    // Returns a DOM element that is currently visible and contains an image.
    const select_visible_element = () => {
        const video = elem("video");
        const image = elem("image");
        const canvas = elem("canvas");
        if (!video.className.includes("d-none")) {
            return [video, video.videoWidth, video.videoHeight];
        } else if (!image.className.includes("d-none")) {
            return [image, image.width, image.height];
        } else {
            return [canvas, canvas.width, canvas.height];
        }
    }

    // Captures the image from the camera stream or from the image element or from
    // the canvas element depending on which one of them is visible.
    //
    // It also scales the image down to 320x240px such that it can be submitted to
    // the backend for face detection.
    const capture_image = async () => {
        let [image, width, height] = select_visible_element();

        const canvas = elem("canvas");
        canvas.width = width
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);

        const resized = document.createElement("canvas");
        resized.width = 320;
        resized.height = 240;
        let scale = Math.min(resized.width / canvas.width, resized.height / canvas.height);
        width = canvas.width * scale;
        height = canvas.height * scale;
        let x = resized.width / 2 - width / 2;
        let y = resized.height / 2 - height / 2;
        const ctx = resized.getContext("2d");
        if (ctx) {
            ctx.drawImage(canvas, x, y, width, height);
        }
        let bytes = await serialize(resized);

        if (video.srcObject) {
            video.srcObject.getTracks().forEach((track) => track.stop());
        }

        hide("video");
        hide("image");
        show("canvas")
        return [bytes, { scale, x, y }];
    }

    // Renders the bounding box around the face and also returns a small image of
    // the face that can be submitted to the backend for recognition.
    const render = async (scaling, box) => {
        box.left = Math.round((box.left * 320 - scaling.x) / scaling.scale);
        box.right = Math.round((box.right * 320 - scaling.x) / scaling.scale);
        box.top = Math.round((box.top * 240 - scaling.y) / scaling.scale);
        box.bottom = Math.round((box.bottom * 240 - scaling.y) / scaling.scale);

        const canvas = elem("canvas");

        const small = document.createElement("canvas");
        small.width = 160;
        small.height = 160;
        const ctx2 = small.getContext("2d");
        if (ctx2) {
            ctx2.drawImage(canvas, box.left, box.top, box.right - box.left, box.bottom - box.top, 0, 0, 140, 140);
        }
        let bytes = await serialize(small);

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.strokeStyle = "#0f3";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
            ctx.stroke();
        }

        return bytes;
    }

    // This function performs the following steps:
    // 1. Capture the image from the camera stream (or from the local file).
    // 2. Call the backend to detect the bounding box of the face in the image.
    // 3. Call the backend to recognize the face. 
    const recognize = async (event) => {
        event.preventDefault();
        hide("buttons");
        show("loader");
        message("Detecting face..");
        try {
            
            const [blob, scaling] = await capture_image();
            let result;
            result = await pickme_face_recognition.detect(new Uint8Array(blob));
            if (!result.Ok) {
                throw result.Err.message;
            }
            let face = await render(scaling, result.Ok);
            message("Face detected. Recognizing..");
            result = await pickme_face_recognition.recognize(new Uint8Array(face));
            if (!result.Ok) {
                throw result.Err.message;
            }
            let label = sanitize(result.Ok.label);
            let score = Math.round(result.Ok.score * 100) / 100;
            setUsername(label);
            const userTicket = tickets.find(ticket => ticket.username === label);
            if (usernameTickets.includes(label)) {
                pickme_backend.getAttendancesByUIdAndEventId(userTicket.user_id, eventId).then((res) => {
                    if (res.ok) {
                        const attendances = res.ok;
                        const attendance = attendances.find(attendance => attendance.username === label);
                        if (attendance) {
                            message(`Sorry ${label}, you have already attended this event.`);
                        } else {
                            pickme_backend.attendEvent(userTicket.user_id, label, eventId, userTicket.uuid, 'face').then((res) => {
                                if (res.ok) {
                                    setProgress(progress + 1);
                                }
                            });
                            message(`Selamat Datang ${label}, Enjoy the event!`);
                        }
                    }
                });
                message(`Selamat Datang ${label}, Enjoy the event!`);
            } else {
                message(`Sorry ${label}, you do not have a ticket for this event.`);
            }
            // message(`${label}, difference=${score}`);
        } catch (err) {
            message(err.toString());
        }
        hide("loader");
        show("restart");
        return false;
    }

    // This function performs the following steps:
    // 1. Capture the image from the camera stream (or from the local file).
    // 2. Call the backend to detect the bounding box of the face in the image.
    // 3. Ask the user for their name.
    // 4. Call the backend to store the image and the name of the user.
    const store = async (event) => {
        event.preventDefault();
        hide("buttons");
        show("loader");
        message("Detecting face..");
        try {
            const [blob, scaling] = await capture_image();
            let result;
            result = await pickme_face_recognition.detect(new Uint8Array(blob));
            if (!result.Ok) {
                throw result.Err.message;
            }
            let face = await render(scaling, result.Ok);
            message("Face detected. Adding..");
            let label = username;
            if (!label) {
                throw "cannot add without a name";
            }
            label = sanitize(label);
            message(`Face detected. Adding ${label}..`);
            result = await pickme_face_recognition.add(label, new Uint8Array(face));
            if (!result.Ok) {
                throw result.Err.message;
            }
            message(`Successfully added ${label}.`);
        } catch (err) {
            message("Failed to add the face: " + err.toString());
        }

        hide("loader");
        show("restart");
        return false;
    }

    // Invoked when a file is selected in the file input element. 
    // Loads the given file as an image to show to the user.
    const load_local_image = async (event) => {
        message("Load local image...");
        let image = elem("image");
        try {
            const file = event.target.files[0];
            if (!file) {
            return false;
            }
            const url = await toDataURL(file);
            image.src = url;
        } catch (err) {
            message("Failed to select photo: " + err.toString());
        }
        hide("video");
        hide("canvas");
        show("image");
        show("buttons");
        return false;
    }

    // Converts the given blob into a data url such that it can be assigned as a
    // target of a link of as an image source.
    const toDataURL = (blob) => {
        return new Promise((resolve, _) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onloadend = function () {
            resolve(fileReader.result);
            }
        });
    }

    // Restarts the face recognition / addition user flow.
    const restart = (event) => {
        
        hide("restart");
        message("");
        if (video.srcObject) {
            event.preventDefault();
        }
        navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            const video = elem("video");
            video.srcObject = stream;
            video.play();
            show("buttons");
        });
    }

    // Returns a DOM element by its id.
    const elem = (id) => {
        return document.getElementById(id);
    }

    // Makes the given DOM element visible.
    const show = (id) => {
        elem(id).className = "";
    }

    // Makes the given DOM element d-none.
    const hide = (id) => {
        elem(id).className = "d-none";
    }

    // Sets the message element's text to the given text.
    const message = (m) => {
        elem("message").innerText = m;
    }

    // Returns an PNG image from the canvas.
    const serialize = (canvas) => {
        return new Promise((resolve) => canvas.toBlob((blob) => blob.arrayBuffer().then(resolve), "image/png", 0.9));
    }

    // Sanitizes the name string by filtering out characters that are not letters,
    // numbers, spaces, and dashes.
    const sanitize = (name) => {
        return name.match(/[\p{L}\p{N}\s_-]/gu).join('');
    }


    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col-md-12">
                    <div className="card rounded-6 card-bg-dark text-start">
                        <div className="card-body p-5">
                            <h4 className="text-white mb-3">Attendance Progress So Far!</h4>
                            {/* <p className="fs-6 text-white-50">Let's fill in your personal data to get various attractive 
                                treatments and limited discounts by completing your personal data. No need to worry because 
                                this platform uses blockchain technology so only you can access all your data.</p> */}
                            <ProgressBar now={progress} label={`${progress}%`} />
                        </div>
                    </div>
                    <div className="card rounded-6 card-bg-dark text-center my-3">
                        <div className="card-body p-5">
                            <Button id="start-attendance" variant='light' className='mx-2' onClick={startFaceRecognition} >Start Attendance</Button>
                            <div>
                                <img id="loader" src="loader.svg" className="d-none text-white" />
                            </div>
                            <div id="toolbar">
                                <div id="buttons" className="d-none">
                                    <Button className='mx-2' variant='light' id="recognize">
                                        Recognize
                                    </Button>
                                    <Button className='mx-2 d-none' id="store" variant='light'>
                                        Add person
                                    </Button>
                                </div>
                                <div id="message" className="text-white" />
                                <div id="restart" className="d-none">
                                    <Button className='mx-2' variant='light'>
                                        Complete
                                    </Button>
                                </div>
                            </div>
                            <div className="container text-center mt-4">
                                <div>
                                    <label id="filelabel" htmlFor="file" className="clickable">
                                    <div id="camera">
                                        <img id="image"/>
                                        <video playsInline="" id="video" className="d-none" />
                                        <canvas id="canvas" className="d-none" />
                                    </div>
                                    </label>
                                    <input
                                    id="file"
                                    className="file d-none"
                                    name="file"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}