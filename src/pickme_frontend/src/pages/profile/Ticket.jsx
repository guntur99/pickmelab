
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import QRCode from "react-qr-code";
import { format } from 'date-fns';
import '../../../public/assets/css/ticket/music.css';

const Ticket = ({ticket, event, showTicket, handleTicketClose}) => {
    // console.log(ticket, Object.entries(event).length);
    return (
        <Modal show={showTicket} onHide={handleTicketClose} size="lg" keyboard={false} data-bs-theme="dark">
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
            </Modal.Footer>
        </Modal>
    );
};

export default Ticket;