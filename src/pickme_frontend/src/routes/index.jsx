import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home.jsx';
import EventDetail from '../pages/event/EventDetail.jsx';

function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event-detail" element={<EventDetail />} />
        </Routes>
    )
}

export default RoutesIndex