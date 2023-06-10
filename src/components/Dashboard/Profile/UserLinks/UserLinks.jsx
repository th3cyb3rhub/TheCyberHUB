import React from "react";
import { UserBio, UserInfo, UserLinksContainer } from "./UserLinksElements";
import { SocialLink, SocialUsername, UserSocialLinksContainer } from "../UserSocialLinks/UserSocialLinksElements";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium, FaTwitter, IoEarth } from "react-icons/all";
import Follow from "../Follow/Follow";

const UserLinks = ({ userDetail, userDetails }) => {
    const socialUsernames = userDetail?.socialLinks?.map(
        (item) => item?.profileUsername !== "" && item?.profileUsername,
    );

    const showSocialContainer = socialUsernames?.includes(true);

    return (
        <UserLinksContainer>
            <UserInfo>
                <span className={"name"}>{userDetail?.name}</span>
                <span className={"username"}>@{userDetail?.username}</span>
            </UserInfo>
            {userDetail?.user && <Follow userDetail={userDetail} userDetails={userDetails} />}

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
        case "IoEarth":
            return <IoEarth />;
        default:
            return null;
    }
};
export default UserLinks;
