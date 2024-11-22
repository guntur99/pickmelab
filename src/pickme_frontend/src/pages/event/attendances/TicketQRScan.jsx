import { useState, useEffect, useRef } from 'react';
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
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        pickme_backend.checkUserById(principal).then((res) => {
            if (res.ok) {
                const profile = res.ok;
                setProfile(profile);
                setFullname(profile.fullname);
                setUsername(profile.username);
                setAvatar(profile.avatar);
                setDob(profile.dob);
                setDomicile(profile.domicile);
                setAddress(profile.address);
                setProgress(profile.progress);
                setUserType(profile.user_type);
                setResellerType(profile.reseller_type);
                getMemberPackage();
                getResellerPackage();
            }
        });

        pickme_backend.getAllTicketsByUId(principal).then((res) => {
            if (res.ok) {
                const tickets = res.ok;
                setTickets(tickets);
            }
        });
        
        document.querySelector('header').classList.add('d-none');
    },[]);

    const [qrData, setQrData] = useState('No result');

    const handleScan = (result) => {
        if (result) {
            setQrData(result[0].rawValue); // Extract scanned QR code data
            console.log(result[0]);
            
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