import React from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import {Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import {Navigate} from "react-router";
import Courses from "./components/Courses";

const App = () => {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/courses"} element={<Courses/>}/>
                </Routes>
            </ScrollToTop>
            <Footer/>
        </>
    );
};

export default App;
