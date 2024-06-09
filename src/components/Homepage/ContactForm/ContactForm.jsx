import React, { useEffect, useState } from "react";
import {
    ContactFormCard,
    ContactFormContainer,
    ContactFormInput,
    ContactFormLabel,
    ContactFormSection,
    ContactFormSelect,
    ContactFormSubmit,
    ContactFormTextArea,
    Cover,
    CoverLeft,
    CoverRight,
    EmailIcon,
    ErrorMessage,
    H1,
    InternshipIcon,
    MessageIcon,
    OrgIcon,
    PersonIcon,
    ReasonIcon,
    ResumeIcon,
} from "./ContactFormElements.jsx";

import { getApiUrl } from "src/features/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import InternshipProgramData from "src/components/Opportunities/Internship/InternshipProgramData";
import { JobsData } from "src/components/Resources/Jobs/JobsData";
import { LoadingButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
import { CircleSpinner } from "react-spinners-kit";
import { validateEmail } from "src/utils/validateEmail.js";
import apiStatus from "src/features/apiStatus";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import { volunteerPrograms } from "src/components/Opportunities/Volunteer/VolunteerData";

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

    useEffect(() => {
        if (error || error2) {
            toast.error("Please fill all the fields");
        }
        toast(error || error2);
        InternshipProgramData.some(({ applicationOpenDate, applicationCloseDate, internshipStartTime }) => {
            const currentDate = new Date().toISOString();

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
            }
            if (isClosed) {
                setIsOpened(false);
                setIsClosed(true);
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
        setIsLoading(false);
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

        // Validate email
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return; // Stop the form submission
        }

        if (name.length === 0) {
            setError("Please add your name");
        } else if (email.length === 0) {
            setError("Please add your email");
        } else if (reason.length === 0) {
            setError("Please select a reason");
        } else if (reason === "internship" || reason === "volunteer") {
            if (reasonType.length === 0) {
                setError("Please include the resume link");
            } else if (!resume.startsWith("http")) {
                setError("please submit the correct link to your resume");
            }
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
                        toast.success("Form submitted successfully");
                        setTimeout(() => {
                            setIsSuccess(false);
                        }, 50); // Reset after 0.005 seconds

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
                <CircleSpinner size={20} color={"#ff6b08"} isLoading={isApiLoading} />
            </Wrapper>
        ) : null;
    }

    if (!isApiWorking) {
        return lastEndpoint === "contact" ? <UnderMaintenance /> : null;
    }

    return (
        <ContactFormContainer id={"contactUs"}>
            {/* <H1> {"Internship, Volunteer and Speaker Opportunities.".toUpperCase()} </H1> */}
            <H1> {"Internship Opportunities".toUpperCase()} </H1>
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
                        <ContactFormSelect
                            aria-label="reason"
                            name="reason"
                            id="reason"
                            value={formData.reason}
                            onChange={handleChange}
                        >
                            <option style={{ display: "none" }} value="">
                                Select a reason
                            </option>
                            <option value="internship">
                                Internship {isOpened ? "(Applications are Now Open!)" : null}
                                {isClosed ? "(Applications Closed)" : null}
                            </option>
                            {/* <option value="volunteer"> */}
                            {/*    Volunteer (Contribute to the Community) */}
                            {/* </option> */}
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
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
                                    <option value="">Select an Internship</option>
                                    {JobsData.map((job, id) => (
                                        <option value={job.id} key={id}>
                                            {job.id}
                                        </option>
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
                                    <option value="">Select a Volunteer Program (remote/online)</option>
                                    {volunteerPrograms.map((volunteerProgram, id) => (
                                        <option value={volunteerProgram.volunteerFor} key={id}>
                                            {volunteerProgram.volunteerFor}
                                        </option>
                                    ))}

                                    <option value={"other"}>
                                        Anything else you want to volunteer for (Please specify in the message)
                                    </option>
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
                                placeholder={"Subject"}
                            />
                        </CoverLeft>
                    )}
                    {reason === "internship" && !isOpened ? null : (
                        <CoverLeft style={{ alignItems: "start" }}>
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
                            <LoadingButton width={"10 0%"}>
                                <CircleSpinner size={20} color={"#131313"} />
                            </LoadingButton>
                        )
                    ) : null}
                    {error && !isSuccess && <ErrorMessage>{error}</ErrorMessage>}
                    {error2 && !isSuccess && (
                        <ErrorMessage>{"Server Error - Please contact us on discord"}</ErrorMessage>
                    )}
                </ContactFormSection>
            </ContactFormCard>
        </ContactFormContainer>
    );
};

export default ContactForm;
