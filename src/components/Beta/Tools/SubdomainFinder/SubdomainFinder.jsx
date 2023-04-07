import React, { useState } from "react";
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
    SubdomainList,
    Title,
} from "./SubdomainFinderElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import { getApiUrl } from "../../../../features/apiUrl";

const SubdomainFinder = () => {
    const [domainName, setDomainName] = useState("");
    const [subdomains, setSubdomains] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
            const response = await axios.post(getApiUrl("api/tools/subdomainFinder"), { domainName });
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
                console.log(`Copied to clipboard:\n${subdomainsText}`);
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
    };

    return (
        <Wrapper>
            <SubdomainFinderSpinner>
                <Title>Subdomain Finder</Title>
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

                {isError && <p>{errorMessage}</p>}

                {subdomains.length > 0 && (
                    <SubdomainList>
                        {subdomains.length} subdomains found for {domainName}
                        <CopyButtonSection>
                            <CopyButton onClick={() => handleCopyToClipboard(subdomains)} />
                            <DownloadButton onClick={handleDownloadTxtFile} />
                        </CopyButtonSection>
                        {subdomains.map((subdomain, index) => (
                            <SubdomainItem key={index}>{subdomain}</SubdomainItem>
                        ))}
                    </SubdomainList>
                )}
            </SubdomainFinderSpinner>
        </Wrapper>
    );
};

export default SubdomainFinder;
