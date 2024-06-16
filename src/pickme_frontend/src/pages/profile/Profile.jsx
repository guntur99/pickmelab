import { Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function Profile() {

    const accountProgress = 70;
    const data = window.localStorage.getItem('user');
    if ( data == null ) {
        return <Navigate to="/" />;
    };

    return (
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-3">
                    <div className="card rounded-6 card-bg-dark text-center">
                        <div className="card-body p-4">
                            <h5 className=" text-light">Profile</h5>
                            <img src={`../theme/images/products/3.jpg`} alt="..." className="rounded-circle mb-4 w-50"/>
                            <h4 className="text-light">Ken Abdullah<p className="fs-6 text-primary-second">@kenabdullah</p></h4>
                            
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
                            <ProgressBar now={accountProgress} label={`${accountProgress}%`} />
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
                                                    <Form.Control className="text-light border" type="text" placeholder="Fullname" style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Photo</Form.Label>
                                                    <Form.Control className="text-light border" type="file" style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Username</Form.Label>
                                                    <Form.Control className="text-light border" type="text" placeholder="Username" style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Date of Birth</Form.Label>
                                                    <Form.Control className="text-light border" type="date" placeholder="Date of Birth" style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                                <Col className="pl-3 pr-5 text-start">
                                                    <Form.Label className="fs-6">Domicile</Form.Label>
                                                    <Form.Control className="text-light border" type="text" placeholder="Domicile" style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col className="pl-3 pr-5 text-start">
                                                    <Form.Label className="fs-6">Address</Form.Label>
                                                    <Form.Control className="text-light border" as="textarea" rows={3} style={{ 
                                                        maxWidth: "100%",
                                                        padding: "0.5em 1em",
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row className='mt-3 text-end'>
                                                <Col>
                                                <Button variant="light">
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