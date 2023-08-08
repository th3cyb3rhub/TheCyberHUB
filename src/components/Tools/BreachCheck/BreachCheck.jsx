import React, { useState } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import {
    ContainerBreachCheck,
    EmailInput,
    GreenMessage,
    Message,
    RedMessage,
    SubmitButton,
} from "./BreachCheckElements";
import { Title } from "../SubdomainFinder/SubdomainFinderElements";
import { RiEarthFill } from "react-icons/ri";
import { Form } from "../PortScanner/PortScannerElements";

const BreachCheck = () => {
    const Emails = ["user1@example.com", "user2@example.com", "user3@example.com"];
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const validateEmail = (e) => {
        e.preventDefault();
        // Validate the email somehow, for example by checking if it's in a list of known emails
        const emailExists = Emails.includes(email);
        if (!emailExists) {
            setError(<GreenMessage>Email does not exist in the breached database</GreenMessage>);
        } else {
            setError(<RedMessage>Email exist in the breached database</RedMessage>);
        }
    };

    return (
        <Wrapper>
            <ContainerBreachCheck>
                <Title>
                    <RiEarthFill /> Breach Check
                </Title>
                <Form>
                    <EmailInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <SubmitButton onClick={validateEmail}> Check email </SubmitButton>
                </Form>

                <Message>{error && <>{error}</>}</Message>
            </ContainerBreachCheck>
        </Wrapper>
    );
};

export default BreachCheck;
