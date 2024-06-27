
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import QRCode from "react-qr-code";
import { format } from 'date-fns';

const Ticket = ({ticket, event, showTicket, handleTicketClose}) => {
    // console.log(ticket, event);
    return (
        <Modal show={showTicket} onHide={handleTicketClose} size="lg" keyboard={false} data-bs-theme="dark">
            <Modal.Header closeButton>
                <div className="mx-2 text-light fs-5 fw-bold">Your Ticket</div>
            </Modal.Header>
            <Modal.Body>
                <Container className="my-1 text-light">
                    <img src={event.poster} alt="..." className="rounded-4 w-50" style={{ maxHeight: '100%' }}/>
                <div className="mx-2 text-light fs-5 fw-bold">Event: {event.title}</div>
                <div className="mx-2 text-light fs-5 fw-bold">Location: {event.city}, {event.country}</div>
                <div className="mx-2 text-light fs-5 fw-bold">Date: {format(event.date, 'EEEE, MMMM do yyyy')} at {event.time} {event.time < "12:00" ? "AM" : "PM"}</div>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={ticket.uuid}
                        viewBox={`0 0 256 256`}
                    />
                    </div>
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