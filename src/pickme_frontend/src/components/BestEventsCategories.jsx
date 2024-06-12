import { useState } from 'react';

let listCategory = [
    { id: 0, name: 'Show All', filter: '*', status: 'activeFilter' },
    { id: 1, name: 'Concert', filter: '.event-concert', status: '' },
    { id: 2, name: 'Sport', filter: '.event-sport', status: '' },
    { id: 3, name: 'Tech', filter: '.event-tech', status: '' },
    { id: 4, name: 'Social', filter: '.event-social', status: '' },
    { id: 5, name: 'Mars', filter: '.event-mars', status: '' },
];

let listEvent = [
    { id: 0, img: 'src/assets/theme/images/products/1.jpg', title: 'Live with U in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
    { id: 1, img: 'src/assets/theme/images/products/2.jpg', title: 'Hipster portrait animal', account: '@alexPoint', icpCurrency: 9.33, dollarCurrency: 19.88 },
    { id: 2, img: 'src/assets/theme/images/products/3.jpg', title: 'Hipster portrait man', account: '@alexPoint', icpCurrency: 12.33, dollarCurrency: 23.33 },
    { id: 3, img: 'src/assets/theme/images/products/4.jpg', title: 'Portrait of a woman', account: '@steavejosh', icpCurrency: 3.33, dollarCurrency: 14.33 },
    { id: 4, img: 'src/assets/theme/images/products/5.jpg', title: 'Live in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
    { id: 5, img: 'src/assets/theme/images/products/6.jpg', title: 'Live in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
    { id: 6, img: 'src/assets/theme/images/products/7.jpg', title: 'Live in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
    { id: 7, img: 'src/assets/theme/images/products/8.jpg', title: 'Live in Heaven', account: '@steavejosh', icpCurrency: 2.33, dollarCurrency: 13.33 },
];

export default function BestEventsCategories() {

    const [categories, setCategories] = useState(listCategory);
    const [events, setEvents] = useState(listEvent);

    return (

        <div class="container pt-lg-5">

            <div class="row g-4">
                <div class="col-12 text-center">
                    <div class="text-uppercase color ls-3 fw-bold mb-2">Our Best Event</div>
                    <h2 class="display-5 fw-bold">Popular Available Drops</h2>
                </div>

                <div class="col-12">
                    <div class="grid-filter-wrap">

                        <ul class="grid-filter style-2 mx-auto mb-0" data-container="#nft-products">
                            {categories.map(category => (
                                <li className={category.status} ><a href="#" class="rounded-6 mx-1" data-filter={category.filter}>{category.name}</a></li>
                            ))}
                        </ul>

                    </div>
                </div>
                <div class="clear"></div>

                <div class="col-12">
                    <div class="row g-4">
                        {events.map(event => (
                            <article class="col-xl-3 col-lg-4 col-sm-6 col-12 nft-media nft-graphics">
                                <div class="card rounded-6 overflow-hidden card-bg-dark">
                                    <div class="card-body p-4">
                                        <div class="mb-4 position-relative">
                                            <img src={event.img} class="rounded-5" alt="..."/>
                                            <div id="nft-counter1" class="nft-counter countdown countdown-inline customjs position-absolute start-0 top-0" data-year="2024" data-month="3" data-day="22" data-format="dHMS"></div>
                                            <div class="bbp-author position-absolute start-0 bottom-0 w-100">
                                                <a href="#"><img alt="User" src="src/assets/theme/images/authors/3.jpg"/></a>
                                                <a href="#"><img alt="User" src="src/assets/theme/images/authors/2.jpg"/></a>
                                                <a href="#"><img alt="User" src="src/assets/theme/images/authors/1.jpg"/></a>
                                            </div>
                                        </div>
                                        <div class="row justify-content-between">
                                            <div class="col">
                                                <h4 class="mb-2">{event.title}</h4>
                                                <h6 class="card-subtitle mb-2 text-white-50">{event.account}</h6>
                                                <div class="color fw-bold">{event.icpCurrency} ICP <span class="text-light text-opacity-50">/ ${event.dollarCurrency}</span></div>
                                            </div>
                                            <div class="col-auto">
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary btn-sm rounded-circle bg-transparent" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="bi-share text-light text-opacity-50"></i>
                                                    </button>
                                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                                        <li><a class="dropdown-item" href="#">Facebook</a></li>
                                                        <li><a class="dropdown-item" href="#">Whatsapp</a></li>
                                                        <li><a class="dropdown-item" href="#">Email</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" class="card-footer-btn text-center gradient-color fw-medium text-light h-op-09">
                                        Buy Ticket
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}