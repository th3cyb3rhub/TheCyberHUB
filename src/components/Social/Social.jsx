import React from "react";
import { Content } from "./SocialElements";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import AddPost from "./AddPost";
import Posts from "./Posts";

const Social = () => {
    return (
        <Wrapper>
            <Content>
                <AddPost />
                <Posts />
            </Content>
        </Wrapper>
    );
};

export default Social;
