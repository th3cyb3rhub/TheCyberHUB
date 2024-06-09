import React from "react";
import { HeaderContainer, UserBanner } from "src/components/Dashboard/Profile/ProfileElements";
import { getCdnAssets } from "src/features/apiUrl";

const ProfileHeader = () => {
    return (
        <HeaderContainer>
            <UserBanner src={getCdnAssets + "/images/Registration/CybersecurityRegPage.png"} />
        </HeaderContainer>
    );
};

export default ProfileHeader;
