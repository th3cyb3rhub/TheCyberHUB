import React from "react";
import { Hero, Info, Socials } from "src/components/index";
import { aboutData, ResourcesData, communityData, contributeData, desktopAppDownloadData } from "./Info/Data";
import ContactForm from "./ContactForm/ContactForm";

const Homepage = () => {
    return (
        <>
            <Hero />
            <Info {...aboutData} />
            <Info {...desktopAppDownloadData} />
            <Info {...ResourcesData} />
            <Info {...contributeData} />
            <Info {...communityData} />
            <Socials />
            {/* <SpecialSponsors /> */}
            <ContactForm />
        </>
    );
};

export default Homepage;
