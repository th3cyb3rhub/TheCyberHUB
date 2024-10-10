import React, { useState } from "react";
import styled from "styled-components";
import { MdContentCopy, MdFileDownload, MdSearch } from "react-icons/md";
import { getReconageUrl } from "src/features/apiUrl.js";

const Container = styled.div`
    min-height: 100vh;
    background-color: #111;
    color: #fff;
    padding: 2rem;
    width: 100%;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #f60;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    margin-bottom: 2rem;
`;

const InputGroup = styled.div`
    display: flex;
`;

const Input = styled.input`
    flex-grow: 1;
    padding: 0.75rem;
    border-radius: 0.375rem 0 0 0.375rem;
    background-color: #222;
    border: 1px solid #333;
    color: #fff;

    &:focus {
        outline: none;
        border-color: #f60;
    }
`;

const Button = styled.button`
    background-color: #f60;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 0 0.375rem 0.375rem 0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e65c00;
    }

    &:disabled {
        background-color: #666;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    background-color: #f44;
    color: #fff;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
`;

const TechList = styled.div`
    background-color: #222;
    border-radius: 0.375rem;
    padding: 1rem;
`;

const TechItem = styled.li`
    margin-bottom: 0.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const TechLink = styled.a`
    color: #4da6ff;
    text-decoration: none;

    &:hover {
        color: #80bdff;
    }
`;

const ActionButton = styled.button`
    background-color: #333;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
    margin-right: 1rem;

    &:hover {
        background-color: #444;
    }

    &:last-child {
        margin-right: 0;
    }
`;

const ActionBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

const TechnologyFinder = () => {
    const [domain, setDomain] = useState("");
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setTechnologies([]);

        try {
            const response = await fetch(getReconageUrl("api/technology"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ domain }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch technologies");
            }

            const data = await response.json();
            setTechnologies(data.technologies || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        const techText = technologies.join("\n");
        navigator.clipboard
            .writeText(techText)
            .then(() => {
                alert("Technologies copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    const handleDownload = () => {
        const techText = technologies.join("\n");
        const blob = new Blob([techText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${domain}_technologies.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Container>
            <Title>Technology Finder</Title>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Enter domain (e.g., example.com)"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            "Finding..."
                        ) : (
                            <>
                                <MdSearch size={20} style={{ marginRight: "0.5rem" }} />
                                Find
                            </>
                        )}
                    </Button>
                </InputGroup>
            </Form>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {technologies.length > 0 && (
                <div>
                    <ActionBar>
                        <ActionButton onClick={handleCopy}>
                            <MdContentCopy size={20} style={{ marginRight: "0.5rem" }} />
                            Copy
                        </ActionButton>
                        <ActionButton onClick={handleDownload}>
                            <MdFileDownload size={20} style={{ marginRight: "0.5rem" }} />
                            Download
                        </ActionButton>
                    </ActionBar>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "semibold", marginBottom: "1rem" }}>
                        Technologies Found:
                    </h2>
                    <TechList>
                        <ul>
                            {technologies.map((tech, index) => (
                                <TechItem key={index}>
                                    <TechLink href={`https://${tech}`} target="_blank" rel="noopener noreferrer">
                                        {tech}
                                    </TechLink>
                                </TechItem>
                            ))}
                        </ul>
                    </TechList>
                </div>
            )}
        </Container>
    );
};

export default TechnologyFinder;
