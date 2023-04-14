import React from "react";
import { CyberProfilesContainer, CyberProfilesHeading } from "./CyberProfilesElements";

const CyberProfiles = ({ cyberProfiles, userDetailData, setUserDetailData, isEdit }) => {
    // const onChange = (e) => {
    //     const value = e.target.value;
    //     setUserDetailData((prevState) => ({
    //         ...prevState,
    //         aboutMe: value,
    //     }));
    // };
    const THMUsername = "kabir0x23";
    const THMBadgeURL = `https://tryhackme-badges.s3.amazonaws.com/${THMUsername}.png`;
    const THMProfileURL = `https://tryhackme.com/p/${THMUsername}`;

    return (
        <CyberProfilesContainer>
            <CyberProfilesHeading>Cyber Profiles</CyberProfilesHeading>
            {isEdit ? (
                <input />
            ) : (
                <a href={THMProfileURL} target={"_blank"} rel="noreferrer">
                    <img src={THMBadgeURL} alt="TryHackMe" />
                </a>
            )}
        </CyberProfilesContainer>
    );
};

export default CyberProfiles;
