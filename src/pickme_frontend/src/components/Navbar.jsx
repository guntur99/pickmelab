
import { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';

export default function Navbar() {
    
    const [principal, setPrincipal] = useState('');
    const [auth, setAuth] = useState('');

    useEffect(() => {
        const data = window.localStorage.getItem('auth');
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
        localStorage.setItem('auth', JSON.stringify(userPrincipal));
    }

    const logout = async () => {
        if (principal) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            setAuth(null);
            setPrincipal(null);
        }
    };

    function handleLogout(event) {
        event.preventDefault();
        logout();
        
        return false;
    }


    return (

        <header id="header" className="dark header-size-md floating-nft-header" data-sticky-shrink="false">
            <div id="header-wrap" className="border-0">
                <div className="container">
                    <div className="header-row">

                        <div id="logo" className="me-5">
                            <a href="#" ><img src={`theme/images/logo.svg`} alt="Pick Me" className="py-3"/></a>
                        </div>

                        <div className="header-misc ms-auto">

                            <div className="header-misc ms-0">
                                {/* <div className="input-group input-group-search d-none d-xl-flex">
                                    <a href="#" className="input-group-text uil uil-search"></a>
                                    <input type="text" className="form-control ps-0" aria-label="Text input with dropdown button" placeholder="Search your Products"/>
                                </div> */}

                                {/* <a href="#" className="button border-0 bg-gradient gradient-color rounded-6 button-small m-0 ms-lg-4 me-lg-3 d-none d-md-block">Connect Wallet</a> */}
                                {principal ?
                                    <div className="header-misc">
                                        <form onSubmit={handleLogout}>
                                            <button id="logout" className="button border-0 bg-dark rounded-6 button-small m-0 ms-lg-4 me-lg-3 d-none d-md-block">Logout</button>
                                        </form>
                                        <div className="header-misc-icon">
                                            <a href="#" className="header-icon-notification">
                                                <i className="bi-bell text-light text-opacity-75"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge gradient-color rounded-circle">5<span className="visually-hidden">unread messages</span></span>
                                            </a>
                                        </div>
                                        <div className="header-misc-icon">
                                            <a href="#" className="header-icon-notification">
                                                <i className="bi-sun-fill text-light text-opacity-75"></i>
                                            </a>
                                        </div>
                                    </div> :
                                    <form onSubmit={handleLogin}>
                                            <button id="login" className="button border-0 bg-gradient rounded-6 button-small m-0 ms-lg-4 me-lg-3 d-none d-md-block">Sign In</button>
                                    </form>
                                }
                            </div>

                        </div>

                        <div className="primary-menu-trigger">
                            <button className="cnvs-hamburger" type="button" title="Open Mobile Menu">
                                <span className="cnvs-hamburger-box"><span className="cnvs-hamburger-inner"></span></span>
                            </button>
                        </div>

                        <nav className="primary-menu with-arrows">

                            <ul className="menu-container">
                                {/* <li className="menu-item current"><a className="menu-link" href="#"><div>Headline</div></a></li> */}
                                <li className="menu-item"><a className="menu-link" href="#"><div>Partners</div></a></li>
                                <li className="menu-item"><a className="menu-link" href="#"><div>New Events</div></a></li>
                                <li className="menu-item"><a className="menu-link" href="#"><div>How to Use</div></a></li>
                                <li className="menu-item"><a className="menu-link" href="#"><div>Latest Events</div></a></li>
                                <li className="menu-item"><a className="menu-link" href="#"><div>Wallet</div></a></li>
                            </ul>

                        </nav>

                    </div>
                </div>
            </div>
            <div className="header-wrap-clone"></div>
        </header>
    );
}