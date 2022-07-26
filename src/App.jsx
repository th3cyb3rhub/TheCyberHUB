import React, {useState} from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import Courses from './pages/Courses';
import {Footer, Navbar, Sidebar} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import {Navigate} from "react-router";
import YoutubeCourses from "./components/Courses/YoutubeCourses";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <ScrollToTop>
                <Routes>
                    <Route exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/courses"} element={<YoutubeCourses/>}/>
                </Routes>
            </ScrollToTop>
            <Footer/>
        </>
    );
};

export default App;
