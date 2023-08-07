import React from "react";
import { IconAdd, TagInput, TagsInput } from "./CreateBlogV2Elements";

const AddBlogTags = ({ tags, setTags }) => {
    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, ""]);
    };

    return (
        <TagsInput>
            {tags?.map((tag, index) => (
                <TagInput
                    name={`tag-${index}`}
                    id={`tag-${index}`}
                    key={index}
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder={"tag here"}
                />
            ))}
            <IconAdd onClick={handleAddTag}>+</IconAdd>
        </TagsInput>
    );
};

export default AddBlogTags;
