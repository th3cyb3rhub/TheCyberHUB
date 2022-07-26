import React from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import Courses from './pages/Courses';
import {Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import {Navigate} from "react-router";

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
