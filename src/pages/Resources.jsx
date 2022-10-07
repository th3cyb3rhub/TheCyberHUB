import React from 'react';
import {Route, Routes} from "react-router-dom";

import {
    ResourcesHome, RoadmapResources, CyberNews, Blogs, Events,Courses
} from "../components";

const Resources = () => {
    return (
        <div>
            <Routes>
                <Route exact path={"/"} element={<ResourcesHome/>}/>
                <Route exact path={"roadmapResources"} element={<RoadmapResources/>}/>
                <Route exact path={"courses"} element={<Courses/>}/>
                <Route exact path={"blogs/*"} element={<Blogs/>}/>
                <Route exact path={"events"} element={<Events/>}/>
                <Route exact path={"cyberNews"} element={<CyberNews/>}/>
            </Routes>
        </div>
    );
};

export default Resources;