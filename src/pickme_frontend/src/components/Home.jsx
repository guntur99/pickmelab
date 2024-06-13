

import Headline from './Headline';
import BestEventsCategories from './BestEventsCategories';
import HowToGetTicket from './HowToGetTicket';
import TopLatestEvents from './TopLatestEvents';
import ConnectWallet from './ConnectWallet';

import '../../public/assets/style.css';
import '../../public/assets/css/font-icons.css';
import '../../public/assets/css/swiper.css';
import '../../public/assets/css/custom.css';
import '../../public/assets/css/exm2kgx.css';
import '../../public/theme/theme.css';

// import '../../public/assets/js/functions.bundle.js';
import '../../public/assets/js/particles/particles.min.js';
import '../../public/assets/js/skrollr.min.js';

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