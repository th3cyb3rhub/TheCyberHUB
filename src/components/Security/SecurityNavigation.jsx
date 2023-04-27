import React from "react";
import { InternshipHeader, InternshipHeading } from "../Resources/Jobs/Internship/InternshipElements";
import { NavigationContainer, NavigationLink } from "./SecurityElements";

const SecurityNavigation = ({ heading }) => {
    return (
        <>
            <InternshipHeader>
                <InternshipHeading> {heading} </InternshipHeading>
            </InternshipHeader>

            <NavigationContainer>
                <NavigationLink to="/security"> Security </NavigationLink>
                <NavigationLink to="/security/rules-of-engagement"> Rules of Engagement </NavigationLink>
                <NavigationLink to="/security/hall-of-fame"> Hall of Fame </NavigationLink>
            </NavigationContainer>
        </>
    );
};

export default SecurityNavigation;
