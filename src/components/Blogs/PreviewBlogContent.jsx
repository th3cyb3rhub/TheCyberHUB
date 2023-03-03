import React from "react";
import { ContentSection, PreviewMarkdownHeading, Tag, TagsSection } from "./ViewBlog/ViewBlogElements";
import PreviewMarkdown from "./ViewBlog/PreviewMarkdown";
import { useLocation } from "react-router-dom";

const PreviewBlogContent = (props) => {
    const { pathname } = useLocation();
    return (
        <div>
            <PreviewMarkdownHeading>{props.title !== "" ? props.title : "Please add a Heading"}</PreviewMarkdownHeading>
            <ContentSection>
                <PreviewMarkdown content={props.content} />
            </ContentSection>
            <TagsSection>
                {pathname === "/dashboard/blogs/create"
                    ? props.tags.length !== 0 && props.tags[0] !== ""
                        ? props.tags.split(/,\s*/).map((tag, id) => <Tag key={id}>{tag}</Tag>)
                        : "Please add some Tags"
                    : props?.tags?.length !== 0 && props?.tags[0] !== ""
                    ? props.tags.map((tag, id) => <Tag key={id}>{tag}</Tag>)
                    : "Please add some Tags"}
            </TagsSection>
        </div>
    );
};

export default PreviewBlogContent;
