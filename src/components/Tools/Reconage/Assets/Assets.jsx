import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { RouterLink } from "src/components/Tools/ToolsElements.jsx";

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

const DomainList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

const DomainCard = styled.div`
    background-color: #1e1e1e;
    border-radius: 5px;
    padding: 5px 15px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 40%);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgb(67 31 7 / 40%);
    }
`;

const DomainTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #e4e4e4;
`;

const Assets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get("https://reconage-api.thecyberhub.org/api/assets");
                setAssets(response.data.assets);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Title>Assets</Title>
            <DomainList>
                {assets?.map((asset) => (
                    <RouterLink key={asset._id} to={asset._id}>
                        <DomainCard>
                            <DomainTitle>{asset.domain}</DomainTitle>
                        </DomainCard>
                    </RouterLink>
                ))}
            </DomainList>
        </Container>
    );
};

export default Assets;
