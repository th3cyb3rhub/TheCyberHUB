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
} from "../../ContactForm/ContactFormElements";
import { toast } from "react-toastify";

const SendEmail = (pops) => {
    const [emailData, setEmailData] = useState({
        email: "",
        subject: "",
        message: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
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

        const token = JSON.parse(localStorage.getItem("user")).token;
        axios
            .post(getApiUrl("api/form/sendEmail"), emailData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data.message === "Email sent successfully") {
                    setIsSuccess(true);
                    setError(false);
                }
                toast.success(response.data.message);
                console.log(response.data.message);
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
        if (isSuccess && !error) {
            setEmailData({
                email: "",
                subject: "",
                message: "",
            });
        }
    };

    return (
        <div>
            <ContactFormSection onSubmit={handleSubmit}>
                <CoverRight>
                    <ContactFormLabel htmlFor="name">
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
                    <ContactFormLabel htmlFor="name">
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
                    <ContactFormLabel htmlFor="name">
                        <MessageIcon />
                    </ContactFormLabel>
                    <ContactFormTextArea
                        type="text"
                        name="message"
                        id="message"
                        value={emailData.message}
                        onChange={handleChange}
                        placeholder={"Subject"}
                    />
                </CoverRight>
                {/* {!isSuccess ? ( */}
                <ContactFormSubmit type="submit" value="submit" placeholder={"Submit"}>
                    Submit
                </ContactFormSubmit>
                {/* ) : null} */}

                {error && !isSuccess && <ErrorMessage>{"Server Error - Please contact us on discord"}</ErrorMessage>}
            </ContactFormSection>
            {/* {isSuccess && !error ? <GlowingButton>Submit Successfully</GlowingButton> : null} */}
        </div>
    );
};

export default SendEmail;
