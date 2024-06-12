
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

        <header id="header" class="dark header-size-md floating-nft-header" data-sticky-shrink="false">
            <div id="header-wrap" class="border-0">
                <div class="container">
                    <div class="header-row">

                        <div id="logo" class="me-5">
                            <a href="#" ><img src="src/assets/theme/images/logo.svg" alt="Pick Me" class="py-3"/></a>
                        </div>

                        <div class="header-misc ms-auto">

                            <div class="header-misc ms-0">
                                {/* <div class="input-group input-group-search d-none d-xl-flex">
                                    <a href="#" class="input-group-text uil uil-search"></a>
                                    <input type="text" class="form-control ps-0" aria-label="Text input with dropdown button" placeholder="Search your Products"/>
                                </div> */}

                                {/* <a href="#" class="button border-0 bg-gradient gradient-color rounded-6 button-small m-0 ms-lg-4 me-lg-3 d-none d-md-block">Connect Wallet</a> */}
                                {principal ?
                                <form onSubmit={handleLogout}>
                                    <button id="logout" class="button border-0 bg-dark rounded-6 button-small m-0 ms-lg-4 me-lg-3 d-none d-md-block">Logout</button>
                                </form> :
                                <form onSubmit={handleLogin}>
                                    <button id="login" class="button border-0 bg-gradient gradient-color rounded-6 button-small m-0 ms-lg-4 me-lg-3 d-none d-md-block">Sign In</button>
                                </form>
                                }

                                <div class="header-misc-icon">
                                    <a href="#" class="header-icon-notification">
                                        <i class="bi-bell text-light text-opacity-75"></i>
                                        <span class="position-absolute top-0 start-100 translate-middle badge gradient-color rounded-circle">5<span class="visually-hidden">unread messages</span></span>
                                    </a>
                                </div>
                                <div class="header-misc-icon">
                                    <a href="#" class="header-icon-notification">
                                        <i class="bi-sun-fill text-light text-opacity-75"></i>
                                    </a>
                                </div>
                            </div>

                            <div id="top-search" class="header-misc-icon d-block d-xl-none">
                                <a href="#" id="top-search-trigger"><i class="uil uil-search"></i><i class="bi-x-lg"></i></a>
                            </div>

                        </div>

                        <div class="primary-menu-trigger">
                            <button class="cnvs-hamburger" type="button" title="Open Mobile Menu">
                                <span class="cnvs-hamburger-box"><span class="cnvs-hamburger-inner"></span></span>
                            </button>
                        </div>

                        <nav class="primary-menu with-arrows">

                            <ul class="menu-container">
                                <li class="menu-item current"><a class="menu-link" href="#"><div>Home</div></a></li>
                                <li class="menu-item"><a class="menu-link" href="#"><div>Pages</div></a>
                                    <ul class="sub-menu-container">
                                        <li class="menu-item current"><a class="menu-link" href="#"><div>Home</div></a></li>
                                        <li class="menu-item"><a class="menu-link" href="#"><div>About Us</div></a></li>
                                        <li class="menu-item"><a class="menu-link" href="#"><div>Pricing</div></a></li>
                                        <li class="menu-item"><a class="menu-link" href="#"><div>Contact</div></a></li>
                                    </ul>
                                </li>
                                <li class="menu-item"><a class="menu-link" href="#"><div>Pricing</div></a></li>
                                <li class="menu-item"><a class="menu-link" href="#"><div>Contact</div></a></li>
                            </ul>

                        </nav>

                        <form class="top-search-form" action="search.html" method="get">
                            <input type="text" name="q" class="form-control" value="" placeholder="Type &amp; Hit Enter.." autocomplete="off"/>
                        </form>

                    </div>
                </div>
            </div>
            <div class="header-wrap-clone"></div>
        </header>
    );
}