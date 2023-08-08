import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Form,
    Input,
    LoadingButton,
    OpenPortItem,
    OpenPortsList,
    PortScannerContainer,
    Select,
    SelectSection,
    Title,
} from "./PortScannerElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import { getApiUrl } from "../../../features/apiUrl";
import apiStatus from "../../../features/apiStatus";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
import { CgOpenCollective } from "react-icons/cg";
import { CopyButton, CopyButtonSection, DownloadButton } from "../SubdomainFinder/SubdomainFinderElements";

const PortScanner = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const [data, setData] = useState({
        host: "",
        portRange: "",
        timeout: "",
    });

    const { host, portRange, timeout } = data;

    const [openPorts, setOpenPorts] = useState([]);
    const [domainWithOpenPorts, setDomainWithOpenPorts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [maxProgress, setMaxProgress] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        setOpenPorts([]);
        setDomainWithOpenPorts([]);
        setProgress(0); // Reset progress to 0 when submitting the form
        if (!host || !portRange || !timeout) {
            setIsLoading(false);
            return;
        }

        setMaxProgress(timeout); // Reset maxProgress to 0 when submitting the form

        try {
            const response = await axios.post(getApiUrl("api/tool/portScanner"), data);
            setOpenPorts(response?.data?.openPorts);

            setIsLoading(false);

            setDomainWithOpenPorts([]);
            openPorts.forEach((port) => {
                if (port) {
                    domainWithOpenPorts.push(`${host}:${port}`);
                }
            });
            setDomainWithOpenPorts(domainWithOpenPorts);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error?.response?.data?.message);
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(domainWithOpenPorts.join("\n"))
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            })
            .catch((error) => {
                console.error("Failed to copy to clipboard:", error);
            });
    };

    const handleDownloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([domainWithOpenPorts.join("\n")], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `${host}-open-ports.txt`;
        document.body.appendChild(element); // Append the element to the DOM
        element.click(); // Simulate a click on the element to trigger the download
        document.body.removeChild(element); // Remove the element from the DOM

        setIsDownloaded(true);
        setTimeout(() => {
            setIsDownloaded(false);
        }, 1000);
    };

    const [isLoading2, setIsLoading2] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading2(false);
        }, 100);
    }, []);

    useEffect(() => {
        let progressInterval;
        if (isLoading) {
            let currentProgress = 0;
            const increment = maxProgress / ((portRange * timeout) / 1000); // Calculate the increment value based on the maximum progress and timeout

            progressInterval = setInterval(() => {
                currentProgress += increment;
                setProgress(Math.min(currentProgress, maxProgress));
            }, 1000);
        }

        return () => {
            clearInterval(progressInterval);
        };
    }, [isLoading, maxProgress, timeout]);

    if (isLoading2 || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#ff6b08"} isLoading={isLoading2 || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <PortScannerContainer>
                <Title>
                    <CgOpenCollective /> Port Scanner
                </Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="thecyberhub.com"
                        value={host}
                        onChange={(e) => setData({ ...data, host: e.target.value })}
                    />
                    <SelectSection>
                        <Select value={portRange} onChange={(e) => setData({ ...data, portRange: e.target.value })}>
                            <option>Ports range</option>
                            <option value="100">Top 100</option>
                            <option value="1000">Top 1000</option>
                        </Select>
                        <Select value={timeout} onChange={(e) => setData({ ...data, timeout: e.target.value })}>
                            <option>Timeout</option>
                            <option value="100">100s</option>
                            <option value="1000">1000s (recommended)</option>
                            <option value="5000">5000s</option>
                        </Select>
                    </SelectSection>

                    {!isLoading && <Button type="submit"> Find Open Ports </Button>}
                    {isLoading && (
                        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: `${progress}%`,
                                    background: "#07b6f6",
                                    transition: "width 0.8s ease-in-out",
                                    border: "15px solid #131313",
                                }}
                            ></div>
                            <LoadingButton>
                                <CircleSpinner size={25} color="#131313" />
                            </LoadingButton>
                        </div>
                    )}
                </Form>

                {isError && <p>{errorMessage}</p>}

                {openPorts?.length > 0 && (
                    <OpenPortsList>
                        {openPorts?.length} open ports found for {host} [
                        {openPorts?.map((port, index) => (
                            <span key={index}>
                                {port}
                                {index < openPorts?.length - 1 ? "," : ""}
                            </span>
                        ))}
                        ]
                        <br /> <br />
                        <CopyButtonSection>
                            {isCopied && <p>Copied!</p>}
                            {isDownloaded && <p>Downloaded!</p>}
                            <DownloadButton onClick={handleDownloadTxtFile} />
                            <CopyButton onClick={handleCopyToClipboard} />
                        </CopyButtonSection>
                        {openPorts?.map((port, index) => (
                            <OpenPortItem key={index}>
                                {host}:{port}
                            </OpenPortItem>
                        ))}
                    </OpenPortsList>
                )}
            </PortScannerContainer>
        </Wrapper>
    );
};

export default PortScanner;
