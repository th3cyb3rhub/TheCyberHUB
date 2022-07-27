import React, {useState} from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import {Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";

const App = () => {
    return (
        <div>
            <ScrollToTop>
                <Routes>
                    <Route exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/resources"} element={<Resources/>}/>
                </Routes>
            </ScrollToTop>
            <Footer/>
        </div>
    );
};

export default App;
