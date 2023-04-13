import React, { useEffect, useState } from "react";
import { FormDataContainer, FormType, FormTypesContainer, FromDataSection } from "./FormDataElements";
import { JobsCardSection, JobsDetailContainer, JobsDetailSection } from "./Jobs/JobsElements";
import Job from "./Jobs/Job";
import JobDetailsPage from "./Jobs/JobDetailsPage";
import { useSelector } from "react-redux";
import { Wrapper } from "../Profile/ProfileElements";
import { NotFound } from "../../index";
// import {useNavigate} from "react-router-dom";
import { getApiUrl } from "../../../features/apiUrl";
import SendEmail from "./SendEmail";

const FormData = () => {
    // const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    console.log(user.userType);
    if (!user || user.userType === "user" || user.userType !== "admin") {
        return <NotFound />;
    }
    // useEffect(() => {
    //     if (user && user.userType !== "admin") {
    //         navigate("/");
    //     }
    // }, [user, navigate]);

    const [formData, setFormData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        // https://api.thecyberhub.org
        fetch(getApiUrl("api/form/getFormData"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage(err.message);
            });
    }, []);

    const [showPentest, setShowPentest] = useState(false);

    const [showInternship, setShowInternship] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showOthers, setShowOthers] = useState(false);

    const handleShowState = (stateName) => {
        if (stateName === "showPentest") {
            setShowPentest(true);
            setShowInternship(false);
            setShowFeedback(false);
            setShowOthers(false);
            setDetailsVisible(false);
        } else if (stateName === "showInternship") {
            setShowPentest(false);
            setShowInternship(true);
            setShowFeedback(false);
            setShowOthers(false);
            setDetailsVisible(false);
        } else if (stateName === "showFeedback") {
            setShowPentest(false);
            setShowInternship(false);
            setShowFeedback(true);
            setShowOthers(false);
            setDetailsVisible(false);
        } else if (stateName === "showOthers") {
            setShowPentest(false);
            setShowInternship(false);
            setShowFeedback(false);
            setShowOthers(true);
            setDetailsVisible(false);
        }
    };

    return (
        <Wrapper>
            <FormDataContainer>
                {errorMessage && <p>{errorMessage}</p>}
                <FormTypesContainer>
                    <FormType onClick={() => handleShowState("showPentest")}>Services</FormType>
                    <FormType onClick={() => handleShowState("showInternship")}>Internships</FormType>
                    <FormType onClick={() => handleShowState("showFeedback")}>Feedback</FormType>
                    <FormType onClick={() => handleShowState("showOthers")}>Others</FormType>
                </FormTypesContainer>
                <FromDataSection>{showPentest ? <SendEmail /> : null}</FromDataSection>
                <JobsDetailContainer id="jobs">
                    {window.innerWidth > 1000 ? (
                        <>
                            {/*  Desktop view  */}
                            <JobsCardSection
                                onClick={() => {
                                    setDetailsVisible(true);
                                }}
                                style={detailsVisible ? { overflowY: "scroll", height: "100%" } : {}}
                                className={detailsVisible ? "active" : ""}
                            >
                                {formData
                                    .filter((form) => {
                                        if (form.reason === "pentest" && showPentest) {
                                            return true;
                                        }
                                        if (form.reason === "internship" && showInternship) {
                                            return true;
                                        }
                                        if (form.reason === "feedback" && showFeedback) {
                                            return true;
                                        }
                                        if (form.reason === "other" && showOthers) {
                                            return true;
                                        }
                                        return false;
                                    })
                                    .map((data) => (
                                        <Job
                                            key={data.id}
                                            onClick={() => {
                                                setSelectedJob(data);
                                            }}
                                            {...data}
                                        />
                                    ))}
                            </JobsCardSection>
                            {detailsVisible ? (
                                <JobsDetailSection style={{ float: "right", width: "30%" }}>
                                    {selectedJob ? <JobDetailsPage key={selectedJob.id} {...selectedJob} /> : null}
                                </JobsDetailSection>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {/*  Mobile view  */}
                            <JobsCardSection
                                onClick={() => {
                                    setDetailsVisible(!detailsVisible);
                                }}
                                style={
                                    detailsVisible
                                        ? { display: "none" }
                                        : {
                                              overflowY: "scroll",
                                              height: "100%",
                                          }
                                }
                            >
                                {formData.map((data) => (
                                    <Job
                                        key={data.id}
                                        onClick={() => {
                                            setSelectedJob(data);
                                        }}
                                        {...data}
                                    />
                                ))}
                            </JobsCardSection>
                            {detailsVisible ? (
                                <JobsDetailSection style={{ float: "right", width: "30%" }}>
                                    {selectedJob ? (
                                        <JobDetailsPage
                                            key={selectedJob.id}
                                            {...selectedJob}
                                            onClick={() => setDetailsVisible(false)}
                                        />
                                    ) : null}
                                </JobsDetailSection>
                            ) : null}
                        </>
                    )}
                </JobsDetailContainer>
            </FormDataContainer>
        </Wrapper>
    );
};

export default FormData;
