import { InternshipHeader, InternshipHeading } from "./HeadingBannerElements";
import React from "react";

const HeadingBanner = ({ heading }) => {
    return (
        <InternshipHeader>
            <InternshipHeading>{heading}</InternshipHeading>
        </InternshipHeader>
    );
};

export default HeadingBanner;
