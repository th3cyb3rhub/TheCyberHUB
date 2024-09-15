import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Sidebar,
    Container,
    MarkdownContent,
    SidebarTitle,
    Content,
    SidebarItem,
    SidebarCategory,
    SidebarCategoryTitle,
} from "src/components/Resources/Hacklist/HacklistElements.jsx";
import { CodeBlock } from "src/components/Resources/Hacklist/Hacklist.jsx";
import { useParams } from "react-router-dom";

const Hackliners = () => {
    const { title } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/resources/${title}`);
                setData(response?.data);
                console.log("Fetched data:", response?.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [title]);

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderSidebarItems = (items) => {
        return items.map((item) => {
            if (item.type === "directory") {
                return (
                    <SidebarCategory key={item.name}>
                        <SidebarCategoryTitle>{capitalizeFirstLetter(item.name)}</SidebarCategoryTitle>
                        <ul>{renderSidebarItems(item.content)}</ul>
                    </SidebarCategory>
                );
            } else if (item.type === "file") {
                return (
                    <SidebarItem key={item.name} onClick={() => handleFileClick(item)}>
                        {item.name}
                    </SidebarItem>
                );
            }
            return null;
        });
    };

    return (
        <Container>
            <Sidebar>
                <SidebarTitle>{capitalizeFirstLetter(title)}</SidebarTitle>
                {data && data.map((item) => renderSidebarItems([item.content]))}
            </Sidebar>

            <Content>
                {selectedFile ? (
                    <MarkdownContent
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <CodeBlock
                                        language={match[1]}
                                        value={String(children).replace(/\n$/, "")}
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                        }}
                    >
                        {selectedFile?.content || "No content available"}
                    </MarkdownContent>
                ) : (
                    <div>Select a file to view content</div>
                )}
            </Content>
        </Container>
    );
};

export default Hackliners;
