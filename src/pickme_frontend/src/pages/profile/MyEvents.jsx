import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { pickme_backend } from 'declarations/pickme_backend';

let listCategory = [
    { id: 0, name: 'Your Upcoming Events', filter: '.your-upcoming-events', status: 'activeFilter' },
    { id: 1, name: 'Your Past Events', filter: '.your-past-events', status: '' },
    { id: 2, name: 'Your Purchased Events', filter: '.your-purchased-events', status: '' },
    { id: 3, name: 'Your Attendance Events', filter: '.your-attendance-events', status: '' },
];

let listEvent = [
    { id: 0, img: '../theme/images/products/1.jpg', title: 'Live with U in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
    { id: 1, img: '../theme/images/products/2.jpg', title: 'Hipster portrait animal', account: '@alexPoint', icpCurrency: 9.33, dollarCurrency: 19.88 },
    { id: 2, img: '../theme/images/products/3.jpg', title: 'Hipster portrait man', account: '@alexPoint', icpCurrency: 12.33, dollarCurrency: 23.33 },
    { id: 3, img: '../theme/images/products/4.jpg', title: 'Portrait of a woman', account: '@steavejosh', icpCurrency: 3.33, dollarCurrency: 14.33 },
    { id: 4, img: '../theme/images/products/5.jpg', title: 'Live in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
];

export default function MyEvents({events}) {

    const [categories, setCategories] = useState(listCategory);

    return (

        <div className="container pt-lg-5">

            <div className="row g-4">

                <div className="col-12">
                    <div className="grid-filter-wrap text-start">

                        <ul className="grid-filter style-2 mx-auto mb-0" data-container="#nft-products">
                            {categories.map(category => (
                                <li key={category.id} className={category.status} ><a href="#" className={ category.status == 'activeFilter' ? "button-gradient gradient-color button rounded-6 mx-1" : 'button text-white rounded-6 mx-1' } data-filter={category.filter}>{category.name}</a></li>
                            ))}
                        </ul>

                    </div>
                </div>
                <div className="clear"></div>

                <div className="col-12">
                    <div className="row g-4">
                        {events.map(event => (
                            <article key={event.uuid} className="col-xl-4 col-lg-4 col-sm-6 col-12 nft-media nft-graphics">
                                <div className="card rounded-6 overflow-hidden card-bg-dark">
                                    <div className="card-body p-4">
                                        <div className="mb-4 position-relative">
                                            <img src={event.poster} className="rounded-5 w-100 h-auto" alt="..."/>
                                            <div id="nft-counter1" className="nft-counter countdown countdown-inline customjs position-absolute start-0 top-0" data-year="2024" data-month="3" data-day="22" data-format="dHMS"></div>
                                        </div>
                                        <div className="row justify-content-between">
                                            <div className="col">
                                                <h4 className="text-white mb-2">{event.title}</h4>
                                                <h6 className="card-subtitle mb-2 text-white-50">{event.published_by}</h6>
                                                <div className="color fw-bold">{event.icp_price} ICP <span className="text-light text-opacity-50">/ ${event.price}</span></div>
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

                                    <Link className="menu-link card-footer-btn text-center gradient-color fw-medium text-light py-4 h-op-09" to={`/event/${event.uuid}`}>Buy Ticket</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}