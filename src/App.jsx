import React from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";

import Homepage from './pages/Homepage';
import {Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";
import {Navigate} from "react-router";

const App = () => {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route exact path={"/"} element={<Homepage/>}/>
                    <Route path='/404' element={<Homepage/>}/>
                    <Route path='*' element={<Navigate replace to='/404'/>} />
            </Routes>
            </ScrollToTop>
            <Footer/>
        </>
    );
};

export default App;
