import { useState } from 'react';

let listEvent = [
    { id: 0, img: '../theme/images/users/1.jpg', title: 'Chasseur', icpCurrency: 2.643 },
    { id: 1, img: '../theme/images/users/2.jpg', title: 'Hoydenism_', icpCurrency: 643 },
    { id: 2, img: '../theme/images/users/3.jpg', title: 'Raconteur_y', icpCurrency: 1.643 },
    { id: 3, img: '../theme/images/users/4.jpg', title: 'Kumquat', icpCurrency: 2.001 },
    { id: 4, img: '../theme/images/users/5.jpg', title: 'Razzmatazz_z', icpCurrency: 2.243 },
    { id: 5, img: '../theme/images/users/6.jpg', title: 'Zeugma', icpCurrency: 3.643 },
    { id: 6, img: '../theme/images/users/7.jpg', title: 'Sanguine', icpCurrency: 5.643 },
    { id: 7, img: '../theme/images/users/8.jpg', title: 'Portico', icpCurrency: 643 },
    { id: 8, img: '../theme/images/users/9.jpg', title: 'Humbug', icpCurrency: 243 },
];

let listTime = [
    { id: 0, val: 'Week' },
    { id: 1, val: 'Month' },
    { id: 2, val: '3 Month' },
    { id: 3, val: 'Year' },
];

export default function TopEvents() {

    const [events, setEvents] = useState(listEvent);
    const [times, setTimes] = useState(listTime);
    
    return (
        <div>
            <div className="line"></div>

            <div className="container py-lg-5">
                <div className="row g-4">
                    <div className="col-12 text-lg-center mb-lg-5">
                        <div className="text-uppercase color ls-3 fw-bold mb-2">Latest Event</div>
                        <div className="hstack align-content-center justify-content-center">
                            <h2 className="display-5 fw-bold text-white mb-0">Top Latest Event in</h2>
                            <div className="ms-3">
                                <select className="form-select form-select-lg color headeing-select mb-0" aria-label="example">
                                    {times.map(time => (
                                        <option key={time.id} value={time.val}>{time.val}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>

                    {events.map(event => (
                        <div key={event.id} className="col-md-4">
                            <div className="card rounded-6 card-bg-dark">
                                <div className="card-body p-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-auto user-rank">#1</div>
                                        <div className="col-auto">
                                            <img src={event.img} className="square square-md rounded-6" alt="..."/>
                                                <span className="position-absolute top-0 mt-1 translate-middle p-2 bg-color border-0 rounded-circle"><span className="visually-hidden">Online</span></span>
                                        </div>
                                        <div className="col">
                                            <h4 className="mb-0"><a className="text-white" href="#">{event.title}</a></h4>
                                            <h6 className="card-subtitle m-2 text-white-50">{event.icpCurrency} ICP</h6>
                                        </div>
                                        <div className="col-auto">
                                            <div className="dropdown">
                                                <button className="btn btn-secondary btn-sm rounded-circle bg-transparent" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi-three-dots text-light text-opacity-50"></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                    <li><a className="dropdown-item" href="#">Facebook</a></li>
                                                    <li><a className="dropdown-item" href="#">Whatsapp</a></li>
                                                    <li><a className="dropdown-item" href="#">Email</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}