import React from "react";
import { ContentSection, PreviewMarkdownHeading, Tag, TagsSection } from "./ViewBlog/ViewBlogElements";
import PreviewMarkdown from "./ViewBlog/PreviewMarkdown";

const PreviewBlogContent = (props) => {
    return (
        <div>
            <PreviewMarkdownHeading>{props.title !== "" ? props.title : "PLease add a Heading"}</PreviewMarkdownHeading>
            <ContentSection>
                <PreviewMarkdown content={props.content} />
            </ContentSection>
            <TagsSection>
                {props.tags.length !== 0 && props.tags[0] !== ""
                    ? props.tags.map((tag, id) => <Tag key={id}>{tag}</Tag>)
                    : "Please add some Tags"}
            </TagsSection>
        </div>
    );
};

export default PreviewBlogContent;
