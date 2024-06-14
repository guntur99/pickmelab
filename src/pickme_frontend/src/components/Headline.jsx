import Partners from './Partners';
import { Link } from "react-router-dom";

export default function Headline() {

    return (
        <div className="container pb-lg-5">
            <div className="row align-items-center justify-content-between pt-6 col-mb-30">
                <div className="col-lg-7">
                    <h2 className="display-3 fw-bold text-white">Buy &amp; Sell your Event Ticket in our <span className="gradient-text gradient-color">Pick Me Platform</span>.</h2>
                    <p className="op-07 lead mb-5 text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dolorem, unde molestias, tenetur fuga odio in.</p>
                    <div className="clear"></div>
                    <a href="#" className="button button-large gradient-color rounded-5 border-0">Explore Now</a>
                </div>

                <div className="col-lg-auto pe-lg-6">
                    <div className="swiper_wrapper h-auto overflow-visible customjs">
                        <div className="swiper">
                            <div className="swiper-slide rounded-6">
                                <div className="card overflow-hidden card-bg-dark">
                                    <div className="card-body p-4">
                                        <div className="mb-4 position-relative">
                                            <img src={`../theme/images/products/7.jpg`} className="rounded-5 w-100 h-auto" alt="..."/>
                                            <div id="nft-counter" className="nft-counter countdown countdown-inline customjs position-absolute start-0 top-0" data-year="2024" data-month="3" data-day="22" data-format="dHMS"></div>
                                            <div className="bbp-author position-absolute start-0 bottom-0 w-100">
                                                <a href="#"><img alt="User" src={`../theme/images/authors/3.jpg`}/></a>
                                                <a href="#"><img alt="User" src={`../theme/images/authors/2.jpg`}/></a>
                                                <a href="#"><img alt="User" src={`../theme/images/forum/images/user.png`}/></a>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between">
                                            <div className="col">
                                                <h4 className="mb-2 text-white">Live in Heaven</h4>
                                                <h6 className="card-subtitle mb-2 text-white-50">@steavejosh</h6>
                                                <div className="color fw-bold">2.33 ICP <span className="text-light text-opacity-50">/ $13.33</span></div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="dropdown">
                                                    <button className="btn btn-secondary btn-sm rounded-circle bg-transparent" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="bi-share text-light text-opacity-50"></i>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                                        <li><a className="dropdown-item" href="#">Facebook</a></li>
                                                        <li><a className="dropdown-item" href="#">Whatsapp</a></li>
                                                        <li><a className="dropdown-item" href="#">Email</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link className="menu-link card-footer-btn text-center gradient-color fw-medium py-4 text-light" to="/event">Buy Ticket</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="clear line"></div>
            <Partners/>
        </div>
    )
}