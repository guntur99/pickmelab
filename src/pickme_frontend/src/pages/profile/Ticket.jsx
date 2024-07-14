import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QRCode from "react-qr-code";
import { format } from 'date-fns';
import '../../../public/assets/css/ticket/music.css';
import { pickme_backend } from 'declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';

const Ticket = ({ticket, event, showTicket, handleTicketClose}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [receiverUsername, setReceiverUsername] = useState('');
    const [existUsername, setExistUsername] = useState(true);
    const [showTransferTicket, setShowTransferTicket] = useState(false);

    const handleTransferTicketClose = () => setShowTransferTicket(false);
    const handleTransferTicketShow = () => {
        handleTicketClose();
        setShowTransferTicket(true)
    };
    const handleTransferTicket = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        pickme_backend.checkUsername(receiverUsername).then((res) => {
            const available = res.ok;
            if (available.length > 0) {
                setExistUsername(true);
                setIsLoading(true);
                pickme_backend.transferTicket(available[0].internet_identity, ticket.event_id, ticket.event_title, ticket.category, 1, parseInt(ticket.price), parseInt(ticket.icp_price), ticket.discount, ticket.uuid).then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setShowTransferTicket(false);
                        window.location.reload();
                    }
                });
            }else{
                setExistUsername(false);
            }
        });
    }
    
    return (
        <>
            <Modal show={showTicket} onHide={handleTicketClose} size="lg" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <div className="mx-2 text-light fs-5 fw-bold">Your Ticket</div>
                </Modal.Header>
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Row>
                            <div className="ticket ticket-1" style={{ 
                                backgroundImage: `url(${event.poster})`
                            }}>
                                <div className="date">
                                        {Object.entries(event).length > 1 &&(
                                    <>
                                    <span className="day">{format(event.date, 'dd')}</span>
                                    <span className="month-and-time">{format(event.date, 'eee, MM yyyy')}
                                        <span className='small'> at </span><span className="medium">{event.time} {event.time < "12:00" ? "AM" : "PM"}</span>
                                    </span></>
                                        )}
                                </div>
                                <div className="artist">
                                    <span className="name">{event.city}</span>
                                    <span className="live small">{event.country}</span>
                                </div>
                                <div className="location">
                                <div className='qr-code'>
                                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
                                        <QRCode
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={ticket.uuid}
                                            viewBox={`0 0 256 256`}
                                        />
                                    </div>
                                </div>
                                    <span>{event.title}</span>
                                    <span className="small"><span>{ticket.category} <i className="bi-check-circle-fill"></i></span></span>
                                </div>
                                {/* <div className="rip"></div> */}
                                <div className="cta">
                                    {/* <button className="buy" href="#">GRAB A TICKET</button> */}
                                </div>
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleTicketClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleTransferTicketShow}>
                    Transfer Ticket
                </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal show={showTransferTicket} onHide={handleTransferTicketClose} backdrop="static" size="lg" keyboard={false} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <div className="mx-2 text-light fs-5 fw-bold">Transfer Your Ticket</div>
                </Modal.Header>
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Row className="my-1">
                            <Form.Label className="fs-6">Send To</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    required 
                                    isInvalid 
                                    placeholder='Username'
                                    className="text-light border" 
                                    minLength={7} 
                                    disabled={isLoading}
                                    onChange={(e) => setReceiverUsername(e.target.value)}
                                    style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                                    {existUsername === false ? 
                                    <Form.Control.Feedback className="fs-6" type="invalid">
                                        Username is not exist.
                                    </Form.Control.Feedback> 
                                    : 
                                    <></> 
                                    }
                            </InputGroup>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" disabled={isLoading} onClick={handleTransferTicketClose}>
                    Close
                </Button>
                <Button variant="danger" disabled={isLoading} onClick={handleTransferTicket}>
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
                        "Transfer Now"
                    }
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Ticket;