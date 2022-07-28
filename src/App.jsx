import React, {useState} from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import {Courses, Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";
import CyberNews from "./components/Resources/CyberNews/CyberNews";
import WriteUps from "./components/Resources/WriteUps/WriteUps";

const App = () => {
    return (
        <div>
            <ScrollToTop>
                <Routes>
                    <Route index exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/resources"} element={<Resources/>}>
                        <Route index element={<Courses/>}/>
                        <Route path={"cybernews"} element={<CyberNews/>}/>
                        <Route path={"writeups"} element={<WriteUps/>}/>
                    </Route>
                </Routes>
            </ScrollToTop>
            <Footer/>
        </div>
    );
};

export default App;
