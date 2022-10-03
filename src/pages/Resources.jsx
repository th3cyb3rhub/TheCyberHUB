import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";

import {ResourcesNavbar,ResourcesSidebar,
    ResourcesHome, RoadmapResources, CyberNews, Blogs, Events
} from "../components";

const Resources = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <navbar>
                <ResourcesSidebar isOpen={isOpen} toggle={toggle}/>
                <ResourcesNavbar toggle={toggle}/>
            </navbar>
            <Routes>
                <Route exact path={"/"} element={<ResourcesHome/>}/>
                <Route exact path={"roadmapResources"} element={<RoadmapResources/>}/>
                <Route exact path={"blogs/*"} element={<Blogs/>}/>
                <Route exact path={"events"} element={<Events/>}/>
                <Route exact path={"cyberNews"} element={<CyberNews/>}/>
            </Routes>
        </div>
    );
};

export default Resources;