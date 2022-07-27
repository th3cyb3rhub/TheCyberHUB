import React, {useState} from 'react';
import {Hero, Info, Contribute, Socials, ComingSoon, Sidebar, Navbar} from '../components'
import {aboutData, ResourcesData, communityData, contributeData} from "../components/Homepage/Info/Data";

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <navbar>
                <Sidebar isOpen={isOpen} toggle={toggle}/>
                <Navbar toggle={toggle}/>
            </navbar>
            <Hero/>
            <Info {...aboutData}/>
            {/*<Services/>*/}
            <Info {...ResourcesData}/>
            <Contribute {...contributeData}/>
            <Info {...communityData}/>
            <Socials />
            <ComingSoon/>
        </>
    );
};

export default Homepage;
