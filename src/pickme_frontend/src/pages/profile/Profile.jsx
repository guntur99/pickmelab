import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { pickme_backend } from 'declarations/pickme_backend';


export default function Profile() {
    const [principal, setPrincipal] = useState('');
    const [progress, setProgress] = useState(0);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [dob, setDob] = useState('');
    const [domicile, setDomicile] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const data = window.localStorage.getItem('user');
        setPrincipal(data.replace(/"/g, ''));
        if ( data == null ) {
            return <Navigate to="/" />;
        };
        var count = 0;
        pickme_backend.checkUserById(data.replace(/"/g, '')).then((res) => {
            if (res.ok) {
                const resProfile = res.ok;
                setFullname(resProfile.fullname);
                setUsername(resProfile.username);
                setAvatar(resProfile.avatar);
                setDob(resProfile.dob);
                setDomicile(resProfile.domicile);
                setAddress(resProfile.address);
            }
        });
        
        count += fullname == "" ? 1 : 0;
        count += username == "" ? 1 : 0;
        count += avatar == "" ? 1 : 0;
        count += dob == "" ? 1 : 0;
        count += domicile == "" ? 1 : 0;
        count += address == "" ? 1 : 0;
        setProgress(count*10);
    },[]);

    const handleUpdate = (e) => {
        e.preventDefault();
        pickme_backend.updateProfile(principal, username, fullname, dob, domicile, address, "Member", avatar).then((res) => {
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

    return (
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-3">
                    <div className="card rounded-6 card-bg-dark text-center">
                        <div className="card-body p-4">
                            <h5 className=" text-light">Profile</h5>
                            <img src={avatar} alt="..." className="rounded-circle mb-4 w-50 object-fit-cover" />
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
                                    <Tab.Pane eventKey="setting"><h5 className='text-light'>Setting not found</h5></Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}