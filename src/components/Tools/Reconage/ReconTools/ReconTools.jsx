import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdSearch, MdLanguage, MdCode, MdWifi } from "react-icons/md";

const Container = styled.div`
    min-height: 100vh;
    background-color: #111;
    color: #fff;
    padding: 2rem;
    font-family: Arial, sans-serif;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #f60;
    margin-bottom: 2rem;
    text-align: center;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

const Card = styled(Link)`
    background-color: #222;
    border-radius: 0.5rem;
    padding: 1.5rem;
    text-decoration: none;
    color: #fff;
    transition:
        transform 0.3s,
        box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgb(255 102 0 / 30%);
    }
`;

const CardIcon = styled.div`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #f60;
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
    font-size: 1rem;
    color: #ccc;
`;

const ReconTools = () => {
    const tools = [
        {
            name: "Subfinder",
            description: "Discover subdomains of a given domain",
            icon: <MdSearch size={40} />,
            path: "subfinder",
        },
        {
            name: "URL Finder",
            description: "Find and extract URLs from various sources",
            icon: <MdLanguage size={40} />,
            path: "urlfinder",
        },
        {
            name: "Technology Finder",
            description: "Identify technologies used on websites",
            icon: <MdCode size={40} />,
            path: "technologyfinder",
        },
        {
            name: "Open Ports",
            description: "Scan and detect open ports on a target",
            icon: <MdWifi size={40} />,
            path: "portscanner",
        },
    ];

    return (
        <Container>
            <Title>Recon Tools</Title>
            <CardGrid>
                {tools.map((tool, index) => (
                    <Card key={index} to={tool.path}>
                        <CardIcon>{tool.icon}</CardIcon>
                        <CardTitle>{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </Card>
                ))}
            </CardGrid>
        </Container>
    );
};

export default ReconTools;
