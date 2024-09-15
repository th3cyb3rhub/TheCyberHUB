import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    CopyButton,
    CopyButtonSection,
    DownloadButton,
    Form,
    Input,
    SubdomainFinderSpinner,
    SubdomainItem,
    SubdomainLink,
    SubdomainList,
    Title,
} from "./SubdomainFinderElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import apiStatus from "src/features/apiStatus";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import { RiEarthFill } from "react-icons/ri";
import { getApiUrl } from "src/features/apiUrl.js";

const SubdomainFinder = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const [domainName, setDomainName] = useState("");
    const [subdomains, setSubdomains] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        setSubdomains([]);

        if (!domainName) {
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.get(getApiUrl(`api/subdomains?domain=${domainName}`));
            setSubdomains(response?.data?.subdomains);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error?.response?.data?.message);
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = (subdomains) => {
        const subdomainsText = subdomains.join("\n");
        navigator.clipboard
            .writeText(subdomainsText)
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
        const subdomainsText = subdomains.join("\n");
        const element = document.createElement("a");
        const file = new Blob([subdomainsText], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `${domainName}.txt`;
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
            <SubdomainFinderSpinner>
                <Title>
                    <RiEarthFill /> Subdomain Finder
                </Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="thecyberhub.com"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                    />
                    {!isLoading && <Button type="submit">Fetch Subdomains</Button>}
                    {isLoading && <CircleSpinner size={25} color="#686769" />}
                </Form>

                {isError && <SubdomainList>{errorMessage}</SubdomainList>}

                {subdomains.length > 0 && (
                    <SubdomainList>
                        {subdomains.length} subdomains found for {domainName}
                        <CopyButtonSection>
                            {isDownloaded && <p>Downloaded!</p>}
                            {isCopied && <p>Copied!</p>}
                            <DownloadButton onClick={handleDownloadTxtFile} />
                            <CopyButton onClick={() => handleCopyToClipboard(subdomains)} />
                        </CopyButtonSection>
                        {subdomains.map((subdomain, index) => (
                            <SubdomainItem key={index}>
                                <SubdomainLink
                                    href={subdomain.includes("http") ? subdomain : `http://${subdomain}`}
                                    target={"_blank"}
                                >
                                    {subdomain}
                                </SubdomainLink>
                            </SubdomainItem>
                        ))}
                    </SubdomainList>
                )}
            </SubdomainFinderSpinner>
        </Wrapper>
    );
};

export default SubdomainFinder;
