import React from "react";
import { AllTags, Tag, TagsContainer } from "./FeedTagsElements";

const SocialTags = ({ tags, handleClick, selectedTags, setSelectedTags }) => {
    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    return (
        <TagsContainer>
            <AllTags>
                {tags.slice(0, 10).map(
                    (tag, key) =>
                        tag?.length !== 0 && (
                            <Tag
                                $isSelected={selectedTags.includes(tag)}
                                key={key}
                                onClick={() => {
                                    handleTagSelection(tag);
                                }}
                            >
                                {tag}
                            </Tag>
                        ),
                )}
            </AllTags>
        </TagsContainer>
    );
};
export default SocialTags;
