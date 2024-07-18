import { Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Home from "../pages/Home.jsx"
import EventCreate from "../pages/event/Create.jsx"
import Event from "../pages/event/Event.jsx"
import Profile from "../pages/profile/Profile.jsx"
import { useAuth } from '../AuthProvider';
import { Navigate } from "react-router-dom";

function RoutesIndex() {
    const { isAuth } = useAuth();
    const [logged] = useState(window.localStorage.getItem('logged'));

    if (isAuth) {
        return (
            <>
            {logged &&
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/event/create" element={<EventCreate />} />
                    <Route path="/event/:eventId" element={<Event />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                }
            </>
        );
    }

    if(!logged){
        return (
            <>
                <Navigate to="/" />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </>
        );
    }
}

export default RoutesIndex
