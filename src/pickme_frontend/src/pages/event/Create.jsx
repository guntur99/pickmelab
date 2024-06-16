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

    const data = window.localStorage.getItem('user');
    if ( data == null ) {
        return <Navigate to="/" />;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-12">
                    <div className=" card rounded-6 card-bg-dark text-center">
                        <div className=" card-body p-">
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
                                            <Form.Control className="text-light border" type="text" placeholder="Title" required style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Poster</Form.Label>
                                            <Form.Control className="text-light border" type="file" required style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Category</Form.Label>
                                            <Form.Select aria-label="Select Category" required>
                                                <option disabled>Select Category</option>
                                                <option value="1">Concert</option>
                                                <option value="2">Sport</option>
                                                <option value="3">Tech</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Total Ticket</Form.Label>
                                            <InputGroup>
                                                <Form.Control className="text-light border" type="number" required min={10} style={{ 
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
                                                <Form.Control className="text-light border" type="number" min={0} required aria-label="Amount (to the nearest dollar)" style={{ 
                                                    maxWidth: "100%",
                                                    padding: "0.5em 1em",
                                                }}/>
                                                <InputGroup.Text>.00</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Date</Form.Label>
                                            <Form.Control className="text-light border" type="date" placeholder="Date" required style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Time</Form.Label>
                                            <Form.Control className="text-light border" type="time" placeholder="Time" required style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Country</Form.Label>
                                            <Form.Select aria-label="Select Country" required>
                                                <option disabled>Select Country</option>
                                                <option value="1">Indonesia</option>
                                                <option value="2">Singapore</option>
                                                <option value="3">Japan</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">City</Form.Label>
                                            <Form.Select aria-label="Select City" required>
                                                <option disabled>Select City</option>
                                                <option value="1">Jakarta</option>
                                                <option value="2">Bandung</option>
                                                <option value="3">Surabaya</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Location</Form.Label>
                                            <Form.Control className="text-light border" type="text" placeholder="Location" required style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Description</Form.Label>
                                            <Form.Control className="text-light border" as="textarea" rows={3} required style={{ 
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