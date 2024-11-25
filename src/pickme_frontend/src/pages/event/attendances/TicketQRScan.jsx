import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { pickme_backend } from '../../../../../declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from '../../../AuthProvider';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function QRScanner() {

    const { principal } = useAuth();
    const [progress, setProgress] = useState(9);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState('');
    const {eventId} = useParams();
    const [ticketIds, setTicketIds] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [qrData, setQrData] = useState('No result');
    const [attendance, setAttendance] = useState([]);
    const [event, setEvent] = useState('');

    useEffect(() => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                const profile = res.ok;
                setProfile(profile);
                setFullname(profile.fullname);
                setUsername(profile.username);
            }
        });

        pickme_backend.getTicketsByEventId(eventId).then((res) => {
            if (res.ok) {
                const allTicket = res.ok;
                const ticketIds = allTicket.map(ticket => ticket.uuid);
                setTicketIds(ticketIds);
                setTickets(allTicket);
            }
        });

        pickme_backend.getAllAttendanceByEventId(eventId).then((res) => {
            if (res.ok) {
                if (res.ok) {
                const attendances = res.ok;
                pickme_backend.getEventById(eventId).then((res) => {
                    if (res.ok) {
                        const eventDetail = res.ok;
                        setEvent(eventDetail);
                        const progress = attendances.length / eventDetail.total_ticket * 100;
                        setAttendance(attendances);
                        setProgress(progress);
                    }
                });
            }
            }
        });
        
        document.querySelector('header').classList.add('d-none');
    },[]);

    const handleScan = (result) => {
        if (result) {
            const userTicket = tickets.find(ticket => ticket.uuid === result[0].rawValue);
            if (userTicket) {
                pickme_backend.getAttendancesByUIdAndEventId(userTicket.user_id, eventId).then((res) => {
                    if (res.ok) {
                        const attendances = res.ok;
                        const attendance = attendances.find(attendance => attendance.ticket_id === userTicket.uuid);
                        if (attendance) {
                            document.getElementById('message').innerHTML = `Sorry ${attendance.username}, you have already attended this event.`;
                        } else {
                            pickme_backend.attendEvent(userTicket.user_id, userTicket.username, eventId, userTicket.uuid, 'qr').then((res) => {
                                if (res.ok) {
                                    setProgress(progress + 1);
                                }
                            });
                            document.getElementById('message').innerHTML = `Welcome ${userTicket.username}, you have successfully attended this event.`;
                        }
                    }
                }
                );
                setProgress(progress + 1);
                document.getElementById('message').innerHTML = 'Ticket scanned successfully!';
                setQrData('Ticket scanned successfully!'); // Extract scanned QR code data
            } else {
                document.getElementById('message').innerHTML = 'Ticket not found!';
                setQrData('Ticket not found!');
            }
        }
    };

    const handleError = (error) => {
        console.error("QR Scan Error: ", error);
    };

    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col-md-12">
                    <div className="card rounded-6 card-bg-dark text-start">
                        <div className="card-body p-5">
                            <h4 className="text-white mb-3">Attendance Progress So Far!</h4>
                            <ProgressBar now={progress} label={`${progress}%`} />
                        </div>
                    </div>
                    <div className="card rounded-6 card-bg-dark text-center my-3">
                        <div className="card-body p-5">
                            <div className="text-center w-25"></div>
                                <div className="text-center w-100">
                                    <Scanner onScan={(result) => 
                                        handleScan(result)
                                    } />
                                </div>
                                <p id='message' className='text-white'>{qrData}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}