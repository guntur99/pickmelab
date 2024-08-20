import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { pickme_backend } from 'declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAuth } from '../AuthProvider';
import { pickme_face_recognition } from 'declarations/pickme_face_recognition';

export default function Navbar() {
    
    const { isAuth, principal, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [uname, setUname] = useState('');
    const [isRegistered, setIsRegistered] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [out, setLogout] = useState(false);
    const [existUsername, setExistUsername] = useState(false);
    const [isHide, setHide] = useState('d-none');
    const [restartFace, setRestartFace] = useState(false);
    const [faceRecognition, setFaceRecognition] = useState(false);
    const videoRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [error, setError] = useState('');
    const [stream, setStream] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogoutClose = () => setLogout(false);
    const handleLogoutShow = () => setLogout(true);

    useEffect(() => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                setIsRegistered(true);
                setUname(res.ok.username);
            }else{
                if (!isRegistered) {
                    handleShow(); //check if profile data is not completed

                    // startFaceRecognition();
                }
            }
        });
    }, []);

    function handleSignIn(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        pickme_backend.checkUsername(username).then((res) => {
            const available = res.ok;
            if (available.length === 0) {
                setExistUsername(false);
                setIsLoading(true);
                pickme_backend.register(principal, username, "", "", "", "", "Basic", "Basic", "", 50).then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setShow(false);
                    }
                });
            }else{
                setExistUsername(true);
            }
        });
    }

    const handleKeyUp = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length > 6) {
        console.log('Input has more than 6 characters');
        setFaceRecognition(true);
        } else {
        console.log('Input has 6 or fewer characters');
        setFaceRecognition(false);
        }
    };

    const startFaceRecognition = async () => {
        setFaceRecognition(true);
        hide("faceRecognition");
        showVisible("store")
        // elem("recognize").onclick = recognize;
        elem("store").onclick = store;
        // elem("file").onchange = load_local_image;
        elem("canvas").onclick = restart;
        elem("restart").onclick = restart;
        elem("video").oncanplay = () => {
            showVisible("video");
            hide("image");
            hide("canvas");
        }

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                const video = elem("video");
                video.srcObject = stream;
                video.play();
                showVisible("buttons");
            })
            .catch((err) => {
                showVisible("image");
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
    // It also scales the image down to 240x240px such that it can be submitted to
    // the backend for face detection.
    const capture_image = async () => {
        let [image, width, height] = select_visible_element();

        const canvas = elem("canvas");
        canvas.width = width
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);

        const resized = document.createElement("canvas");
        resized.width = 240;
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
        showVisible("canvas")
        return [bytes, { scale, x, y }];
    }

    // Renders the bounding box around the face and also returns a small image of
    // the face that can be submitted to the backend for recognition.
    const render = async (scaling, box) => {
        box.left = Math.round((box.left * 240 - scaling.x) / scaling.scale);
        box.right = Math.round((box.right * 240 - scaling.x) / scaling.scale);
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
    // const recognize = async (event) => {
    //     event.preventDefault();
    //     hide("buttons");
    //     showVisible("loader");
    //     message("Detecting face..");
    //         console.log('Detecting face..');
    //     try {
            
    //         const [blob, scaling] = await capture_image();
    //         let result;
    //         result = await pickme_face_recognition.detect(new Uint8Array(blob));
    //         if (!result.Ok) {
    //         throw result.Err.message;
    //         }
    //         console.log('result:',result);
            
    //         let face = await render(scaling, result.Ok);
    //         message("Face detected. Recognizing..");
    //         result = await pickme_face_recognition.recognize(new Uint8Array(face));
    //         if (!result.Ok) {
    //         throw result.Err.message;
    //         }
    //         let label = sanitize(result.Ok.label);
    //         let score = Math.round(result.Ok.score * 100) / 100;
    //         message(`${label}, difference=${score}`);
    //     } catch (err) {
    //         console.error(`An error occurred: ${err}`);
    //         message(err.toString());
    //     }
    //     hide("loader");
    //     showVisible("restart");
    //     return false;
    // }

    // This function performs the following steps:
    // 1. Capture the image from the camera stream (or from the local file).
    // 2. Call the backend to detect the bounding box of the face in the image.
    // 3. Ask the user for their name.
    // 4. Call the backend to store the image and the name of the user.
    const store = async (event) => {
        event.preventDefault();
        hide("buttons");
        hide("faceRecognition");
        hide("store");
        showVisible("loader");
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
            // let label = prompt("Enter name of the person");
            
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
            setHide('');
            message(`Successfully added ${label} face.`);
            hide("store");
            showVisible("continue");
        } catch (err) {
            console.error(`An error occurred: ${err}`);
            message("Failed to add the face: " + err.toString());
        }

        hide("loader");
        showVisible("restart");
        setRestartFace(true);
        setFaceRecognition(false);
        return false;
    }

    // Invoked when a file is selected in the file input element. 
    // Loads the given file as an image to show to the user.
    // const load_local_image = async (event) => {
    //     message("Load local image...");
    //     let image = elem("image");
    //     try {
    //         const file = event.target.files[0];
    //         if (!file) {
    //         return false;
    //         }
    //         const url = await toDataURL(file);
    //         image.src = url;
    //     } catch (err) {
    //         message("Failed to select photo: " + err.toString());
    //     }
    //     hide("video");
    //     hide("canvas");
    //     showVisible("image");
    //     showVisible("buttons");
    //     return false;
    // }

    // Converts the given blob into a data url such that it can be assigned as a
    // target of a link of as an image source.
    // const toDataURL = (blob) => {
    //     return new Promise((resolve, _) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(blob);
    //         fileReader.onloadend = function () {
    //         resolve(fileReader.result);
    //         }
    //     });
    // }

    // Restarts the face recognition / addition user flow.
    const restart = (event) => {
        hide("restart");
        hide("continue");
        showVisible("store");
        setRestartFace(false);
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
            showVisible("buttons");
        });
    }

    // Returns a DOM element by its id.
    const elem = (id) => {
        return document.getElementById(id);
    }

    // Makes the given DOM element visible.
    const showVisible = (id) => {
        if (id == "buttons") {
            elem(id).className = "";
        // } else if(id == "store"){
        //     elem(id).className = " btn btn-light ";
        } else {
            elem(id).className = " btn btn-light ";
        }
    }

    // Refresh page
    const stopFaceRecognition = () => {
        window.location.reload();
    }

    // Makes the given DOM element d-none.
    const hide = (id) => {
        console.log(id);
        
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
        <>
            <main>
                <div className="stretched dark">
                    <header id="header" className="dark header-size-md floating-nft-header floating-header" style={{ 
                        position: 'fixed',
                        overflow: 'hidden',
                        backgroundColor: '#333',
                        top: 0,
                        width: '100%',
                        zIndex: 999,
                    }} data-sticky-shrink="false">
                        <div id="header-wrap" className="border-0">
                            <div className="container">
                                <div className="header-row">
                                    <div id="logo" className="me-5">
                                        <NavLink to="/"><img src={`theme/images/icons/pick-me-logo.svg`} alt="Pick Me" className="pick-me-navbar py-3"/></NavLink>
                                    </div>
                                    <div className="header-misc ms-auto">
                                        <div className="header-misc ms-0">
                                            {isAuth &&
                                                <div className="header-misc">
                                                    <div className="header-misc-icon tooltips">
                                                        <Link className="header-icon-notification " to="/event/create">
                                                            <i className="bi-calendar-plus-fill text-light text-opacity-75"></i>
                                                        </Link>
                                                        <span className="tooltiptext fs-6">Event</span>
                                                    </div>
                                                    <div className="header-misc-icon tooltips">
                                                        <Link className="header-icon-notification " to="/profile">
                                                            <i className="bi-person-bounding-box text-light text-opacity-75"></i>
                                                        </Link>
                                                        <span className="tooltiptext fs-6">Profile</span>
                                                    </div>
                                                    <div className="header-misc-icon tooltips">
                                                        <button onClick={handleLogoutShow} id="logout" className="header-icon-notification">
                                                            <i className="bi-door-open-fill text-light text-opacity-75"></i>
                                                        </button>
                                                        <span className="tooltiptext fs-6">Logout</span>
                                                    </div>
                                                </div> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-wrap-clone"></div>
                    </header>
                    <div id="wrapper" className="noice-effect overflow-hidden"></div>
                </div>
            </main>

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Header>
                    <div className="mx-2 text-light fs-5 fw-bold">Sign In</div>
                </Modal.Header>
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Row className="my-1">
                            <Form.Label className="fs-6">Username (min. 6 chars)</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    required 
                                    isInvalid 
                                    className="text-light border" 
                                    minLength={7} 
                                    disabled={isLoading}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyUp={handleKeyUp} 
                                    style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                                    {existUsername === true ? 
                                    <Form.Control.Feedback className="fs-6" type="invalid">
                                        Please pick another username.
                                    </Form.Control.Feedback> 
                                    : 
                                    <></> 
                                    }
                            </InputGroup>
                        </Row>
                        <Row >
                          <div className="container mt-4">
                                            {/* <div> */}
                                                <label id="filelabel" htmlFor="file" className="clickable">
                                                {/* <div id="camera"> */}
                                                    <img id="image"/>
                                                    <video playsInline="" id="video" className="d-none" />
                                                    <canvas id="canvas" className="d-none" />
                                                {/* </div> */}
                                                </label>
                                                {/* <input
                                                id="file"
                                                className="file d-none"
                                                name="file"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                /> */}
                                            {/* </div> */}
                                            <div>
                                                <img id="loader" src="loader.svg" className="d-none" />
                                            </div>
                                            <div id="toolbar">
                                                <div id="buttons" className="d-none">
                                                    {/* <Button className='mx-2 d-none' id="recognize" variant='light'>
                                                        Recognize
                                                    </Button>
                                                    <Button className='mx-2 d-none' id="store" variant='light'>
                                                        Add Me
                                                    </Button> */}
                                                </div>
                                                <div id="message" />
                                                {/* <Button className='mx-2 d-none' id="restart" variant='light'>
                                                    Try Again!
                                                </Button> */}
                                            </div>

                                        </div>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button className='mx-2 d-none' id="store" variant='light'>Face Detection</Button>
                <Button id='restart' variant="light" className='d-none' onClick={restart} disabled={isLoading}>Restart Face AI</Button>
                <Button id='faceRecognition' variant="light" onClick={startFaceRecognition} disabled={!faceRecognition} >Start Face AI</Button>

                <Button id='continue' variant="light" className={isHide} onClick={handleSignIn} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> Loading...
                    </>
                    
                ):
                    "Continue"
                }
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={out} onHide={handleLogoutClose} size="" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Form.Label className="fs-5">Are you sure to Logout?</Form.Label>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleLogoutClose}>
                        No
                    </Button>
                    <Button variant="light" onClick={logout}>
                        Yes, logout!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}