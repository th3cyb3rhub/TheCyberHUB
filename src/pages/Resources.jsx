import React, {useState} from 'react';
import {ResourcesNavbar, Courses, Events, Jobs, ResourcesHome, ResourcesSidebar} from "../components";
import {Route, Routes} from "react-router-dom";
import CyberNews from "../components/Resources/CyberNews/CyberNews";
import WriteUps from "../components/Resources/WriteUps/WriteUps";

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
                <Route exact path={"/"} element={<Courses/>}/>
                <Route exact path={"courses"} element={<Courses/>}/>
                <Route exact path={"cybernews"} element={<CyberNews/>}/>
                <Route path={"writeups"} element={<WriteUps/>}/>
                <Route path={"events"} element={<Events/>}/>
                <Route path={"jobs"} element={<Jobs/>}/>
            </Routes>
        </div>
    );
};

export default Resources;