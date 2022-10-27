import React from "react";
import { Hero, Info, Contribute, Socials } from "../components";
import { aboutData, ResourcesData, communityData, contributeData } from "../components/Homepage/Info/Data";

const Homepage = () => {
    return (
        <>
            <Hero />
            <Info {...aboutData} />
            <Info {...ResourcesData} />
            <Contribute {...contributeData} />
            <Info {...communityData} />
            <Socials />
        </>
    );
};

export default Homepage;
