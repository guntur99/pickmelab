

import Headline from './Headline';
import BestEventsCategories from './BestEventsCategories';
import HowToGetTicket from './HowToGetTicket';
import TopLatestEvents from './TopLatestEvents';
import ConnectWallet from './ConnectWallet';

import '../assets/style.css'
import '../assets/css/font-icons.css'
import '../assets/css/swiper.css'
import '../assets/css/custom.css'
import '../assets/theme/theme.css'

export default function Home() {
    return (
        <div class="content-wrap">
            <Headline/>
            <BestEventsCategories/>
            <HowToGetTicket/>
            <TopLatestEvents/>
            <ConnectWallet/>
        </div>
    )
}