import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { pickme_backend } from 'declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';
import BuyMoreTicket from './BuyMoreTicket';
import { useAuth } from '../../AuthProvider';

export default function Event() {

    const { principal } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const {eventId} = useParams();
    const [profile, setProfile] = useState('');
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [tFormat, setTFormat] = useState('');
    const [price, setPrice] = useState(0);
    const [otherPrice, setOtherPrice] = useState(0);
    const [totalTicket, setTotalTicket] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ticketIcpPrice, setTicketIcpPrice] = useState(0);
    const [myTicket, setMyTicket] = useState([]);
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState([{ username: "", ticket: 1 }]);
    const [existUsername, setExistUsername] = useState(true);

    useEffect(() => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                const profile = res.ok;
                setProfile(profile);
            }
        });
        getEvent();
        getTicket();
    },[]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePayment = (e) => {
        e.preventDefault();
        resellerBuyTicket(inputs);
        setIsLoading(true);
        pickme_backend.buyTicket(principal, eventId, event.title, "Reguler", parseInt(totalTicket), parseInt(ticketPrice), parseInt(ticketIcpPrice), "-"
        ).then((res) => {
            pickme_backend.updateEvent(eventId, event.title, event.poster, event.category, parseInt(event.total_ticket), 
                parseInt(event.available_ticket-totalTicket), parseInt(event.price), parseInt(Math.ceil(event.price/5)), event.date, 
                event.time, event.country, event.city, event.location, event.description, event.published_by
            ).then((res) => {
                setIsLoading(false);
                setShow(false);
                getEvent();
                window.location.reload();
            });
        });
    };

    const resellerBuyTicket = (data) => {
        data.forEach(user => {
            pickme_backend.checkUsername(user.username).then((res) => {
                const user = res.ok;
                if (user.length > 0) {
                    setExistUsername(true);
                    pickme_backend.buyTicket(user[0].internet_identity, eventId, event.title, "Reguler", parseInt(totalTicket), parseInt(ticketPrice), parseInt(ticketIcpPrice), "-");
                
                }else{
                    setExistUsername(false);
                }
            });
        });
    }

    const getTicket = () =>  {
        pickme_backend.getTicketsByUId(principal,eventId).then((res) => {
            setMyTicket(res.ok);
        });
    }

    const getEvent = () => {
        pickme_backend.getEventById(eventId).then((res) => {
            setEvent(res.ok);
            setPrice(res.ok.price);
            setDate(format(res.ok.date, 'EEEE, MMMM do yyyy'));
            setTFormat(res.ok.time < "12:00" ? "AM" : "PM");
        });
    }

    const handleAddInput = () => {
        setInputs([...inputs, { username: "", ticket: 1 }]);
        setOtherPrice(inputs.length*price);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
        setOtherPrice(otherPrice-price);
    };

    return (
        
        <div className="container mt-3 pt-6">
            <div className="row pt-6">
                <div className="col-md-5 mb-4">
                    <div className="card rounded-6 card-bg-dark text-center py-0 max-vh-100">
                        <img src={event.poster} alt="..." className="rounded-4 w-100" style={{ maxHeight: '100%' }}/>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card rounded-6 card-bg-dark text-start">
                        <div className="card-body px-5 py-4">
                            <span className="fs-5 fw-bold text-primary-second">{event.category} <i className="bi-check-circle-fill"></i></span>
                            <h3 className="text-light mb-3">{event.title} <br/>
                                <span className="fs-6 fw-semibold fst-italic text-light"><i className="bi-geo-alt-fill"></i> {event.city}, {event.country}</span>
                            </h3>
                            <p className="fs-6 text-white-50">
                                {event.description}
                            </p>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col pt-3">
                                            <h6 className="p-0 text-white">Price<br/>
                                                <a className="fs-4 fw-bold text-primary-second" href="#">{event.icp_price} ICP / ${event.price}</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col pt-3">
                                            <h6 className="p-0 text-white-50">Ticket available<br/>
                                                <a className="fs-4 text-light" >{event.available_ticket} / {event.total_ticket} </a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col pt-3">
                                            <h6 className="p-0 text-white-50">Held on date<br/>
                                                <a className="fs-6 text-light">{date} at {event.time} {tFormat}</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col pt-0">
                                    <h6 className="p-0 text-white-50">Location<br/>
                                        <a className="fs-6 text-light">
                                            {event.location}
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
                                                <a className="fs-5 text-light" href="#">{event.published_by}</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row g-3 mt-3">
                                        {event.available_ticket === 0 ? 
                                            <Button variant="outline-light" className="button button-large text-bg-dark rounded-5 border-0 mt-4" disabled="true">
                                                <b>Sold Out</b>
                                            </Button>
                                        :
                                        <>
                                            {myTicket.length > 0 ? 
                                            <Button variant="outline-light" className="button button-large bg-white text-primary-second rounded-5 border-0 mt-4" disabled="true">
                                                <b>Paid</b>
                                            </Button>
                                            :
                                            <Button variant="outline-light" className="button button-large gradient-color rounded-5 border-0 mt-4" onClick={handleShow}>
                                                <b>Buy Ticket</b>
                                            </Button>
                                            }
                                        </>
                                        }
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
                                    <Form.Control className="text-light border" type="number" required min={1} max={1} disabled={isLoading}
                                    onChange={(e) => { 
                                        setTotalTicket(e.target.value); 
                                        setTicketPrice(e.target.value*event.price); 
                                        setPrice(e.target.value*event.price); 
                                        setTicketIcpPrice(e.target.value*event.icp_price); 
                                    }}
                                    style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                                    <InputGroup.Text>ticket</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col className="pl-3 pr-5 text-start">
                                <Form.Label className="fs-6">Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control className="text-light border" type="number" value={price} disabled aria-label="Amount (to the nearest dollar)" style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }}/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                        {profile.reseller_type !== "Basic" ? 
                        <>
                            <Row className="my-1">
                                <Col className="pl-5 mt-4 pr-3 text-start">
                                    <Form.Label className="fs-6">
                                        <b>Buy for others</b>
                                        <br/><b className=" text-primary-second">Total Price: ${otherPrice+price}</b>
                                    </Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <div className="container">
                                    {inputs.map((item, index) => (
                                        <div className="input_container" key={index}>
                                            <Row className="my-1">
                                                <Col className="pl-5 pr-3 text-start">
                                                    <Form.Label className="fs-6">Username</Form.Label>
                                                    <InputGroup hasValidation>
                                                        <InputGroup.Text>@</InputGroup.Text>
                                                        <Form.Control 
                                                            type="text" 
                                                            name="username"
                                                            required 
                                                            isInvalid 
                                                            className="text-light border" 
                                                            minLength={7} 
                                                            disabled={isLoading}
                                                            onChange={(event) => handleChange(event, index)}
                                                            style={{ 
                                                                maxWidth: "100%",
                                                                padding: "0.5em 1em",
                                                            }} />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="fs-6">Action</Form.Label>
                                                    <Col>
                                                        {inputs.length > 1 && (
                                                            <Button className="mx-1" variant="danger" onClick={() => handleDeleteInput(index)}>Delete</Button>
                                                        )}
                                                        {index === inputs.length - 1 && (
                                                            <Button className="mx-1" variant="light" onClick={() => handleAddInput()}>Add</Button>
                                                        )}
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </Row>
                        </>
                        :
                        <></>
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handlePayment} disabled={isLoading}>
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
                        "Buy Ticket"
                    }
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}