import { useState, useEffect, useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { pickme_backend } from 'declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';
import Ticket from "./Ticket";
import { useAuth } from '../../AuthProvider';
import { pickme_face_recognition } from 'declarations/pickme_face_recognition';

let packageBasic = { id: 0, name: 'Basic', desc: '0 Events and max 0 tickets/event', price: '0' };
let packageBronze = { id: 1, name: 'Bronze', desc: '1 Events and max 100 tickets/event', price: '20' };
let packageSilver = { id: 2, name: 'Silver', desc: '3 Events and max 500 tickets/event', price: '100' };
let packageGold = { id: 3, name: 'Gold', desc: '3 Events and max 5.000 tickets/event', price: '1,000' };
let packageDiamond = { id: 4, name: 'Diamond', desc: '3 Events and max 50.000 tickets/event', price: '5,000' };
let listPackage = [
    { id: 0, name: 'Bronze', desc: '1 Events and max 100 tickets/event', price: '20' },
    { id: 1, name: 'Silver', desc: '3 Events and max 500 tickets/event', price: '100' },
    { id: 2, name: 'Gold', desc: '3 Events and max 5.000 tickets/event', price: '1,000' },
    { id: 3, name: 'Diamond', desc: '3 Events and max 50.000 tickets/event', price: '5,000' },
];

let resellerBasic = { id: 0, name: 'Basic', desc: '0 Events and max 0 tickets/event', price: '0' };
let resellerBronze = { id: 1, name: 'Bronze', desc: '1 Events and max 50 tickets/event', price: '20' };
let resellerSilver = { id: 2, name: 'Silver', desc: '3 Events and max 200 tickets/event', price: '100' };
let resellerGold = { id: 3, name: 'Gold', desc: '3 Events and max 1.000 tickets/event', price: '1,000' };
let resellerDiamond = { id: 4, name: 'Diamond', desc: '3 Events and max 5.000 tickets/event', price: '3,000' };
let listResellerPackage = [
    { id: 0, name: 'Bronze', desc: '1 Events and max 50 tickets/event', price: '20' },
    { id: 1, name: 'Silver', desc: '3 Events and max 200 tickets/event', price: '100' },
    { id: 2, name: 'Gold', desc: '3 Events and max 1.000 tickets/event', price: '1,000' },
    { id: 3, name: 'Diamond', desc: '3 Events and max 5.000 tickets/event', price: '3,000' },
];

export default function Profile() {

    const { principal } = useAuth();
    const [progress, setProgress] = useState(0);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [dob, setDob] = useState('');
    const [domicile, setDomicile] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('');
    const [resellerType, setResellerType] = useState('');
    const [profile, setProfile] = useState('');
    const [tickets, setTickets] = useState([]);
    const [itemPackage, setItemPackage] = useState({});
    const [resellerPackage, setResellerPackage] = useState({});
    const [showPackage, setShowPackage] = useState(false);
    const [showResellerPackage, setShowResellerPackage] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [modalTicket, setModalTicket] = useState({});
    const [modalTicketEvent, setModalTicketEvent] = useState({});
    const [packages] = useState(listPackage);
    const [item, setItem] = useState({ selectedPackage: "Bronze" });
    const { selectedPackage } = item;
    const [itemReseller, setItemReseller] = useState({ selectedReseller: "Bronze" });
    const { selectedReseller } = itemReseller;
    const videoRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                const profile = res.ok;
                setProfile(profile);
                setFullname(profile.fullname);
                setUsername(profile.username);
                setAvatar(profile.avatar);
                setDob(profile.dob);
                setDomicile(profile.domicile);
                setAddress(profile.address);
                setProgress(profile.progress);
                setUserType(profile.user_type);
                setResellerType(profile.reseller_type);
                getMemberPackage();
                getResellerPackage();
            }
        });

        pickme_backend.getAllTicketsByUId(principal).then((res) => {
            if (res.ok) {
                const tickets = res.ok;
                setTickets(tickets);
            }
        });
        
        // startFaceRecognition();

        // return () => {
        // // Cleanup function to stop the camera when the component unmounts
        // if (videoRef.current && videoRef.current.srcObject) {
        //     const stream = videoRef.current.srcObject;
        //     const tracks = stream.getTracks();

        //     tracks.forEach(track => track.stop());
        // }
        // };
    },[]);

    const updateSetting = () => {
        getMemberPackage();
        getResellerPackage();
    }

    const getMemberPackage = () => {
        switch (profile.user_type) {
            case "Bronze":
                setItemPackage(packageBronze);
                break;
            case "Silver":
                setItemPackage(packageSilver);
                break;
            case "Gold":
                setItemPackage(packageGold);
                break;
            case "Diamond":
                setItemPackage(packageDiamond);
                break;
            default:
                setItemPackage(packageBasic);
                break;
        }
    }

    const getResellerPackage = () => {
        switch (profile.reseller_type) {
            case "Bronze":
                setResellerPackage(resellerBronze);
                break;
            case "Silver":
                setResellerPackage(resellerSilver);
                break;
            case "Gold":
                setResellerPackage(resellerGold);
                break;
            case "Diamond":
                setResellerPackage(resellerDiamond);
                break;
            default:
                setResellerPackage(resellerBasic);
                break;
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        var count = 0;
        count += principal ? 1 : 0;
        count += fullname ? 1 : 0;
        count += username ? 1 : 0;
        count += avatar ? 1 : 0;
        count += dob ? 1 : 0;
        count += domicile ? 1 : 0;
        count += address ? 1 : 0;
        
        var lastProgress = (count+2)*10;
        setProgress((count+2)*10);
        pickme_backend.updateProfile(principal, username, fullname, dob, domicile, address, "Basic", "Basic", avatar, parseInt(lastProgress)).then((res) => {
            if (res) {
                window.location.reload();
            }
        });
    };
    
    const handleAvatar = (e) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
            setAvatar(data.result);
        })
        data.readAsDataURL(e.target.files[0]);
    };

    const handleChange = e => {
        e.persist();

        setItem(prevState => ({
        ...prevState,
        selectedPackage: e.target.value
        }));
    };

    const handlePackageClose = () => setShowPackage(false);
    const handlePackageShow = () => setShowPackage(true);
    const handleUpgradePackage = (e) => {
        pickme_backend.updateProfile(principal, profile.username, profile.fullname, profile.dob, profile.domicile, profile.address, selectedPackage, selectedReseller, profile.avatar, profile.progress).then((res) => {
            if (res) {
                setShowPackage(false);
                window.location.reload();;
            }
        });
    };

    const handleResellerChange = e => {
        e.persist();

        setItemReseller(prevState => ({
        ...prevState,
        selectedReseller: e.target.value
        }));
    };

    const handleResellerPackageClose = () => setShowResellerPackage(false);
    const handleResellerPackageShow = () => setShowResellerPackage(true);
    const handleResellerPackage = (e) => {
        pickme_backend.updateProfile(principal, profile.username, profile.fullname, profile.dob, profile.domicile, profile.address, selectedPackage, selectedReseller, profile.avatar, profile.progress).then((res) => {
            if (res) {
                setShowPackage(false);
                window.location.reload();;
            }
        });
    };

    const handleTicketClose = () => setShowTicket(false);
    const handleTicketShow = (data) => {
        const selectedTicket = tickets.filter((ticket) => ticket.uuid === data.uuid);
        if (selectedTicket) {
            pickme_backend.getEventById(selectedTicket[0].event_id).then((res) => {
                setModalTicketEvent(res.ok);
            });
        }
        setModalTicket(data)
        setShowTicket(true)
    };

    const startFaceRecognition = async () => {
        elem("start-face-ai").classList.add("d-none");
        elem("stop-face-ai").classList.remove("d-none");
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
            console.log('Detecting face..');
        try {
            
            const [blob, scaling] = await capture_image();
            let result;
            result = await pickme_face_recognition.detect(new Uint8Array(blob));
            if (!result.Ok) {
            throw result.Err.message;
            }
            console.log('result:',result);
            
            let face = await render(scaling, result.Ok);
            message("Face detected. Recognizing..");
            result = await pickme_face_recognition.recognize(new Uint8Array(face));
            if (!result.Ok) {
            throw result.Err.message;
            }
            let label = sanitize(result.Ok.label);
            let score = Math.round(result.Ok.score * 100) / 100;
            message(`${label}, difference=${score}`);
        } catch (err) {
            console.error(`An error occurred: ${err}`);
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
            message(`Successfully added new sample for ${label}.`);
        } catch (err) {
            console.error(`An error occurred: ${err}`);
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

    // Refresh page
    const stopFaceRecognition = () => {
        window.location.reload();
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
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-3">
                    <div className="card rounded-6 card-bg-dark text-center">
                        <div className="card-body p-4">
                            <span className="fs-5 fw-bold text-primary-second">{userType} <i className="bi-check-circle-fill"></i></span>
                            <img src={avatar ? avatar : "../theme/images/users/2.jpg"} alt="..." className="rounded-circle my-4 w-50 object-fit-cover" />
                            <h4 className="text-light">{fullname}<p className="fs-6 text-primary-second">@{username}</p></h4>
                        </div>
                    </div>
                    <div className="card rounded-6 card-bg-dark text-center mt-4">
                        <div className="card-body p-5">
                            <img src={`../theme/images/icons/1.svg`} alt="..." height="150" className="rounded-5 mb-5"/>
                            <h4 className="text-light mb-3">Need Help?</h4>
                            <p className="fs-6 text-light">Contact us for more info</p>
                            <a href="#" className="button button-large button-large gradient-color rounded-5 border-0 mt-4">Chat With Us</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card rounded-6 card-bg-dark text-start">
                        <div className="card-body p-5">
                            <h4 className="text-white mb-3">Your account is being verified!</h4>
                            <p className="fs-6 text-white-50">Let's fill in your personal data to get various attractive 
                                treatments and limited discounts by completing your personal data. No need to worry because 
                                this platform uses blockchain technology so only you can access all your data.</p>
                            <ProgressBar now={progress} label={`${progress}%`} />
                        </div>
                    </div>
                    <div className="card rounded-6 card-bg-dark text-center my-3">
                        <div className="card-body p-5">
                            <Tab.Container id="left-tabs" defaultActiveKey="personal">
                                <Nav variant="underline" defaultActiveKey="personal" className='fs-6'>
                                    <Nav.Item>
                                        <Nav.Link className="text-light px-2" eventKey="personal">Personal Detail</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="text-light px-2" eventKey="tickets">Tickets</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="text-light px-2" eventKey="faceai">Face AI</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="text-light px-2" onClick={updateSetting} eventKey="setting">Settings</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content className="text-light mt-3 text-start">
                                    <Tab.Pane eventKey="personal"> 
                                        <Container className="my-1 text-light">
                                            {/* <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Full Name</Form.Label>
                                                    <Form.Control className="text-light border" type="text" value={fullname} placeholder="Fullname" 
                                                    onChange={(e) => setFullname(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row> */}
                                            <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Full Name</Form.Label>
                                                    <Form.Control className="text-light border" type="text" value={fullname} placeholder="Fullname" 
                                                    onChange={(e) => setFullname(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Photo</Form.Label>
                                                    <Form.Control className="text-light border" type="file"
                                                    onChange={handleAvatar}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                                {/* <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Username</Form.Label>
                                                    <Form.Control className="text-light border" type="text" value={username} placeholder="Username" 
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col> */}
                                            </Row>
                                            <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Date of Birth</Form.Label>
                                                    <Form.Control className="text-light border" type="date" value={dob} placeholder="Date of Birth" 
                                                    onChange={(e) => setDob(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                                <Col className="pl-3 pr-5 text-start">
                                                    <Form.Label className="fs-6">Domicile</Form.Label>
                                                    <Form.Control className="text-light border" type="text" value={domicile} placeholder="Domicile" 
                                                    onChange={(e) => setDomicile(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col className="pl-3 pr-5 text-start">
                                                    <Form.Label className="fs-6">Address</Form.Label>
                                                    <Form.Control className="text-light border" as="textarea" value={address} rows={3} 
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row className='mt-3 text-end'>
                                                <Col>
                                                <Button variant="light" onClick={handleUpdate}>
                                                    Save Changes
                                                </Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tickets">
                                        <h5 className='text-light'>Your Tickets is here!
                                        </h5>
                                        <div className="col-12">
                                            <div className="row g-4">
                                                {tickets.map(ticket => (
                                                    <article key={ticket.uuid} className="col-xl-4 col-lg-4 col-sm-6 col-12 nft-media nft-graphics">
                                                        <div className="card rounded-6 overflow-hidden card-bg-dark">
                                                            <div className="card-body p-4">
                                                                <div className="m-0 position-relative">
                                                                    <img src={`../theme/images/events/event-ticket.png`} className="rounded-5 w-100 h-auto" alt="..."/>
                                                                    <div id="nft-counter1" className="nft-counter countdown countdown-inline customjs position-absolute start-0 top-0" data-year="2024" data-month="3" data-day="22" data-format="dHMS"></div>
                                                                </div>
                                                                <div className="row justify-content-between">
                                                                    <div className="col">
                                                                        <h4 className="text-white mb-2">{ticket.event_title}</h4>
                                                                        <h6 className="card-subtitle mb-2 text-white-50 color">{ticket.category} <i className="bi-check-circle-fill"></i></h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <Button variant="light" onClick={() => handleTicketShow(ticket)}>Show Ticket</Button>
                                                        </div>
                                                    </article>
                                                ))}
                                                <Ticket ticket={modalTicket} event={modalTicketEvent} showTicket={showTicket} handleTicketClose={handleTicketClose}/>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="faceai">
                                        <Button id='start-face-ai' variant='light' className='mx-2' onClick={startFaceRecognition} >Start Face AI Training</Button>
                                        <Button id='stop-face-ai' variant='dark' className='mx-2 d-none' onClick={stopFaceRecognition} >Stop Face AI Training</Button>
                                        <div className="container mt-4">
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
                                            <div>
                                                <img id="loader" src="loader.svg" className="d-none" />
                                            </div>
                                            <div id="toolbar">
                                                <div id="buttons" className="d-none">
                                                    <Button className='mx-2' id="store" variant='light'>
                                                        Add New Sample
                                                    </Button>
                                                    <Button className='mx-2' variant='dark' id="recognize">
                                                        Recognize
                                                    </Button>
                                                </div>
                                                <div id="message" />
                                                <div id="restart" className="d-none">
                                                    <Button className='mx-2' variant='light'>
                                                        Back
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="setting">
                                        <div>
                                            <h5 className='text-light'>You are <b className="text-primary-second">{userType}</b> Member now! You can create <b className="text-primary-second">{itemPackage.desc}</b>. 
                                                Upgrade for more frexibility!
                                            </h5>

                                            <Button variant="light" onClick={handlePackageShow}>
                                                Upgrade Package
                                            </Button>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className='text-light'>You are <b className="text-primary-second">{resellerType}</b> Reseller! 
                                            You can create <b className="text-primary-second">{resellerPackage.desc}</b>.
                                            Buy package for more ticket bundling <b className="text-primary-second">exclusive for Reseller only</b>. Upgrade for more frexibility!
                                            </h5>

                                            <Button variant="warning" onClick={handleResellerPackageShow}>
                                                Buy Reseller Package
                                            </Button>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>

                    <Modal show={showPackage} onHide={handlePackageClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                        <Modal.Header closeButton>
                            <div className="mx-2 text-light fs-5 fw-bold">Committee Package</div>
                        </Modal.Header>
                        <Modal.Body>
                            <Container className="my-1 text-light">
                                <Row className="my-1">
                                    <Col className="pl-5 pr-3 text-start">
                                        <Form.Group controlId="selectedPackage">
                                            {packages.map(item => (
                                                <Form.Check
                                                key={item.id}
                                                value={item.name}
                                                type="radio"
                                                aria-label={`radio ${item.id}`}
                                                label={`[`+item.name+`] $`+item.price+` for `+item.desc}
                                                onChange={handleChange}
                                                checked={selectedPackage === item.name}
                                                style={{ fontSize: 16 }}
                                                />
                                            ))}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="light" onClick={handleUpgradePackage}>
                            Upgrade Package
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showResellerPackage} onHide={handleResellerPackageClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                        <Modal.Header closeButton>
                            <div className="mx-2 text-light fs-5 fw-bold">Reseller Package</div>
                        </Modal.Header>
                        <Modal.Body>
                            <Container className="my-1 text-light">
                                <Row className="my-1">
                                    <Col className="pl-5 pr-3 text-start">
                                        <Form.Group controlId="selectedPackage">
                                            {listResellerPackage.map(item => (
                                                <Form.Check
                                                key={item.id}
                                                value={item.name}
                                                type="radio"
                                                aria-label={`radio ${item.id}`}
                                                label={`[`+item.name+`] $`+item.price+` for `+item.desc}
                                                onChange={handleResellerChange}
                                                checked={selectedReseller === item.name}
                                                style={{ fontSize: 16 }}
                                                />
                                            ))}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="light" onClick={handleResellerPackage}>
                            Buy Package
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}