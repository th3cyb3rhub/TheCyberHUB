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
    PersonIcon,
    ReasonIcon,
    ResumeIcon,
} from "./ContactFormElements.jsx";

import { getApiUrl } from "../../../features/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import InternshipProgramData from "../../Opportunities/Internship/InternshipProgramData";
import { JobsData } from "../../Resources/Jobs/JobsData";
import { LoadingButton } from "../../Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";
import apiStatus from "../../../features/apiStatus";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
import { volunteerPrograms } from "../../Opportunities/Volunteer/VolunteerData";

const ContactForm = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const path = window.location.pathname;
    const lastEndpoint = path.substring(path.lastIndexOf("/") + 1);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        reason: "",
        reasonType: "",
        contextHeading: "",
        resume: "",
        message: "",
        isExperienced: "",
    });

    const { name, email, reason, reasonType, resume, contextHeading, message, isExperienced } = formData;

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
        setError(false);
        setError2(false);
        setIsSuccess(false);
        const filledFormData = {
            name,
            email,
            reason,
            reasonType,
            resume,
            message,
            contextHeading,
            isExperienced,
            submissionFrom: "thecyberhub.org",
        };
        if (name.length === 0) {
            setError("Please add your name");
        } else if (email.length === 0) {
            setError("Please add your email");
        } else if (reason.length === 0) {
            setError("Please select a reason");
        } else if (isExperienced.length === 0) {
            setError("Please tell us if you have prior experience");
        } else if (
            message.length === 0 ||
            ((reason === "volunteer" || reason === "internship") && reasonType.length === 0)
        ) {
            setError("Please fill all of the fields");
        } else if (reason === "internship" && resume.length === 0) {
            setError("Please include the resume link");
            // }
            // else if ((reason === "internship" && message.length < 200) || message.length > 1000) {
            //     toast("Please write a cover letter of length 200 - 1000 characters");
        } else {
            setIsLoading(true);
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
                            reason: "",
                            reasonType: "",
                            contextHeading: "",
                            resume: "",
                            message: "",
                            isExperienced: "",
                        });
                        setError(false);
                        setError2(false);
                    }
                    if (response.data.message === "Something went wrong. Please try again later.") {
                        setIsLoading(false);
                        setError2(true);
                        setIsSuccess(false);
                    }
                })
                .catch((error) => {
                    if (error.message === "Network Error") {
                        setError2(true);
                        setIsLoading(false);
                        setIsSuccess(false);
                    } else if (error.response.status === 429) {
                        toast.error("Please wait 1 Minute before submitting again");
                        setIsLoading(false);
                        setIsSuccess(false);
                    } else {
                        setIsLoading(false);
                        setError2(true);
                        setIsSuccess(false);
                    }
                });
        }
    };

    if (isApiLoading) {
        return lastEndpoint === "contact" ? (
            <Wrapper>
                <CircleSpinner size={20} color={"#1fc10d"} isLoading={isApiLoading} />
            </Wrapper>
        ) : null;
    }

    if (!isApiWorking) {
        return lastEndpoint === "contact" ? <UnderMaintenance /> : null;
    }

    return (
        <ContactFormContainer id={"contactUs"}>
            <H1> {"Internship, Volunteer and Speaker Opportunities.".toUpperCase()} </H1>
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
                                Internship {isOpened ? "(Applications Now Open!)" : null}
                                {isClosed ? "(Applications Closed)" : null}
                            </ContactFormSelectOption>
                            <ContactFormSelectOption value="volunteer">
                                Volunteer (Contribute to the Community)
                            </ContactFormSelectOption>
                            <ContactFormSelectOption value="feedback">Feedback</ContactFormSelectOption>
                            <ContactFormSelectOption value="other">Other</ContactFormSelectOption>
                        </ContactFormSelect>
                    </CoverLeft>

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
                    {reason === "volunteer" && (
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
                                    <ContactFormSelectOption value="">
                                        Select a Volunteer Program (remote/online)
                                    </ContactFormSelectOption>
                                    {volunteerPrograms.map((volunteerProgram, id) => (
                                        <ContactFormSelectOption value={volunteerProgram.volunteerFor} key={id}>
                                            {volunteerProgram.volunteerFor}
                                        </ContactFormSelectOption>
                                    ))}

                                    <ContactFormSelectOption value={"other"}>
                                        Anything else you want to volunteer for (Please specify in the message)
                                    </ContactFormSelectOption>

                                    {/* <ContactFormSelectOption value="SOC Analyst Internship"> */}
                                    {/*    SOC Analyst Internship */}
                                    {/* </ContactFormSelectOption> */}
                                </ContactFormSelect>
                            </CoverLeft>
                            <CoverLeft>
                                <ContactFormLabel htmlFor="isExperienced">
                                    <ResumeIcon />
                                </ContactFormLabel>
                                <ContactFormInput
                                    type="text"
                                    name="isExperienced"
                                    id="isExperienced"
                                    value={formData.isExperienced}
                                    onChange={handleChange}
                                    placeholder={"Do you have any experience in this field? (Yes/No)"}
                                />
                            </CoverLeft>
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
                                        "Resume link (You can upload in drive and make sure the link is accessible in incognito mode)"
                                    }
                                />
                            </CoverLeft>
                        </>
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
                                placeholder={
                                    reason === "internship" || reason === "volunteer"
                                        ? `Cover Letter 

Including: 
- Why u want to join this program
- Share your previous work (links) / experience (if any) 
- Must share your github, tryhackme and linkedin profile link (if any)
`
                                        : "Message"
                                }
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
