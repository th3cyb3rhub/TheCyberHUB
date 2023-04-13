import React from "react";
import { HeaderContainer, HeaderSection, UserBanner, UserImage } from "../ProfileElements";
import { getCDNUrl } from "../../../../features/apiUrl";
import { IoMdSave, TiEdit } from "react-icons/all";

const ProfileHeader = ({ user, userDetail, isEdit, setIsEdit, onSubmit }) => {
    const API_URL = getCDNUrl;
    const profilePicture = userDetail?.picture;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";
    const profilePictureUrl =
        userDetail?.publicProfile === "" || !userDetail?.publicProfile
            ? dummyPicture
            : `${API_URL}/blog_images/${profilePicture}`;

    const handleSave = (e) => {
        onSubmit(e);
    };

    return (
        <HeaderContainer>
            {user && (
                <HeaderSection>
                    <TiEdit onClick={() => setIsEdit(!isEdit)} style={{ zIndex: 2, cursor: "pointer" }} size={25} />
                    <IoMdSave onClick={handleSave} style={{ zIndex: 2, cursor: "pointer" }} size={25} />
                </HeaderSection>
            )}
            <UserBanner
                src={
                    "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com/assets/images/Registeration/CybersecurityRegPage.png"
                }
            />
            <UserImage src={userDetail?.picture || profilePictureUrl} />
        </HeaderContainer>
    );
};

export default ProfileHeader;
