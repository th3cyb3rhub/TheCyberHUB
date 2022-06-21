import React, {useState} from 'react';
import {
    Navbar,
    Sidebar,
    Hero,
} from '../components'

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <Hero/>
        </>
    );
};

export default Homepage;
