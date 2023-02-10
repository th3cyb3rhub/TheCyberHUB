import React from "react";
import { Content } from "./SocialElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import AddPost from "./AddPost/AddPost";
import Posts from "./Posts";

const Social = () => {
    return (
        <Wrapper>
            {"// Frontend Only right now //"}
            <Content>
                <AddPost />
                <Posts />
            </Content>
        </Wrapper>
    );
};

export default Social;
