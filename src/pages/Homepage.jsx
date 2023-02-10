import React from "react";
import { Hero, Info, Socials } from "../components";
import { aboutData, ResourcesData, communityData, contributeData } from "../components/Homepage/Info/Data";
import ContactForm from "../components/ContactForm/ContactForm";

const Homepage = () => {
    return (
        <>
            <Hero />
            <Info {...aboutData} />
            <Info {...ResourcesData} />
            <Info {...contributeData} />
            <Info {...communityData} />
            <Socials />
            <ContactForm />
        </>
    );
};

export default Homepage;
