import React from "react";

import { UserPicture } from "src/components/Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import { UserInfoContainer } from "./UserLinksElements";

const UserInfo = ({ children, heightSize, widthSize, fontSizeName, fontSizeUsername, avatarPath }) => {
    const avatar = avatarPath
        ? cdnContentImagesUrl(avatarPath)
        : cdnContentImagesUrl("/user/" + (children?.avatar || "avatarDummy.png"));

    const measurements = { height: heightSize || "200px", width: widthSize || "200px" };

    return (
        <UserInfoContainer fontSizeName={fontSizeName} fontSizeUsername={fontSizeUsername}>
            <UserPicture style={measurements} src={avatar} />
            <span className={"name"}>{children?.name}</span>
            <span className={"username"}>{children?.username && `@${children?.username}`}</span>
        </UserInfoContainer>
    );
};
export default UserInfo;
