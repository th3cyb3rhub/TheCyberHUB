import React, { useEffect, useState } from "react";
import {
    ContactFormCard,
    ContactFormContainer,
    ContactFormInput,
    ContactFormLabel,
    ContactFormSection,
    ContactFormSelect,
    ContactFormSelectOption,
    ContactFormSubmit,
    ContactFormTextArea,
    ContentP,
    Cover,
    CoverLeft,
    CoverRight,
    EmailIcon,
    ErrorMessage,
    GlowingButton,
    H1,
    InternshipIcon,
    MessageIcon,
    OrgIcon,
    PentestIcon,
    PersonIcon,
    PhoneIcon,
    ReasonIcon,
    ResumeIcon,
    WebIcon,
} from "./ContactFormElements.jsx";

import { getApiUrl } from "../../features/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import InternshipProgramData from "../Resources/Jobs/Internship/InternshipProgramData";
import { JobsData } from "../Resources/Jobs/JobsData";
import { LoadingButton } from "../Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        website: "",
        pentestBefore: "",
        reason: "",
        phoneNumber: "",
        reasonType: "",
        contextHeading: "",
        resume: "",
        message: "",
    });
    const {
        name,
        email,
        company,
        website,
        reason,
        phoneNumber,
        reasonType,
        pentestBefore,
        resume,
        contextHeading,
        message,
    } = formData;

    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);

    const [isOpened, setIsOpened] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    // const [internshipMessage, setInternshipMessage] = useState('');
    // // const currentDate = new Date().toISOString();

    useEffect(() => {
        InternshipProgramData.some(({ applicationOpenDate, applicationCloseDate, internshipStartTime }) => {
            const currentDate = new Date().toISOString();
            // const currentDate = "2023-08-01T00:00:00.000Z"
            // const currentDate = "2023-09-21T00:00:00.000Z"
            // const currentDate = "2023-10-01T00:00:00.000Z"
            const isBetweenDates = (currentDate, startDate, endDate) =>
                currentDate >= startDate && currentDate <= endDate;

            const openDate = applicationOpenDate;
            const closeDate = applicationCloseDate;
            const internCloseDate = internshipStartTime;

            const isBetween = isBetweenDates(currentDate, openDate, closeDate);
            const isClosed = isBetweenDates(currentDate, closeDate, internCloseDate);

            if (isBetween) {
                setIsOpened(true);
                setIsClosed(false);
                // setInternshipMessage('Applications are currently open!');
            }
            if (isClosed) {
                setIsOpened(false);
                setIsClosed(true);
                // setInternshipMessage('Applications are currently closed.');
            }
            return null;
        });
    }, [InternshipProgramData]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(false);
        setError2(false);
        setIsSuccess(false);
        const filledFormData = {
            name,
            email,
            company,
            website,
            pentestBefore,
            reason,
            phoneNumber,
            reasonType,
            resume,
            message,
            contextHeading,
            submissionFrom: "thecyberhub.org",
        };
        if (name.length === 0) {
            setError("Please add your name");
        } else if (email.length === 0) {
            setError("Please add your email");
        } else if (reason.length === 0) {
            setError("Please select a reason");
        } else if (
            message.length === 0 ||
            ((reason === "pentest" || reason === "internship") && reasonType.length === 0)
        ) {
            setError("Please fill all of the fields");
        } else if (reason === "internship" && resume.length === 0) {
            setError("Please include the resume link");
            // }
            // else if ((reason === "internship" && message.length < 200) || message.length > 1000) {
            //     toast("Please write a cover letter of length 200 - 1000 characters");
        } else {
            axios
                .post(getApiUrl("api/form/submit"), filledFormData, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    if (response.data.message === "Form submitted successfully") {
                        setIsLoading(false);
                        setIsSuccess(true);
                        setFormData({
                            name: "",
                            email: "",
                            company: "",
                            website: "",
                            pentestBefore: "",
                            reason: "",
                            phoneNumber: "",
                            reasonType: "",
                            contextHeading: "",
                            resume: "",
                            message: "",
                        });
                        setError(false);
                        setError2(false);
                    }
                    if (response.data.message === "Something went wrong. Please try again later.") {
                        setError2(true);
                        setIsSuccess(false);
                    }
                })
                .catch((error) => {
                    if (error.message === "Network Error") {
                        setError2(true);
                        setIsSuccess(false);
                    } else if (error.response.status === 429) {
                        toast.error("Please wait 1 Minute before submitting again");
                        setIsSuccess(false);
                    } else {
                        setError2(true);
                        setIsSuccess(false);
                    }
                });
        }
    };

    return (
        <ContactFormContainer id={"contactUs"}>
            {isOpened ? (
                <H1> {"Applications are currently open!".toUpperCase()} </H1>
            ) : (
                <H1> {"Applications are currently closed.".toUpperCase()} </H1>
            )}
            <ContentP>Internship and Services Opportunities</ContentP>
            <ContactFormCard>
                <ContactFormSection onSubmit={handleSubmit}>
                    <Cover>
                        <CoverLeft>
                            <ContactFormLabel htmlFor="name">
                                <PersonIcon />
                            </ContactFormLabel>
                            <ContactFormInput
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={"Name"}
                            />
                        </CoverLeft>
                        <CoverRight>
                            <ContactFormLabel htmlFor="name">
                                <EmailIcon />
                            </ContactFormLabel>
                            <ContactFormInput
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={"Email"}
                            />
                        </CoverRight>
                    </Cover>

                    <CoverLeft>
                        <ContactFormLabel htmlFor="reason">
                            <ReasonIcon />
                        </ContactFormLabel>
                        <ContactFormSelect name="reason" id="reason" value={formData.reason} onChange={handleChange}>
                            <ContactFormSelectOption value="">Select a reason</ContactFormSelectOption>
                            <ContactFormSelectOption value="internship">
                                Internship {isOpened ? "(Applications Now Open!)" : null}{" "}
                                {isClosed ? "(Applications Closed)" : null}
                            </ContactFormSelectOption>
                            <ContactFormSelectOption value="pentest">Pentest Service</ContactFormSelectOption>
                            <ContactFormSelectOption value="feedback">Feedback</ContactFormSelectOption>
                            <ContactFormSelectOption value="other">Other</ContactFormSelectOption>
                        </ContactFormSelect>
                    </CoverLeft>
                    {reason === "pentest" && (
                        <>
                            <CoverLeft>
                                <ContactFormLabel htmlFor="reasonType">
                                    <PentestIcon />
                                </ContactFormLabel>
                                <ContactFormSelect
                                    name="reasonType"
                                    id="reasonType"
                                    value={formData.reasonType}
                                    onChange={handleChange}
                                >
                                    <ContactFormSelectOption value="">Select a pentest type</ContactFormSelectOption>
                                    <ContactFormSelectOption value="Web Application Pentest">
                                        Web Application Pentest
                                    </ContactFormSelectOption>
                                    <ContactFormSelectOption value="API Pentest">API Pentest</ContactFormSelectOption>
                                    <ContactFormSelectOption value="Mobile Application Pentest">
                                        Mobile Application Pentest
                                    </ContactFormSelectOption>
                                    <ContactFormSelectOption value="Cloud Pentest">
                                        Cloud Pentest
                                    </ContactFormSelectOption>
                                    <ContactFormSelectOption value="IOT and OT Pentest">
                                        IOT and OT Pentest
                                    </ContactFormSelectOption>
                                    <ContactFormSelectOption value="Network Pentest">
                                        Network Pentest
                                    </ContactFormSelectOption>
                                </ContactFormSelect>
                            </CoverLeft>

                            <Cover>
                                <CoverLeft>
                                    <ContactFormLabel htmlFor="company">
                                        <ReasonIcon />
                                    </ContactFormLabel>
                                    <ContactFormInput
                                        type="text"
                                        name="company"
                                        id="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={"Company"}
                                    />
                                </CoverLeft>
                                <CoverRight>
                                    <ContactFormLabel htmlFor="website">
                                        <WebIcon />
                                    </ContactFormLabel>
                                    <ContactFormInput
                                        type="text"
                                        name="website"
                                        id="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder={"Website"}
                                    />
                                </CoverRight>
                            </Cover>

                            <Cover>
                                <CoverLeft>
                                    <ContactFormLabel htmlFor="pentestBefore">
                                        <OrgIcon />
                                    </ContactFormLabel>
                                    <ContactFormInput
                                        type="text"
                                        name="pentestBefore"
                                        id="pentestBefore"
                                        value={formData.pentestBefore}
                                        onChange={handleChange}
                                        placeholder={"Have you performed any pentest previously?"}
                                    />
                                </CoverLeft>
                                <CoverRight>
                                    <ContactFormLabel htmlFor="phoneNumber">
                                        <PhoneIcon />
                                    </ContactFormLabel>
                                    <ContactFormInput
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder={"Phone number, +01 0101010101"}
                                    />
                                </CoverRight>
                            </Cover>
                        </>
                    )}
                    {isOpened && reason === "internship" && (
                        <>
                            <CoverLeft>
                                <ContactFormLabel htmlFor="reasonType">
                                    <InternshipIcon />
                                </ContactFormLabel>
                                <ContactFormSelect
                                    name="reasonType"
                                    id="reasonType"
                                    value={formData.reasonType}
                                    onChange={handleChange}
                                >
                                    <ContactFormSelectOption value="">Select an Internship</ContactFormSelectOption>
                                    {JobsData.map((job, id) => (
                                        <ContactFormSelectOption value={job.id} key={id}>
                                            {job.id}
                                        </ContactFormSelectOption>
                                    ))}

                                    {/* <ContactFormSelectOption value="SOC Analyst Internship"> */}
                                    {/*    SOC Analyst Internship */}
                                    {/* </ContactFormSelectOption> */}
                                </ContactFormSelect>
                            </CoverLeft>
                            <Cover>
                                <CoverLeft>
                                    <ContactFormLabel htmlFor="resume">
                                        <ResumeIcon />
                                    </ContactFormLabel>
                                    <ContactFormInput
                                        type="text"
                                        name="resume"
                                        id="resume"
                                        value={formData.resume}
                                        onChange={handleChange}
                                        placeholder={
                                            "Resume link (You can upload in drive and make sure the link is accessible)"
                                        }
                                    />
                                </CoverLeft>
                            </Cover>
                        </>
                    )}
                    {!isOpened && reason === "internship" && (
                        <CoverLeft>
                            <ContactFormLabel htmlFor="reasonType">
                                <InternshipIcon />
                            </ContactFormLabel>
                            <ContactFormInput
                                type="text"
                                name="resume"
                                id="resume"
                                value={
                                    "Please wait for the next internship opening, for more info checkout our Internship page"
                                }
                                onChange={handleChange}
                            />
                        </CoverLeft>
                    )}

                    {reason === "feedback" && (
                        <CoverLeft>
                            <ContactFormLabel htmlFor="contextHeading">
                                <OrgIcon />
                            </ContactFormLabel>
                            <ContactFormInput
                                type="text"
                                name="contextHeading"
                                id="contextHeading"
                                value={formData.contextHeading}
                                onChange={handleChange}
                                placeholder={"Feedback About?"}
                            />
                        </CoverLeft>
                    )}
                    {reason === "other" && (
                        <CoverLeft>
                            <ContactFormLabel htmlFor="contextHeading">
                                <OrgIcon />
                            </ContactFormLabel>
                            <ContactFormInput
                                type="text"
                                name="contextHeading"
                                id="contextHeading"
                                value={formData.contextHeading}
                                onChange={handleChange}
                                placeholder={"Title"}
                            />
                        </CoverLeft>
                    )}
                    {isClosed && reason === "internship" ? null : (
                        <CoverLeft>
                            <ContactFormLabel htmlFor="message">
                                <MessageIcon />
                            </ContactFormLabel>
                            <ContactFormTextArea
                                type="text"
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={reason === "internship" ? "Cover Letter (Optional) " : "Message"}
                            />
                        </CoverLeft>
                    )}
                    {!isSuccess ? (
                        !isOpened && reason === "internship" ? null : !isLoading ? (
                            <ContactFormSubmit type="submit" value="submit" placeholder={"Submit"}>
                                Submit
                            </ContactFormSubmit>
                        ) : (
                            <LoadingButton width={"100%"}>
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        )
                    ) : null}
                    {error && !isSuccess && <ErrorMessage>{"Please fill all of the fields"}</ErrorMessage>}
                    {error2 && !isSuccess && (
                        <ErrorMessage>{"Server Error - Please contact us on discord"}</ErrorMessage>
                    )}
                </ContactFormSection>
                {isSuccess && !error ? <GlowingButton>Submit Successfully</GlowingButton> : null}
            </ContactFormCard>
        </ContactFormContainer>
    );
};

export default ContactForm;
