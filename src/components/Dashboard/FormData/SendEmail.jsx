import React, { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../../../features/apiUrl";
import {
    ContactFormInput,
    ContactFormLabel,
    ContactFormSection,
    ContactFormSubmit,
    ContactFormTextArea,
    CoverRight,
    EmailIcon,
    ErrorMessage,
    MessageIcon,
    OrgIcon,
} from "../../Homepage/ContactForm/ContactFormElements";
import { toast } from "react-toastify";
import { LoadingButton } from "../../Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";

const SendEmail = () => {
    const [emailData, setEmailData] = useState({
        email: "",
        subject: "",
        message: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setIsSuccess(false);
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("user")).token;
        axios
            .post(
                getApiUrl("api/form/sendEmail"),
                {
                    ...emailData,
                    message: emailData.message.replace(/\n/g, "<br>"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((response) => {
                if (response.data.message === "Email sent successfully") {
                    setIsSuccess(true);
                    setEmailData({
                        email: "",
                        subject: "",
                        message: "",
                    });
                    setError(false);
                    setIsLoading(false);
                }
                toast.success(response.data.message);
                if (response.data.message === "Something went wrong. Please try again later.") {
                    setError(true);
                    setIsSuccess(false);
                }
            })
            .catch((error) => {
                if (error.message === "Network Error") {
                    setError(true);
                    setIsSuccess(false);
                } else if (error.response.status === 429) {
                    toast.error("Please wait 1 Minute before submitting again");
                    setIsSuccess(false);
                } else {
                    setError(true);
                    setIsSuccess(false);
                }
            });
    };

    return (
        <div>
            <ContactFormSection onSubmit={handleSubmit}>
                <CoverRight>
                    <ContactFormLabel htmlFor="email">
                        <EmailIcon />
                    </ContactFormLabel>
                    <ContactFormInput
                        type="email"
                        name="email"
                        id="email"
                        value={emailData.email}
                        onChange={handleChange}
                        placeholder={"Email"}
                    />
                </CoverRight>
                <CoverRight>
                    <ContactFormLabel htmlFor="subject">
                        <OrgIcon />
                    </ContactFormLabel>
                    <ContactFormInput
                        type="text"
                        name="subject"
                        id="subject"
                        value={emailData.subject}
                        onChange={handleChange}
                        placeholder={"Subject"}
                    />
                </CoverRight>
                <CoverRight>
                    <ContactFormLabel htmlFor="message">
                        <MessageIcon />
                    </ContactFormLabel>
                    <ContactFormTextArea
                        type="text"
                        name="message"
                        id="message"
                        value={emailData.message}
                        onChange={handleChange}
                        placeholder={"message"}
                    />
                </CoverRight>
                {!isLoading ? (
                    <ContactFormSubmit type="submit" value="submit" placeholder={"Submit"}>
                        Submit
                    </ContactFormSubmit>
                ) : null}

                {error && !isSuccess && <ErrorMessage>{"Server Error - Please contact us on discord"}</ErrorMessage>}
            </ContactFormSection>
            {isLoading ? (
                <LoadingButton width={"100%"}>
                    <CircleSpinner size={20} color={"#131313"} />
                </LoadingButton>
            ) : null}
        </div>
    );
};

export default SendEmail;
