import { useState } from 'react';

let listEvent = [
    { id: 0, img: 'src/assets/theme/images/users/1.jpg', title: 'Chasseur', icpCurrency: 2.643 },
    { id: 1, img: 'src/assets/theme/images/users/2.jpg', title: 'Hoydenism_', icpCurrency: 643 },
    { id: 2, img: 'src/assets/theme/images/users/3.jpg', title: 'Raconteur_y', icpCurrency: 1.643 },
    { id: 3, img: 'src/assets/theme/images/users/4.jpg', title: 'Kumquat', icpCurrency: 2.001 },
    { id: 4, img: 'src/assets/theme/images/users/5.jpg', title: 'Razzmatazz_z', icpCurrency: 2.243 },
    { id: 5, img: 'src/assets/theme/images/users/6.jpg', title: 'Zeugma', icpCurrency: 3.643 },
    { id: 6, img: 'src/assets/theme/images/users/7.jpg', title: 'Sanguine', icpCurrency: 5.643 },
    { id: 7, img: 'src/assets/theme/images/users/8.jpg', title: 'Portico', icpCurrency: 643 },
    { id: 8, img: 'src/assets/theme/images/users/9.jpg', title: 'Humbug', icpCurrency: 243 },
];

export default function TopEvents() {

    const [events, setEvents] = useState(listEvent);
    
    return (
        <div>
            <div class="line"></div>

            <div class="container py-lg-5">
                <div class="row g-4">
                    <div class="col-12 text-lg-center mb-lg-5">
                        <div class="text-uppercase color ls-3 fw-bold mb-2">Latest Event</div>
                        <div class="hstack align-content-center justify-content-center">
                            <h2 class="display-5 fw-bold mb-0">Top Latest Event in</h2>
                            <div class="ms-3">
                                <select class="form-select form-select-lg headeing-select mb-0" aria-label="example">
                                    <option value="7 Days" selected>a 7 Days</option>
                                    <option value="1 Month">a month</option>
                                    <option value="3 Months">3 Months</option>
                                    <option value="Year">a Year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>

                    {events.map(event => (
                        <div class="col-md-4">
                            <div class="card rounded-6 card-bg-dark">
                                <div class="card-body p-4">
                                    <div class="row g-3 align-items-center">
                                        <div class="col-auto user-rank">#1</div>
                                        <div class="col-auto">
                                            <img src={event.img} class="square square-md rounded-6" alt="..."/>
                                                <span class="position-absolute top-0 mt-1 translate-middle p-2 bg-color border-0 rounded-circle"><span class="visually-hidden">Online</span></span>
                                        </div>
                                        <div class="col">
                                            <h4 class="mb-0"><a class="text-white" href="#">{event.title}</a></h4>
                                            <h6 class="card-subtitle m-2 text-white-50">{event.icpCurrency} ICP</h6>
                                        </div>
                                        <div class="col-auto">
                                            <div class="dropdown">
                                                <button class="btn btn-secondary btn-sm rounded-circle bg-transparent" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi-three-dots text-light text-opacity-50"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                    <li><a class="dropdown-item" href="#">Facebook</a></li>
                                                    <li><a class="dropdown-item" href="#">Whatsapp</a></li>
                                                    <li><a class="dropdown-item" href="#">Email</a></li>
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