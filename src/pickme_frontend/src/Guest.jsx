import React from 'react';
import { useAuth } from './AuthProvider';
import { Link, NavLink } from "react-router-dom";

export default function Guest() {

    const { login } = useAuth();

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
                                            <button onClick={login} id="login" className="cnvs-hamburger button border-0 bg-gradient rounded-6 button-small m-0 ms-lg-4 me-lg-3">Sign In</button>
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
    )
}
