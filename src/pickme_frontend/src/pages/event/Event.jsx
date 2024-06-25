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

export default function Event() {

    const [principal, setPrincipal] = useState('');
    const data = window.localStorage.getItem('user');
    if ( data == null ) {
        return <Navigate to="/" />;
    };

    const {eventId} = useParams();
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [tFormat, setTFormat] = useState('');

    useEffect(() => {
        setPrincipal(data.replace(/"/g, ''));
        pickme_backend.getEventById(eventId).then((res) => {
            setEvent(res.ok);
            setPrice(res.ok.price);
            setDate(format(res.ok.date, 'EEEE, MMMM do yyyy'));
            setTFormat(res.ok.time < "12:00" ? "AM" : "PM");
        });
    },[]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [price, setPrice] = useState(0);
    const [totalTicket, setTotalTicket] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ticketIcpPrice, setTicketIcpPrice] = useState(0);

    const handlePayment = (e) => {
        pickme_backend.buyTicket(principal, eventId, parseInt(totalTicket), parseInt(ticketPrice), parseInt(ticketIcpPrice), "-"
        ).then((res) => {
            console.log(res);
            setShow(false);
            window.location.reload();
        });
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
                                    <Form.Control className="text-light border" type="number" required min={1} max={10} 
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
                                    <InputGroup.Text>ticket(s)</InputGroup.Text>
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
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handlePayment}>
                    Buy Ticket
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}