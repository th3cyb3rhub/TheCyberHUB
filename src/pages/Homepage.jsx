import React, {useState} from 'react';
import {Navbar, Sidebar, Hero, Info, Services, Contribute, ComingSoon} from '../components'
import {aboutData, coursesData, communityData, contributeData} from "../components/Homepage/Info/Data";

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <Hero/>

            <Info {...aboutData}/>
            <Info {...coursesData}/>
            <Services/>
            <Info {...communityData}/>
            <Contribute {...contributeData}/>
            <ComingSoon/>
        </>
    );
};

export default Homepage;
