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
import Spinner from 'react-bootstrap/Spinner';
import { format } from 'date-fns';
import { useAuth } from '../../AuthProvider';

let listPackage = [
    { id: 0, name: 'Bronze', desc: '1 Events and max 100 tickets/event', price: '20' },
    { id: 1, name: 'Silver', desc: '3 Events and max 500 tickets/event', price: '100' },
    { id: 2, name: 'Gold', desc: '3 Events and max 5000 tickets/event', price: '1,000' },
    { id: 3, name: 'Diamond', desc: '3 Events and max 50.000 tickets/event', price: '5,000' },
];

export default function Create() {
    
    const { principal } = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);
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
    const [publishedBy, setPublishedBy] = useState('');
    const [profile, setProfile] = useState('');
    const [show, setShow] = useState(false);
    const [showPackage, setShowPackage] = useState(false);
    const [packages] = useState(listPackage);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState({ selectedPackage: "Bronze" });
    const { selectedPackage } = item;
    const [eventsFiltered, setEventsFiltered] = useState([]);
    const [eventLimit, setEventLimit] = useState(0);

    useEffect(() => {
        getEvents();
        getEventLimit();
    },[]);

    const handlePackageClose = () => setShowPackage(false);
    const handlePackageShow = () => setShowPackage(true);
    const handleBuyPackage = (e) => {
        e.preventDefault();
        setIsLoading(true);
        pickme_backend.updateProfile(principal, profile.username, profile.fullname, profile.dob, profile.domicile, profile.address, selectedPackage, "Basic", profile.avatar, profile.progress).then((res) => {
            if (res) {
                setIsLoading(false);
                setShowPackage(false);
                getEventLimit();
                window.location.reload();
            }
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getEventLimit();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        pickme_backend.createEvent(
            title, poster, category, parseInt(totalTicket), parseInt(price), parseInt(Math.ceil(price/5)),
            date, time, country, city, location, description, publishedBy
        ).then((res) => {
            setIsLoading(false);
            setShow(false);
            getEvents();
            window.location.reload();
        });
    };
    
    const getEventLimit = () => {
        switch (profile.user_type) {
            case "Bronze":
                setEventLimit(3-eventsFiltered.length);
                break;
            case "Silver":
                setEventLimit(5-eventsFiltered.length);
                break;
            case "Gold":
                setEventLimit(7-eventsFiltered.length);
                break;
            default:
                setEventLimit(10-eventsFiltered.length);
                break;
        }
    }

    const getEvents = () => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                const profile = res.ok;
                setPublishedBy(profile.username);
                setProfile(profile);
                setIsRegistered(true);

                pickme_backend.getEventsByUser(profile.username).then((res) => {
                    const resData = res.ok;
                    setEvents(resData);
                    setEventsFiltered(resData);
                });
            }else{
                if (!isRegistered) {
                    handleShow(); //check if profile data is not completed
                }
            }
        });

    }

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

    const handleChange = e => {
        e.persist();

        setItem(prevState => ({
        ...prevState,
        selectedPackage: e.target.value
        }));
    };

    return (
        <>
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-12">
                    <div className=" card rounded-6 card-bg-dark text-center">
                        <div className=" card-body p-">
                            {eventLimit > 0 ?
                            <Button variant="outline-light" className="m-4 text-start" onClick={profile.user_type !== 'Basic' ? handleShow : handlePackageShow}>
                                <i className="bi-calendar-plus-fill text-opacity-50"></i> Create New Event
                            </Button>
                            : 
                            <Button variant="outline-light" className="m-4 text-start" onClick={handlePackageShow}>
                                <i className="bi-calendar-plus-fill text-opacity-50"></i> Upgrade Package
                            </Button>
                            }
                            <MyEvents events={events}/>
                        </div>
                        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                            <Modal.Header closeButton>
                                <div className="mx-2 text-light fs-5 fw-bold">Create Event - [{eventLimit} Events Left]</div>
                            </Modal.Header>
                            <Modal.Body>
                                <Container className="my-1 text-light">
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Title</Form.Label>
                                            <Form.Control className="text-light border" type="text" placeholder="Title" required disabled={isLoading}
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
                                            <Form.Control className="text-light border" type="file" name="poster" required disabled={isLoading}
                                            onChange={handlePoster}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Category</Form.Label>
                                            <Form.Select aria-label="Select Category" required value={category} disabled={isLoading}
                                            onChange={handleCategory}>
                                                <option disabled>Select Category</option>
                                                <option value="Concert">Concert</option>
                                                <option value="Sport">Sport</option>
                                                <option value="Tech">Tech</option>
                                                <option value="Social">Social</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <Row className="my-1">
                                        <Col className="pl-5 pr-3 text-start">
                                            <Form.Label className="fs-6">Total Ticket</Form.Label>
                                            <InputGroup>
                                                <Form.Control className="text-light border" type="number" required min={10} disabled={isLoading}
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
                                                <Form.Control className="text-light border" type="number" min={0} required aria-label="Amount (to the nearest dollar)" disabled={isLoading}
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
                                            <Form.Control className="text-light border" type="date" placeholder="Date" required disabled={isLoading}
                                            onChange={(e) => setDate(e.target.value)}
                                            style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">Time</Form.Label>
                                            <Form.Control className="text-light border" type="time" placeholder="Time" required disabled={isLoading}
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
                                            <Form.Select aria-label="Select Country" required value={country} disabled={isLoading}
                                            onChange={handleCountry}>
                                                <option disabled>Select Country</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Japan">Japan</option>
                                            </Form.Select>
                                        </Col>
                                        <Col className="pl-3 pr-5 text-start">
                                            <Form.Label className="fs-6">City</Form.Label>
                                            <Form.Select aria-label="Select City" required value={city} disabled={isLoading}
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
                                            <Form.Control className="text-light border" type="text" placeholder="Location" required disabled={isLoading}
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
                                            <Form.Control className="text-light border" as="textarea" rows={3} required disabled={isLoading}
                                            onChange={(e) => setDescription(e.target.value)}style={{ 
                                                maxWidth: "100%",
                                                padding: "0.5em 1em",
                                            }} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                                Close
                            </Button>
                            <Button variant="light" onClick={handleSubmit} disabled={isLoading}>
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
                                    "Submit"
                                }
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        
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
                                                    disabled={isLoading}
                                                    />
                                                ))}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="light" onClick={handleBuyPackage} disabled={isLoading}>
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
                                    "Buy Package"
                                }
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