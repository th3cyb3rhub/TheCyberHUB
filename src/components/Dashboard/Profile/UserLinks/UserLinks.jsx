import React from "react";
import { UserBio, UserLinksContainer } from "./UserLinksElements";
import { SocialLink, SocialUsername, UserSocialLinksContainer } from "../UserSocialLinks/UserSocialLinksElements";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium, FaTwitter } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import ConnectionsAndFollows from "../ConnectionsAndFollows/ConnectionsAndFollows";
import UserInfo from "./UserInfo";

const UserLinks = ({ userDetail, userDetails, setShowAuthPopup }) => {
    const socialUsernames = userDetail?.socialLinks?.map(
        (item) => item?.profileUsername !== "" && item?.profileUsername,
    );

    const showSocialContainer = socialUsernames?.includes(userDetail?.username);

    return (
        <UserLinksContainer>
            <UserInfo>{userDetail}</UserInfo>

            {userDetail?.user && (
                <ConnectionsAndFollows
                    userDetail={userDetail}
                    userDetails={userDetails}
                    setShowAuthPopup={setShowAuthPopup}
                />
            )}

            {userDetail?.bio?.length === 0 || !userDetail?.bio ? null : (
                <UserBio>
                    <p className={"bio"}>{userDetail?.bio}</p>
                </UserBio>
            )}

            {showSocialContainer ? (
                <UserSocialLinksContainer>
                    {userDetail?.socialLinks &&
                        userDetail?.socialLinks?.map((item, index) => (
                            <SocialLink key={index}>
                                {item?.profileUsername && item?.websiteLink && (
                                    <>
                                        {getIconComponent(item?.icon)}
                                        <SocialUsername
                                            href={item?.websiteLink + item?.profileUsername}
                                            target="_blank"
                                        >
                                            {item?.profileUsername}
                                        </SocialUsername>
                                    </>
                                )}
                                {item?.profileUsername && !item?.websiteLink && (
                                    <>
                                        {getIconComponent(item?.icon)}
                                        <SocialUsername
                                            href={
                                                item?.profileUsername.startsWith("http")
                                                    ? item?.profileUsername
                                                    : "https://" + item?.profileUsername
                                            }
                                            target="_blank"
                                        >
                                            {item?.profileUsername}
                                        </SocialUsername>
                                    </>
                                )}
                            </SocialLink>
                        ))}
                </UserSocialLinksContainer>
            ) : null}
        </UserLinksContainer>
    );
};

const getIconComponent = (iconName) => {
    switch (iconName) {
        case "FaInstagram":
            return <FaInstagram />;
        case "FaTwitter":
            return <FaTwitter />;
        case "FaLinkedin":
            return <FaLinkedin />;
        case "FaGithub":
            return <FaGithub />;
        case "FaMedium":
            return <FaMedium />;
        case "IoEarth" || "RiEarthFill":
            return <CgWebsite />;
        default:
            return null;
    }
};
export default UserLinks;
