import React from 'react';
import {ResourcesNavbar, Courses} from "../components";
import {Route, Routes} from "react-router-dom";
import CyberNews from "../components/Resources/CyberNews/CyberNews";

const Resources = () => {
    return (
        <div>
            <navbar>
                <ResourcesNavbar />
            </navbar>
            <Routes>
                <Route exact path={"/"} element={<Courses/>}/>
                {/*<Route exact path={"/resources/cybernews"} element={<CyberNews/>}/>*/}
            </Routes>
        </div>
    );
};

export default Resources;