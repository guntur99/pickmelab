
import { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { canisterId as internetIdentityCanisterId } from "declarations/internet_identity";
import { pickme_backend } from 'declarations/pickme_backend';

export default function Navbar() {
    
    const [principal, setPrincipal] = useState('');
    const [auth, setAuth] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistered, setIsRegistered] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [out, setLogout] = useState(false);
    const handleLogoutClose = () => setLogout(false);
    const handleLogoutShow = () => setLogout(true);
    const handleLogoutNow = () => {
        setLogout(false);
        logout();
        
        return <Navigate to="/" />;
    };

    useEffect(() => {
        const data = window.localStorage.getItem('user');
        pickme_backend.checkUserById(data.replace(/"/g, '')).then((res) => {
            if ( data !== null ) {
                if (res.ok) {
                    setIsRegistered(true);
                }else{
                    setPrincipal(data.replace(/"/g, ''));
                    if (!isRegistered) {
                        handleShow(); //check if profile data is not completed
                    }
                }
            };
        });
    }, []);

    function handleSignIn(e) {
        e.preventDefault();
        pickme_backend.register(principal, username, "", "", "", "", "", "").then((res) => {
            if (res) {
                setShow(false);
                window.location.reload();
            }
        });
    }
    
    function handleLogin(e) {
        e.preventDefault();
        init();

        return false;
    }

    const init = async () => {
        const authClient = await AuthClient.create();
    
        const isAuthenticated = await authClient.isAuthenticated();
        // console.log(isAuthenticated);
        if (auth && authClient.isAuthenticated()) { //You have already logged in
            handleAuthenticated(authClient);
            setAuth(authClient);
            setIsAuthenticated(isAuthenticated);
                
        } else {
        await authClient.login({
            identityProvider: process.env.DFX_NETWORK === "local"
                ? `http://${internetIdentityCanisterId}.localhost:4943/`
                : 'https://identity.ic0.app/#authorize',
            onSuccess: () => {
                handleAuthenticated(authClient);
                setAuth(authClient);
                const isAuthenticated = authClient.isAuthenticated();
                setIsAuthenticated(isAuthenticated);
                window.location.reload();
            }
        });
        }
    }

    async function handleAuthenticated(authClient) {
        const identity = await authClient.getIdentity();
        const userPrincipal = identity.getPrincipal().toString();
        // Now you can use the userPrincipal to interact with your backend
        localStorage.setItem('user', JSON.stringify(userPrincipal));
    }

    const logout = async () => {
        if (principal) {
            localStorage.clear();
            sessionStorage.clear();
            setAuth(null);
            setPrincipal(null);
            window.location.reload();
        }
    };

    function handleLogout(e) {
        e.preventDefault();
        handleLogoutShow();
    }

    return (
        <>
            <main>
                <div className="stretched dark">
                    <header id="header" className="dark header-size-md floating-nft-header floating-header" style={{ 
                        position: 'fixed',
                        overflow: 'hidden',
                        backgroundColor: '#333',
                        top: 0,
                        width: '100%',
                        zIndex: 999,
                    }} data-sticky-shrink="false">
                        <div id="header-wrap" className="border-0">
                            <div className="container">
                                <div className="header-row">
                                    <div id="logo" className="me-5">
                                        <NavLink to="/"><img src={`theme/images/icons/pick-me-logo.svg`} alt="Pick Me" className="pick-me-navbar py-3"/></NavLink>
                                    </div>
                                    <div className="header-misc ms-auto">
                                        <div className="header-misc ms-0">
                                            {isRegistered ?
                                                <div className="header-misc">
                                                    <div className="header-misc-icon tooltips">
                                                        <Link className="header-icon-notification " to="/event/create">
                                                            <i className="bi-calendar-plus-fill text-light text-opacity-75"></i>
                                                        </Link>
                                                        <span className="tooltiptext fs-6">Event</span>
                                                    </div>
                                                    <div className="header-misc-icon tooltips">
                                                        <Link className="header-icon-notification " to="/profile">
                                                            <i className="bi-person-bounding-box text-light text-opacity-75"></i>
                                                        </Link>
                                                        <span className="tooltiptext fs-6">Profile</span>
                                                    </div>
                                                    <div className="header-misc-icon tooltips">
                                                        <form onSubmit={handleLogout}>
                                                            <button id="logout" className="header-icon-notification">
                                                                <i className="bi-door-open-fill text-light text-opacity-75"></i>
                                                            </button>
                                                        </form>
                                                        <span className="tooltiptext fs-6">Logout</span>
                                                    </div>
                                                </div> :
                                                <form onSubmit={handleLogin}>
                                                    <button id="login" className="cnvs-hamburger button border-0 bg-gradient rounded-6 button-small m-0 ms-lg-4 me-lg-3">Sign In</button>
                                                </form>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-wrap-clone"></div>
                    </header>
                    <div id="wrapper" className="noice-effect overflow-hidden"></div>
                </div>
            </main>

            <Modal show={show} onHide={handleClose} size="" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Header>
                    <div className="mx-2 text-light fs-5 fw-bold">Sign In</div>
                </Modal.Header>
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Row className="my-1">
                            <Col className="pl-5 pr-3 text-start">
                                <Form.Label className="fs-6">Username</Form.Label>
                                <Form.Control className="text-light border" type="text" required 
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ 
                                    maxWidth: "100%",
                                    padding: "0.5em 1em",
                                }} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleSignIn}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={out} onHide={handleLogoutClose} size="" backdrop="static" keyboard={false} data-bs-theme="dark">
                <Modal.Body>
                    <Container className="my-1 text-light">
                        <Form.Label className="fs-5">Are you sure to Logout?</Form.Label>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleLogoutClose}>
                        No
                    </Button>
                    <Button variant="light" onClick={handleLogoutNow}>
                        Yes, logout!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}