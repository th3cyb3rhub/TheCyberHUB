import React from "react";
import { ContentSection, PreviewMarkdownHeading, Tag, Tags } from "./ViewBlog/ViewBlogElements";
import PreviewMarkdown from "src/components/Blogs/ViewBlog/PreviewMarkdown";
import { useLocation } from "react-router-dom";

const PreviewBlogContent = (props) => {
    const { pathname } = useLocation();
    return (
        <div>
            <PreviewMarkdownHeading>{props.title !== "" ? props.title : "Please add a Heading"}</PreviewMarkdownHeading>
            <ContentSection>
                <PreviewMarkdown content={props.content} />
            </ContentSection>
            <Tags>
                {pathname === "/dashboard/blogs/create"
                    ? props.tags.length !== 0 && props.tags[0] !== ""
                        ? props.tags.split(/,\s*/).map((tag, id) => <Tag key={id}>{tag}</Tag>)
                        : "Please add some Tags"
                    : props?.tags?.length !== 0 && props?.tags[0] !== ""
                    ? props.tags.map((tag, id) => <Tag key={id}>{tag}</Tag>)
                    : "Please add some Tags"}
            </Tags>
        </div>
    );
};

export default PreviewBlogContent;
