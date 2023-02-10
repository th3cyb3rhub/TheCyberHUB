import React from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { ContainerForum } from "./ForumElements";
import Card from "./Card";
import forumData from "./ForumData";
import { RouterButtonLink } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";

const Forum = () => {
    return (
        <Wrapper>
            {"// Frontend Only right now //"}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <RouterButtonLink to={"/dashboard/forum/create"}> Ask Question </RouterButtonLink>
                <RouterButtonLink to={"/dashboard/forum/create"}> Post a Solution </RouterButtonLink>
            </div>
            <ContainerForum>
                {forumData.map((item, id) => (
                    <Card
                        key={id}
                        title={item.title}
                        description={item.description}
                        username={item.username}
                        date={item.date}
                        categories={item.categories}
                        views={item.views}
                        answers={item.answers}
                        answerAccepted={item.answerAccepted}
                        votes={item.votes}
                    />
                ))}
            </ContainerForum>
        </Wrapper>
    );
};

export default Forum;
