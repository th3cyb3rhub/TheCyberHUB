import React, {useState} from 'react';
import {Navbar, Sidebar, Hero, Info, Contribute,Socials, ComingSoon} from '../components'
import {aboutData, ResourcesData, communityData, contributeData} from "../components/Homepage/Info/Data";

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>

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
