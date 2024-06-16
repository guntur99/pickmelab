
import { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    
    const [principal, setPrincipal] = useState('');
    const [auth, setAuth] = useState('');

    useEffect(() => {
        const data = window.localStorage.getItem('user');
        if ( data !== null ) {
            setPrincipal(JSON.parse(data))
        };
    }, []);
    
    function handleLogin(event) {
        event.preventDefault();
        init();

        return false;
    }

    const init = async () => {
        const authClient = await AuthClient.create();
        if (auth && authClient.isAuthenticated()) { //You have already logged in
        handleAuthenticated(authClient);
        setAuth(authClient);
        } else {
        await authClient.login({
            identityProvider: 'https://identity.ic0.app/#authorize',
            onSuccess: () => {
            handleAuthenticated(authClient);
            setAuth(authClient);
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

    function handleLogout(event) {
        event.preventDefault();
        logout();
        
        return <Navigate to="/" />;
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
                                            {principal ?
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
        </>
    );
}