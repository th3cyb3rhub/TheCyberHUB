import React, {useState} from 'react';
import {
    Navbar,
    Sidebar,
    Hero,
    Info,
} from '../components'
import {homeObjOne, homeObjTwo, homeObjThree} from "../components/Info/Data";

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <Hero/>
            <Info {...homeObjOne}/>
            <Info {...homeObjTwo}/>
            <Info {...homeObjThree}/>
        </>
    );
};

export default Homepage;
