import React from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css';

import Homepage from './Pages/Homepage';
import {Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route exact path={"/"} element={<Homepage/>}/>
                </Routes>
            </ScrollToTop>
            <Footer/>
        </>
    );
};

export default App;
