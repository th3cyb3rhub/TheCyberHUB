import React, {useState} from 'react';
import {
    Navbar,
    Sidebar,
    Hero,
    Info,
    Services,
    Footer
} from '../components'
import {homeObjOne, homeObjTwo, homeObjThree, Contribute} from "../components/Info/Data";

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
            <Services/>
            <Info {...homeObjThree}/>
            <Info {...Contribute}/>
            <Footer />
        </>
    );
};

export default Homepage;
