import React from "react";
import { AllTags, Tag, TagsContainer } from "./TagsElements";

const Tags = ({ tags }) => {
    return (
        <TagsContainer>
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
            <AllTags>
                {tags.slice(0, 10).map(
                    (tag, key) =>
                        tag.length !== 0 && (
                            <Tag key={key}>
                                {/* <RouterLink to={`tags/${tag.split(" ").join("-")}`}> */}
                                {tag}
                                {/* </RouterLink> */}
                            </Tag>
                        ),
                )}
            </AllTags>
        </TagsContainer>
    );
};

export default Tags;
