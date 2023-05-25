import React from "react";
import { EditUserBioTextarea, UserBio, UserInfo, UserLinksContainer } from "../UserLinks/UserLinksElements";
import { EditSocialUsername, SocialLink, UserSocialLinksContainer } from "../UserSocialLinks/UserSocialLinksElements";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium, FaTwitter, IoEarth, IoMdSave } from "react-icons/all";
import { FollowButton } from "../Follow/FollowElements";

const UserLinks = ({ userDetail, userDetailData, setUserDetailData, onSubmit }) => {
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

    const handleSave = (e) => {
        onSubmit(e);
    };
    return (
        <UserLinksContainer>
            <UserInfo>
                <span className={"name"}>{userDetail?.name}</span>
                <span className={"username"}>@{userDetail?.username}</span>
            </UserInfo>

            <FollowButton
                onClick={handleSave}
                style={{
                    width: "initial",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "start",
                    padding: "0.5rem 1.5rem",
                    gap: "5px",
                    fontSize: "1rem",
                }}
            >
                <IoMdSave /> Save
            </FollowButton>
            <UserBio>
                <EditUserBioTextarea
                    placeholder="bio..."
                    name="bio"
                    id="bio"
                    cols="30"
                    rows="10"
                    defaultValue={userDetail.bio}
                    onChange={handleBioChange}
                />
            </UserBio>

            <UserSocialLinksContainer>
                {userDetailData?.socialLinks?.map((item, index) => (
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
