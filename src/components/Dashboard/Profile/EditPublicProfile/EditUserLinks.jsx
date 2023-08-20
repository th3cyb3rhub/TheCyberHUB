import React, { useState } from "react";
import { EditUserBioTextarea, UserBio, UserInfo, UserLinksContainer } from "../UserLinks/UserLinksElements";
import { EditSocialUsername, SocialLink, UserSocialLinksContainer } from "../UserSocialLinks/UserSocialLinksElements";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium, FaTwitter } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { FollowButton } from "../Follow/FollowElements";
import { CgWebsite } from "react-icons/cg";
import { UserPicture } from "../../../Explore/Users/UsersElements";
import { EditButton } from "../SkillSet/SkillSetElements";
import { getApiUrl, cdnContentImagesUrl } from "../../../../features/apiUrl";
import { toast } from "react-toastify";
import {
    AddCoverImageSection,
    AddImage,
    ImageUploadInput,
    ImageUploadLabel,
} from "../../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import axios from "axios";

const UserLinks = ({ userDetail, userDetailData, setUserDetailData, onSubmit }) => {
    const [file, setFile] = useState("");
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

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = `user-${Date.now()}.${file && file.type.split("/")[1]}`;

        setUserDetailData({ ...userDetailData, avatar: fileName.split("-")[1] });

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile();
            const newFile = new File([reader.result], fileName, { type: file && file.type });
            setFile(newFile);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSave = async (e) => {
        onSubmit(e);

        async function uploadCoverImage() {
            try {
                const formData = new FormData();
                formData.append("image", file);
                const API_URL = getApiUrl("api/upload");
                await axios.post(API_URL, formData);
            } catch (err) {
                toast.error(err.message);
            }
        }

        if (file) await uploadCoverImage();
    };
    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatarDummy.png"));
    return (
        <UserLinksContainer>
            <UserInfo>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <UserPicture
                        style={{ height: "200px", width: "200px" }}
                        src={file ? URL.createObjectURL(file) : avatar}
                    />
                    <EditButton>
                        <AddCoverImageSection>
                            <ImageUploadLabel
                                style={{ color: "grey", background: "transparent", border: "transparent" }}
                                htmlFor="avatar"
                            >
                                <AddImage />
                            </ImageUploadLabel>
                            <ImageUploadInput
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={onFileChange}
                                style={{ display: "none" }}
                            />
                        </AddCoverImageSection>
                    </EditButton>
                </div>
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
                        {getIconComponent(item?.icon)}
                        <EditSocialUsername
                            type="text"
                            name={`profileUsername${index}`}
                            id={`profileUsername${index}`}
                            defaultValue={item?.profileUsername}
                            placeholder={item?.platform + " username"}
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
            return (
                <FaInstagram
                    style={{
                        // color: "#e1306c",
                        fontSize: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                    }}
                />
            );
        case "FaTwitter":
            return (
                <FaTwitter
                    style={{
                        // color: "#1DA1F2",
                        fontSize: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                    }}
                />
            );
        case "FaLinkedin":
            return (
                <FaLinkedin
                    style={{
                        // color: "#0077b5",
                        fontSize: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                    }}
                />
            );
        case "FaGithub":
            return (
                <FaGithub
                    style={{
                        // color: "#a9a9a9",
                        fontSize: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                    }}
                />
            );
        case "FaMedium":
            return (
                <FaMedium
                    style={{
                        // color: "#dcdcdc",
                        fontSize: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                    }}
                />
            );
        case "IoEarth" || "RiEarthFill":
            return (
                <CgWebsite
                    style={{
                        // color: "#dcdcdc",
                        fontSize: "1.5rem",
                        minWidth: "1.5rem",
                        minHeight: "1.5rem",
                    }}
                />
            );
        default:
            return null;
    }
};
export default UserLinks;
