import React, {useState} from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import {Courses, Footer, ResourcesHome} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";
import {CyberNews, WriteUps, Events, Jobs} from "./components";

const App = () => {
    return (
        <div>
            <ScrollToTop>
                <Routes>
                    <Route index exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/resources"} element={<Resources/>}>
                        <Route index element={<ResourcesHome/>}/>
                        <Route path={"courses"} element={<Courses/>}/>
                        <Route path={"cybernews"} element={<CyberNews/>}/>
                        <Route path={"writeups"} element={<WriteUps/>}/>
                        <Route path={"events"} element={<Events/>}/>
                        <Route path={"jobs"} element={<Jobs/>}/>
                    </Route>
                </Routes>
            </ScrollToTop>
            <Footer/>
        </div>
    );
};

export default App;
