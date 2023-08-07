import React from "react";
import { Hero, Info, Socials } from "../index";
import { aboutData, ResourcesData, communityData, contributeData } from "./Info/Data";
import ContactForm from "./ContactForm/ContactForm";

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
