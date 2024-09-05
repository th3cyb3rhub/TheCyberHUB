import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import {
    MarkdownContent,
    Container,
    Sidebar,
    Content,
    SidebarTitle,
    SidebarCategory,
    SidebarCategoryTitle,
    SidebarItem,
    ContentTitle,
    RightSidebar,
    TableOfContents,
    TOCItem,
} from "./HacklistElements.jsx";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";

import { data } from "./data.jsx";

export const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
                borderRadius: "10px",
                padding: "20px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "18px",
                lineHeight: "1.5",
                overflowX: "scroll",
                overflowY: "auto",
                maxHeight: "600px",
                maxWidth: "800px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                wrap: "pre-wrap",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                backgroundColor: "#1e1e1e",
                color: "#f5f5f5",
            }}
        >
            {value}
        </SyntaxHighlighter>
    );
};

const Hacklist = () => {
    const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0]);
    const [activeItem, setActiveItem] = useState(Object.keys(data[Object.keys(data)[0]])[0]);
    const [expandedCategories, setExpandedCategories] = useState({ [Object.keys(data)[0]]: true });

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    const setActiveItemAndCategory = (category, item) => {
        setActiveCategory(category);
        setActiveItem(item);
    };

    const renderMarkdownContent = (section) => {
        if (!section || typeof section !== "object") {
            console.error("Invalid section data:", section);
            return "";
        }

        let markdown = "";

        if (Array.isArray(section)) {
            // If section is an array, iterate through its items
            section.forEach((item) => {
                markdown += `# ${item.title}\n\n`;
                if (Array.isArray(item.content)) {
                    item.content.forEach((subItem) => {
                        markdown += `## ${subItem.subtitle}\n\n`;
                        markdown += `${subItem.description}\n\n`;

                        if (subItem.steps) {
                            markdown += "Steps:\n";
                            subItem.steps.forEach((step, index) => {
                                markdown += `${index + 1}. ${step}\n`;
                            });
                            markdown += "\n";
                        }

                        if (subItem.content) {
                            markdown += `${subItem.content}\n\n`;
                        }
                    });
                } else if (typeof item.content === "string") {
                    markdown += item.content + "\n\n";
                }
            });
        } else if (typeof section.content === "string") {
            // If content is already a string, just return it
            markdown = section.content;
        } else {
            console.error("Unexpected section structure:", section);
        }

        return markdown;
    };
    return (
        <Container>
            <Sidebar>
                <SidebarTitle>HackLists</SidebarTitle>
                {Object.entries(data).map(([category, items]) => (
                    <SidebarCategory key={category}>
                        <SidebarCategoryTitle onClick={() => toggleCategory(category)}>
                            {category}
                            {expandedCategories[category] ? <FaChevronDown /> : <FaChevronRight />}
                        </SidebarCategoryTitle>
                        {expandedCategories[category] &&
                            Object.keys(items).map((item) => (
                                <SidebarItem
                                    key={item}
                                    active={activeItem === item}
                                    onClick={() => setActiveItemAndCategory(category, item)}
                                >
                                    {item}
                                </SidebarItem>
                            ))}
                    </SidebarCategory>
                ))}
            </Sidebar>

            <Content>
                <ContentTitle>{activeItem}</ContentTitle>
                <MarkdownContent
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} {...props} />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                    }}
                >
                    {renderMarkdownContent(data[activeCategory][activeItem])}
                </MarkdownContent>
            </Content>

            <RightSidebar>
                <SidebarTitle>Table of Contents</SidebarTitle>
                <TableOfContents>
                    {data[activeCategory][activeItem].map((section, index) => (
                        <TOCItem
                            key={index}
                            onClick={() => {
                                const element = document.getElementById(`section-${index}`);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        >
                            {section.title}
                        </TOCItem>
                    ))}
                </TableOfContents>
            </RightSidebar>
        </Container>
    );
};
export default Hacklist;
