import React, { useEffect, useRef, useState } from "react";
import { IconAdd, IconRemove, TagInput, TagsInput, TagsInputContainer } from "./AddPostTagsElements";
import { PostTag, PostTags } from "../../FeedPosts/FeedPostsElements";

const AddFeedTags = ({ tags, setTags, size }) => {
    const [hideInput, setHideInput] = useState(true);
    const [addTag, setAddTag] = useState("");

    useEffect(() => {
        if (tags.length > 11) {
            setHideInput(false);
        } else {
            setHideInput(true);
        }
    }, [tags]);

    const handleAddTag = () => {
        if (addTag.trim() !== "") {
            setTags([...tags, addTag.trim()]);
            setAddTag("");
        }
    };

    const handleRemoveTag = () => {
        setTags((prevTags) => prevTags.slice(0, prevTags.length - 1));
    };

    const handleTagInputChange = (event) => {
        setAddTag(event.target.value);
    };

    const handleAddTagOnEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddTag();
        }
    };

    const tagInputRef = useRef(null);

    useEffect(() => {
        const tagInput = tagInputRef.current;
        tagInput.style.width = "100%";
        tagInput.style.width = `${tagInput.scrollWidth}px`;

        if (!addTag) {
            tagInput.style.width = size === "lg" ? "80px" : "60px";
        }
    }, [addTag]);

    console.log(tags);
    console.log(tags.length === 0);

    return (
        <TagsInputContainer size={size}>
            <PostTags size={size}>
                {tags.map(
                    (tag, id) =>
                        tag !== "" && (
                            <PostTag size={size} key={id}>
                                {tag}
                            </PostTag>
                        ),
                )}
            </PostTags>
            {hideInput ? (
                <TagsInput size={size}>
                    <TagInput
                        size={size}
                        ref={tagInputRef}
                        name="tags"
                        id="tags"
                        type="text"
                        value={addTag}
                        onChange={handleTagInputChange}
                        onKeyDown={handleAddTagOnEnter}
                        placeholder="Add tag"
                    />
                    <IconAdd onClick={handleAddTag}>+</IconAdd>
                    {tags.length !== 0 ? (
                        <>
                            <IconRemove onClick={handleRemoveTag}>-</IconRemove>
                        </>
                    ) : null}
                </TagsInput>
            ) : null}
        </TagsInputContainer>
    );
};

export default AddFeedTags;
