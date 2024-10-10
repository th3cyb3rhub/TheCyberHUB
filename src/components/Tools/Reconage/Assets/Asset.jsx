import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getReconageUrl } from "src/features/apiUrl.js";

const Container = styled.div`
    background-color: #191919;
    padding: 1rem;
    color: #e5e7eb;
    width: 100%;
`;

const Card = styled.div`
    background-color: #232323;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgb(0 0 0 / 30%);
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
`;

const CardHeader = styled.div`
    background-color: #f97316;
    color: white;
    padding: 1rem;
`;

const CardTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
`;

const CardContent = styled.div`
    padding: 1rem;
    width: 100%;
`;

const List = styled.ul`
    list-style-type: disc;
    padding-left: 1.5rem;
`;

const ListItem = styled.li`
    margin-bottom: 0.25rem;
    color: #e5e7eb;
`;

const AccordionItem = styled.div`
    border-bottom: 1px solid #4b5563;
    width: 100%;
`;

const AccordionTrigger = styled.button`
    width: 100%;
    padding: 1rem;
    text-align: left;
    background-color: transparent;
    border: none;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e5e7eb;

    &::after {
        content: "+";
        font-size: 1.25rem;
    }

    &[aria-expanded="true"]&::after {
        content: "-";
    }

    &:hover {
        color: #f97316;
    }
`;

const AccordionContent = styled.div`
    padding: 1rem;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    background-color: #303030;
`;

const Link = styled.a`
    color: #f97316;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Asset = () => {
    const { id } = useParams();
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSection, setOpenSection] = useState(null);

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const response = await axios.get(getReconageUrl(`api/assets/${id}`));
                setAsset(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAsset();
    }, [id]);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    if (loading) return <p style={{ textAlign: "center", padding: "1rem" }}>Loading...</p>;
    if (error) return <p style={{ textAlign: "center", padding: "1rem", color: "red" }}>Error: {error}</p>;
    if (!asset) return <p style={{ textAlign: "center", padding: "1rem" }}>No asset found</p>;

    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>{asset?.domain}</CardTitle>
                </CardHeader>
                <CardContent>
                    <AccordionItem>
                        <AccordionTrigger
                            onClick={() => toggleSection("subdomains")}
                            aria-expanded={openSection === "subdomains"}
                        >
                            Subdomains
                        </AccordionTrigger>
                        <AccordionContent isOpen={openSection === "subdomains"}>
                            <List>
                                {asset?.subdomains?.map((url, index) => (
                                    <ListItem key={index}>
                                        <Link href={`https://${url}`} target="_blank" rel="noopener noreferrer">
                                            {url}
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionTrigger
                            onClick={() => toggleSection("open-ports")}
                            aria-expanded={openSection === "open-ports"}
                        >
                            Open Ports
                        </AccordionTrigger>
                        <AccordionContent isOpen={openSection === "open-ports"}>
                            <List>
                                {asset?.open_ports?.map((port, index) => (
                                    <ListItem key={index}>{port}</ListItem>
                                ))}
                            </List>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionTrigger
                            onClick={() => toggleSection("technologies")}
                            aria-expanded={openSection === "technologies"}
                        >
                            Technologies
                        </AccordionTrigger>
                        <AccordionContent isOpen={openSection === "technologies"}>
                            <List>
                                {asset?.technologies?.map((tech, index) => (
                                    <ListItem key={index}>{tech}</ListItem>
                                ))}
                            </List>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionTrigger onClick={() => toggleSection("urls")} aria-expanded={openSection === "urls"}>
                            URLs
                        </AccordionTrigger>
                        <AccordionContent isOpen={openSection === "urls"}>
                            <List>
                                {asset?.urls?.map((url, index) => (
                                    <ListItem key={index}>
                                        <Link href={url} target="_blank" rel="noopener noreferrer">
                                            {url}
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionContent>
                    </AccordionItem>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Asset;
