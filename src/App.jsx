import React from 'react';

import './App.css';

import Homepage from './Pages/Homepage';
import {Footer} from "./components";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
    return (
        <>
            <ScrollToTop>
                        <Homepage/>
            </ScrollToTop>
            <Footer/>
        </>
    );
};

export default App;
