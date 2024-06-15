import { Navigate } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyEvents from '../profile/MyEvents.jsx';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Create() {

    const data = window.localStorage.getItem('auth');
    if ( data == null ) {
        return <Navigate to="/" />;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="container mt-5 pt-6">
            <div className="row pt-6">
                <div className="col-md-12">
                    <div className=" card rounded-6 card-bg-dark text-center">
                        <div className=" card-body p-1">
                            <Button variant="outline-light" className="m-4 text-start" onClick={handleShow}>
                                <i className="bi-calendar-plus-fill text-opacity-50"></i> Create New Event
                            </Button>
                            <MyEvents/>
                        </div>
                        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                            <Modal.Header closeButton>
                                <div className="mx-2 text-light fs-5 fw-bold">Create Event</div>
                            </Modal.Header>
                            <Modal.Body>
                                <Container className="my-1 text-light">
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Title</Form.Label>
                                            <Form.Control className="text-light border" type="text" placeholder="Title" style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Poster</Form.Label>
                                            <Form.Control className="text-light border" type="file" style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Date</Form.Label>
                                            <Form.Control className="text-light border" type="date" placeholder="Date" style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Time</Form.Label>
                                            <Form.Control className="text-light border" type="time" placeholder="Time" style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Total Ticket</Form.Label>
                                            <InputGroup>
                                                <Form.Control className="text-light border" type="number" min={10} style={{ 
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
                                                <Form.Control className="text-light border" type="number" min={0} aria-label="Amount (to the nearest dollar)" style={{ 
                                                    maxWidth: "100%",
                                                    padding: "0.5em 1em",
                                                }}/>
                                                <InputGroup.Text>.00</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Location</Form.Label>
                                            <Form.Control className="text-light border" type="text" placeholder="Location" style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Description</Form.Label>
                                            <Form.Control className="text-light border" as="textarea" rows={3} style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="light" onClick={handleClose}>
                                Submit
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}