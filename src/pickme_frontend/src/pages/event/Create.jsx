import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyEvents from '../profile/MyEvents.jsx';
import InputGroup from 'react-bootstrap/InputGroup';
import { pickme_backend } from 'declarations/pickme_backend';

export default function Create() {

    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [category, setCategory] = useState('Concert');
    const [totalTicket, setTotalTicket] = useState(10);
    const [price, setPrice] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [country, setCountry] = useState('Indonesia');
    const [city, setCity] = useState('Jakarta');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [committeeId, setCommitteeId] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        const auth = window.localStorage.getItem('user');
        if ( auth == null ) {
            return <Navigate to="/" />;
        };
        setCommitteeId(auth);
    },[]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        const data = {
            title : title,
            poster : poster,
            category : category,
            total_ticket : parseInt(totalTicket),
            price : parseInt(price),
            icp_price : parseInt(Math.ceil(price/5)),
            date : date,
            time : time,
            country : country,
            city : city,
            location : location,
            description : description,
            committee_id : committeeId,
            published_by : "@kenabdullah",
        }
        console.log("data",data);
        pickme_backend.createEvent(data).then((res) => {
            console.log(res);
            alert('success');
            setShow(false);
            window.location.reload();
        });
    };

    const handlePoster = (e) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
            setPoster(data.result);
        })
        data.readAsDataURL(e.target.files[0]);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value)
    };

    const handleCountry = (e) => {
        setCountry(e.target.value)
    };

    const handleCity = (e) => {
        setCity(e.target.value)
    };

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
                                            <Form.Control className="text-light border" type="text" placeholder="Title" required 
                                            onChange={(e) => setTitle(e.target.value)}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Poster</Form.Label>
                                            <Form.Control className="text-light border" type="file" name="poster" required 
                                            onChange={handlePoster}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Category</Form.Label>
                                            <Form.Select aria-label="Select Category" required value={category}
                                            onChange={handleCategory}>
                                                <option disabled>Select Category</option>
                                                <option value="Concert">Concert</option>
                                                <option value="Sport">Sport</option>
                                                <option value="Tech">Tech</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Total Ticket</Form.Label>
                                            <InputGroup>
                                                <Form.Control className="text-light border" type="number" required min={10} 
                                                onChange={(e) => setTotalTicket(e.target.value)}
                                                style={{ 
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
                                                <Form.Control className="text-light border" type="number" min={0} required aria-label="Amount (to the nearest dollar)" 
                                                onChange={(e) => setPrice(e.target.value)}
                                                style={{ 
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
                                            <Form.Control className="text-light border" type="date" placeholder="Date" required 
                                            onChange={(e) => setDate(e.target.value)}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Time</Form.Label>
                                            <Form.Control className="text-light border" type="time" placeholder="Time" required 
                                            onChange={(e) => setTime(e.target.value)}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Country</Form.Label>
                                            <Form.Select aria-label="Select Country" required value={country}
                                            onChange={handleCountry}>
                                                <option disabled>Select Country</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Japan">Japan</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">City</Form.Label>
                                            <Form.Select aria-label="Select City" required value={city}
                                            onChange={handleCity}>
                                                <option disabled>Select City</option>
                                                <option value="Jakarta">Jakarta</option>
                                                <option value="Bandung">Bandung</option>
                                                <option value="Surabaya">Surabaya</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Location</Form.Label>
                                            <Form.Control className="text-light border" type="text" placeholder="Location" required 
                                            onChange={(e) => setLocation(e.target.value)}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Description</Form.Label>
                                            <Form.Control className="text-light border" as="textarea" rows={3} required 
                                            onChange={(e) => setDescription(e.target.value)}style={{ 
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
                            <Button variant="light" onClick={handleSubmit}>
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