import React from "react";
import { HeaderContainer, UserBanner } from "../ProfileElements";
import { getCDNUrl } from "../../../../features/apiUrl";

const ProfileHeader = () => {
    return (
        <HeaderContainer>
            <UserBanner src={getCDNUrl + "/assets/images/Registeration/CybersecurityRegPage.png"} />
        </HeaderContainer>
    );
};

export default ProfileHeader;
