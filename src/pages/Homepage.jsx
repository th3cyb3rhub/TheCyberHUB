import React, { useState } from 'react';
import {
    Navbar,
    Sidebar,
    Services,
    Footer
} from '../components'

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <Services />
            <Footer />
        </>
    );
};

export default Homepage;
