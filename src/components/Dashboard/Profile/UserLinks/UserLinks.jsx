import React from "react";
import { EditUserBioTextarea, UserBio, UserInfo, UserLinksContainer } from "./UserLinksElements";
import {
    EditSocialUsername,
    SocialLink,
    SocialUsername,
    UserSocialLinksContainer,
} from "../UserSocialLinks/UserSocialLinksElements";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium, FaTwitter, IoEarth } from "react-icons/all";

const UserLinks = ({ userDetail, socialLinks, isEdit, userDetailData, setUserDetailData, bio }) => {
    const updateUserLinks = (index, field, value) => {
        const updatedSocialLinksData = [...userDetailData.socialLinks]; // create a new array reference
        updatedSocialLinksData[index] = {
            ...updatedSocialLinksData[index],
            [field]: value,
        };
        setUserDetailData({ ...userDetailData, socialLinks: updatedSocialLinksData }); // update the state with the new array
    };

    const handleBioChange = (e) => {
        const value = e.target.value;
        setUserDetailData({ ...userDetailData, bio: value });
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

    return (
        <UserLinksContainer>
            <UserInfo>
                <span className={"name"}>{userDetail?.name}</span>
                <span className={"username"}>@{userDetail?.username}</span>
            </UserInfo>

            <UserBio>
                {isEdit ? (
                    <EditUserBioTextarea
                        placeholder="bio..."
                        name="bio"
                        id="bio"
                        cols="30"
                        rows="10"
                        defaultValue={bio}
                        onChange={handleBioChange}
                    />
                ) : (
                    <p className={"bio"}>{bio}</p>
                )}
            </UserBio>

            <UserSocialLinksContainer>
                {!isEdit &&
                    userDetailData?.socialLinks &&
                    userDetailData?.socialLinks?.map((item, index) => (
                        <SocialLink key={index}>
                            {item?.profileUsername && item?.websiteLink && (
                                <>
                                    {getIconComponent(item?.icon)}
                                    <SocialUsername href={item?.websiteLink + item?.profileUsername} target="_blank">
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

                {isEdit &&
                    userDetailData?.socialLinks?.map((item, index) => (
                        <SocialLink key={index}>
                            {getIconComponent(item.icon)}
                            <EditSocialUsername
                                type="text"
                                name={`profileUsername${index}`}
                                id={`profileUsername${index}`}
                                defaultValue={item?.profileUsername}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    updateUserLinks(index, "profileUsername", value);
                                }}
                            />
                        </SocialLink>
                    ))}
            </UserSocialLinksContainer>
        </UserLinksContainer>
    );
};

export default UserLinks;
