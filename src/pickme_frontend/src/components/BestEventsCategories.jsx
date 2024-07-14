import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { pickme_backend } from 'declarations/pickme_backend';

let listCategory = [
    { id: 0, name: 'Show All', filter: '*', status: 'activeFilter' },
    { id: 1, name: 'Concert', filter: '.event-concert', status: '' },
    { id: 2, name: 'Sport', filter: '.event-sport', status: '' },
    { id: 3, name: 'Tech', filter: '.event-tech', status: '' },
    { id: 4, name: 'Social', filter: '.event-social', status: '' },
    // { id: 5, name: 'Mars', filter: '.event-mars', status: '' },
];

export default function BestEventsCategories() {

    const [activeRecent, setActiveRecent] = useState('Show All');
    const [categories] = useState(listCategory);
    const [events, setEvents] = useState([]);
    const [eventsFiltered, setEventsFiltered] = useState([]);

    useEffect(() => {
        pickme_backend.getAllEvent().then((res) => {
            const data = res.ok;
            const maxDate = format(new Date(), 'yyyy-MM-dd');
            const newEvent = data.filter((event) => event.date > maxDate );
            setEvents(newEvent);
            setEventsFiltered(newEvent);
        });
    },[]);

    const handleActiveRecent = (e) => {
        e.preventDefault();
        setActiveRecent(e.target.text)
        if (e.target.text === "Show All") {
            setEventsFiltered(events);
        }else{
            const maxDate = format(new Date(), 'yyyy-MM-dd');
            const eventFilter = events.filter((event) => event.category === e.target.text && event.date > maxDate );
            if (eventFilter) {
                setEventsFiltered(eventFilter);
            }
        }
    }

    return (

        <div className="container pt-lg-5">

            <div className="row g-4">
                <div className="col-12 text-center">
                    <div className="text-uppercase color ls-3 fw-bold mb-2">Our Best Event</div>
                    <h2 className="display-5 fw-bold text-white">Popular Available Drops</h2>
                </div>
                <div className="col-12">
                    <div className="grid-filter-wrap">

                        <ul className="grid-filter style-2 mx-auto mb-0" data-container="#nft-products">
                            {categories.map(category => (
                                <li onClick={handleActiveRecent} key={category.id} className="text-light" ><a href='#' className={ category.name == activeRecent ? "button-gradient gradient-color text-light rounded-6 mx-1" : 'text-light rounded-6 mx-1' } data-filter={category.filter}>{category.name}</a></li>
                            ))}
                        </ul>

                    </div>
                </div>
                <div className="clear"></div>

                <div className="col-12">
                    <div className="row g-4">
                        {eventsFiltered.map(event => (
                            <article key={event.uuid} className="col-xl-3 col-lg-4 col-sm-6 col-12 nft-media nft-graphics">
                                <div className="card rounded-6 overflow-hidden card-bg-dark">
                                    <div className="card-body p-4">
                                        <div className="mb-4 position-relative">
                                            <img src={event.poster} className="rounded-5 w-100 h-auto" alt="..."/>
                                            <div id="nft-counter1" className="nft-counter countdown countdown-inline customjs position-absolute start-0 top-0" data-year="2024" data-month="3" data-day="22" data-format="dHMS"></div>
                                            <div className="bbp-author position-absolute start-0 bottom-0 w-100">
                                                <a><img alt="User" src="../theme/images/authors/3.jpg"/></a>
                                                <a><img alt="User" src="../theme/images/authors/2.jpg"/></a>
                                                <a><img alt="User" src="../theme/images/authors/1.jpg"/></a>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between">
                                            <div className="col">
                                                <h4 className="text-white mb-2">{event.title}</h4>
                                                <h6 className="card-subtitle mb-2 text-white-50">@{event.published_by}</h6>
                                                <div className="color fw-bold">{event.icp_price} ICP <span className="text-light text-opacity-50">/ ${event.price}</span></div>
                                            </div>
                                            {/* <div className="col-auto">
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
                                            </div> */}
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