import { Navigate } from "react-router-dom";
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Event() {

    const data = window.localStorage.getItem('user');
    if ( data == null ) {
        return <Navigate to="/" />;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-5 mb-4">
                    <div className="card rounded-6 card-bg-dark text-center py-0 max-vh-100">
                        <img src={`../theme/images/products/3.jpg`} alt="..." className="rounded-4 w-100" style={{ maxHeight: '100%' }}/>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card rounded-6 card-bg-dark text-start">
                        <div className="card-body px-5 py-4">
                            <span className="fs-5 fw-bold text-primary-second">Concert <i className="bi-check-circle-fill"></i></span>
                            <h3 className="text-light mb-3">Hipster portrait man <br/>
                                <span className="fs-6 fw-semibold fst-italic text-light"><i className="bi-geo-alt-fill"></i> Jakarta, Indonesia</span>
                            </h3>
                            <p className="fs-6 text-white-50">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/><br/>

                                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled 
                                and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot 
                                foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail 
                                in their duty through weakness of will, which is the same as saying through shrinking from toil 
                                and pain. These cases are perfectly simple and easy to distinguish. 
                            </p>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col pt-3">
                                            <h6 className="p-0 text-white">Price<br/>
                                                <a className="fs-4 fw-bold text-primary-second" href="#">13 ICP / $50</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col pt-3">
                                            <h6 className="p-0 text-white-50">Ticket available<br/>
                                                <a className="fs-4 text-light" >55 / 100 </a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col pt-3">
                                            <h6 className="p-0 text-white-50">Held on date<br/>
                                                <a className="fs-6 text-light">Sunday, 12 September 2024 at 8PM</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col pt-0">
                                    <h6 className="p-0 text-white-50">Location<br/>
                                        <a className="fs-6 text-light">
                                            Jl. Pintu Satu Senayan No.1, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, 
                                            Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270
                                        </a>
                                    </h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row g-3 mt-3">
                                        <div className="col-auto">
                                            <img src={`../theme/images/users/2.jpg`} className="square square-md rounded-6" alt="..."/>
                                        </div>
                                        <div className="col pt-1">
                                            <h6 className="p-0 text-white-50">Publish by<br/>
                                                <a className="fs-5 text-light" href="#">@kendabdullah</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row g-3 mt-3">

                                        <Button variant="outline-light" className="button button-large gradient-color rounded-5 border-0 mt-4" onClick={handleShow}>
                                            Buy Ticket
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>

            <div className="card rounded-6 card-bg-dark text-center my-4">
                <div className="card-body p-5">
                    <Tab.Container id="left-tabs" defaultActiveKey="activity">
                        <Nav variant="underline" defaultActiveKey="activity" className='fs-6'>
                            <Nav.Item>
                                <Nav.Link className="text-light px-2" eventKey="activity">Activity</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="text-light px-2" eventKey="detail">Detail</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="text-light mt-3 text-start">
                            <Tab.Pane eventKey="activity"> 
                                <h5 className='text-light'>Activity not found</h5>
                            </Tab.Pane>
                            <Tab.Pane eventKey="detail"><h5 className='text-light'>Detail not found</h5></Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <div className="mx-2 text-light fs-5 fw-bold">Ticket Payment</div>
                </Modal.Header>
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Row className="my-1">
                            <Col className="pl-5 pr-3 text-start">
                                <Form.Label className="fs-6">Total Ticket</Form.Label>
                                <InputGroup>
                                    <Form.Control className="text-light border" type="number" required min={1} max={10} style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                                    <InputGroup.Text>ticket(s)</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col className="pl-3 pr-5 text-start">
                                <Form.Label className="fs-6">Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control className="text-light border" type="number" value={10} disabled aria-label="Amount (to the nearest dollar)" style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }}/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Buy Ticket
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}