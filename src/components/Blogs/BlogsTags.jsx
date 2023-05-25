import React from "react";
import { BlogsTagsContainer, Tag, Tags } from "./BlogsTagsElements";
import { RouterLink } from "../Beta/Tools/ToolsElements";

const BlogsTags = ({ tags }) => {
    return (
        <BlogsTagsContainer>
            <h4
                style={{
                    color: "#eeeeee",
                    textAlign: "center",
                    marginBottom: "1rem",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                }}
            >
                Trending
            </h4>
            <Tags>
                {tags.map(
                    (tag, key) =>
                        tag.length !== 0 && (
                            <Tag key={key}>
                                <RouterLink to={`/tags/${tag.split(" ").join("-")}`}>{tag}</RouterLink>
                            </Tag>
                        ),
                )}
            </Tags>
        </BlogsTagsContainer>
    );
};

export default BlogsTags;
