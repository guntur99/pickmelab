import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
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

let packageMember = { id: 0, name: 'Member', desc: '0 Events and max 0 tickets/event', price: '0' };
let packageBronze = { id: 1, name: 'Bronze', desc: '3 Events and max 100 tickets/event', price: '20' };
let packageSilver = { id: 2, name: 'Silver', desc: '5 Events and max 500 tickets/event', price: '50' };
let packageGold = { id: 3, name: 'Gold', desc: '7 Events and max 5000 tickets/event', price: '100' };
let packageDiamond = { id: 4, name: 'Diamond', desc: '10 Events and max 10.000 tickets/event', price: '500' };
let listPackage = [
    { id: 0, name: 'Bronze', desc: '3 Events and max 100 tickets/event', price: '20' },
    { id: 1, name: 'Silver', desc: '5 Events and max 500 tickets/event', price: '50' },
    { id: 2, name: 'Gold', desc: '7 Events and max 5000 tickets/event', price: '100' },
    { id: 3, name: 'Diamond', desc: '10 Events and max 10.000 tickets/event', price: '500' },
];

export default function Profile() {
    const [principal, setPrincipal] = useState('');
    const [progress, setProgress] = useState(0);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [dob, setDob] = useState('');
    const [domicile, setDomicile] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('');
    const [profile, setProfile] = useState('');
    const [itemPackage, setItemPackage] = useState({});
    const [showPackage, setShowPackage] = useState(false);
    const [packages] = useState(listPackage);

    useEffect(() => {
        const data = window.localStorage.getItem('user');
        setPrincipal(data.replace(/"/g, ''));
        if ( data == null ) {
            return <Navigate to="/" />;
        };
        pickme_backend.checkUserById(data.replace(/"/g, '')).then((res) => {
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
                        setItemPackage(packageMember);
                        break;
                }
            }
        });
    },[]);

    const handleUpdate = (e) => {
        e.preventDefault();
        var count = 0;
        count += fullname == "" ? 1 : 0;
        count += username == "" ? 1 : 0;
        count += avatar == "" ? 1 : 0;
        count += dob == "" ? 1 : 0;
        count += domicile == "" ? 1 : 0;
        count += address == "" ? 1 : 0;
        setProgress(count*10);
        pickme_backend.updateProfile(principal, username, fullname, dob, domicile, address, "Member", avatar, progress).then((res) => {
            if (res) {
                alert('successfuly updated profile!')
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

    const [item, setItem] = useState({ selectedPackage: "Bronze" });
    const { selectedPackage } = item;

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
        pickme_backend.updateProfile(principal.replace(/"/g, ''), profile.username, profile.fullname, profile.dob, profile.domicile, profile.address, selectedPackage, profile.avatar, profile.progress).then((res) => {
            if (res) {
                setShowPackage(false);
                alert(`successfuly buy ${selectedPackage} package profile!`);
                window.location.reload();;
            }
        });
    };

    return (
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-3">
                    <div className="card rounded-6 card-bg-dark text-center">
                        <div className="card-body p-4">
                            <span className="fs-5 fw-bold text-primary-second">{userType} <i className="bi-check-circle-fill"></i></span>
                            <img src={avatar} alt="..." className="rounded-circle my-4 w-50 object-fit-cover" />
                            <h4 className="text-light">{fullname}<p className="fs-6 text-primary-second">@{username}</p></h4>
                        </div>
                    </div>
                    <div className="card rounded-6 card-bg-dark text-center mt-4">
                        <div className="card-body p-5">
                            <img src={`../theme/images/icons/1.svg`} alt="..." height="150" className="rounded-5 mb-5"/>
                            <h4 className="text-light mb-3">Need Help?</h4>
                            <p className="fs-6 text-light">Lorem ipsum dolor sit amet</p>
                            <a href="#" className="button button-large button-large gradient-color rounded-5 border-0 mt-4">Chat With Us</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card rounded-6 card-bg-dark text-start">
                        <div className="card-body p-5">
                            <h4 className="text-white mb-3">Your account is being verified!</h4>
                            <p className="fs-6 text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
                                        <Nav.Link className="text-light px-2" eventKey="setting">Setting</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content className="text-light mt-3 text-start">
                                    <Tab.Pane eventKey="personal"> 
                                        <Container className="my-1 text-light">
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
                                            </Row>
                                            <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Photo</Form.Label>
                                                    <Form.Control className="text-light border" type="file"
                                                    onChange={handleAvatar}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Username</Form.Label>
                                                    <Form.Control className="text-light border" type="text" value={username} placeholder="Username" 
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
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
                                    <Tab.Pane eventKey="setting">
                                        <h5 className='text-light'>You are <b className="text-primary-second">{userType}</b> Member now! You can create <b className="text-primary-second">{itemPackage.desc}</b>. 
                                            Upgrade for more frexibility!
                                        </h5>

                                        <Button variant="light" onClick={handlePackageShow}>
                                            Upgrade Package
                                        </Button>
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
                </div>
            </div>
        </div>
    )
}