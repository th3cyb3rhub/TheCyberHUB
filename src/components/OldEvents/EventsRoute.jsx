import React from "react";
import { Route, Routes } from "react-router-dom";
import { Event, Events, NotFound } from "src/components/index";

const EventsRoute = () => {
    return (
        <Routes>
            <Route index element={<Events />} />
            <Route path={":slug"} element={<Event />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default EventsRoute;
