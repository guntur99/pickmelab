

// import Navbar from '../components/Navbar.jsx';
import Headline from '../components/Headline.jsx';
import BestEventsCategories from '../components/BestEventsCategories.jsx';
import HowToGetTicket from '../components/HowToGetTicket.jsx';
import TopLatestEvents from '../components/TopLatestEvents.jsx';
import ConnectWallet from '../components/ConnectWallet.jsx';

import '../../public/assets/style.css';
import '../../public/assets/css/font-icons.css';
import '../../public/assets/css/swiper.css';
import '../../public/assets/css/custom.css';
import '../../public/assets/css/exm2kgx.css';
import '../../public/theme/theme.css';

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