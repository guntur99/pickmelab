

import Headline from './Headline';
import BestEventsCategories from './BestEventsCategories';
import HowToGetTicket from './HowToGetTicket';
import TopLatestEvents from './TopLatestEvents';
import ConnectWallet from './ConnectWallet';

import '../assets/style.css';
import '../assets/css/font-icons.css';
import '../assets/css/swiper.css';
import '../assets/css/custom.css';
import '../assets/css/exm2kgx.css';
import '../assets/theme/theme.css';

import '../assets/js/functions.bundle.js';
import '../assets/js/particles/particles.min.js';
import '../assets/js/skrollr.min.js';

export default function Home() {
    
    return (
        <div className="content-wrap">
            <Headline/>
            <BestEventsCategories/>
            <HowToGetTicket/>
            <TopLatestEvents/>
            <ConnectWallet/>
        </div>
    )
}