import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { pickme_backend } from '../../../../../declarations/pickme_backend';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from '../../../AuthProvider';
import { pickme_face_recognition } from '../../../../../declarations/pickme_face_recognition';
// import { QrReader } from 'react-qr-reader';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function QRScanner() {

    const { principal } = useAuth();
    const [progress, setProgress] = useState(9);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState('');
    const {eventId} = useParams();
    const [tickets, setTickets] = useState([]);
    const [qrData, setQrData] = useState('No result');

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
                setTickets(ticketIds);
                console.log('ticketIds:',ticketIds);
                
            }
        });
        
        document.querySelector('header').classList.add('d-none');
    },[]);

    const handleScan = (result) => {
        if (result) {
            if (tickets.includes(result[0].rawValue)) {
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