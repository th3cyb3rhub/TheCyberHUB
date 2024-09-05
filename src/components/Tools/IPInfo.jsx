import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, InfoBox, InfoItem, Form, Input, Button, ErrorMessage } from "./IPInfoElements.jsx";

const IpInfo = () => {
    const [userIp, setUserIp] = useState("");
    const [userIpInfo, setUserIpInfo] = useState(null);
    const [inputIp, setInputIp] = useState("");
    const [inputIpInfo, setInputIpInfo] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUserIp();
    }, []);

    const fetchUserIp = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            setUserIp(response.data.ip);
            fetchIpInfo(response.data.ip, setUserIpInfo);
        } catch (err) {
            setError("Failed to fetch user IP");
        }
    };

    const fetchIpInfo = async (ip, setInfoFunction) => {
        try {
            const response = await axios.get(`https://ipapi.co/${ip}/json/`);
            setInfoFunction(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch IP information");
            setInfoFunction(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputIp) {
            fetchIpInfo(inputIp, setInputIpInfo);
        }
    };

    console.log(userIp);

    const renderIpInfo = (info) => {
        if (!info) return null;
        return (
            <InfoBox>
                <InfoItem>
                    <strong>IP:</strong> {info.ip}
                </InfoItem>
                <InfoItem>
                    <strong>City:</strong> {info.city}
                </InfoItem>
                <InfoItem>
                    <strong>Region:</strong> {info.region}
                </InfoItem>
                <InfoItem>
                    <strong>Country:</strong> {info.country_name}
                </InfoItem>
                <InfoItem>
                    <strong>ISP:</strong> {info.org}
                </InfoItem>
            </InfoBox>
        );
    };

    return (
        <Container>
            <Title>Your IP Information</Title>
            {userIpInfo ? renderIpInfo(userIpInfo) : <InfoItem>Loading...</InfoItem>}

            <Title>Check Other IP</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={inputIp}
                    onChange={(e) => setInputIp(e.target.value)}
                    placeholder="Enter an IP address"
                />
                <Button type="submit">Get Info</Button>
            </Form>

            {inputIpInfo && (
                <>
                    <Title>Information for {inputIp}</Title>
                    {renderIpInfo(inputIpInfo)}
                </>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default IpInfo;
