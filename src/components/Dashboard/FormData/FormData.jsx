import React, { useEffect, useState } from "react";
import { FormDataContainer, FormType, FormTypesContainer, FromDataSection } from "./FormDataElements";
import { JobsCardSection, JobsDetailContainer, JobsDetailSection } from "./Jobs/JobsElements";
import Job from "./Jobs/Job";
import JobDetailsPage from "./Jobs/JobDetailsPage";
import { useSelector } from "react-redux";

const FormData = () => {
    const { user } = useSelector((state) => state.auth);
    if (user.username === "kabir0x23" || user.username === "0xFTW") {
        const [formData, setFormData] = useState([]);
        const [errorMessage, setErrorMessage] = useState();
        const [detailsVisible, setDetailsVisible] = useState(false);
        const [selectedJob, setSelectedJob] = useState(null);

        useEffect(() => {
            const token = localStorage.getItem("token");
            fetch("http://localhost:5000/api/form/getFromData", {
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
            } else if (stateName === "showInternship") {
                setShowPentest(false);
                setShowInternship(true);
                setShowFeedback(false);
                setShowOthers(false);
            } else if (stateName === "showFeedback") {
                setShowPentest(false);
                setShowInternship(false);
                setShowFeedback(true);
                setShowOthers(false);
            } else if (stateName === "showOthers") {
                setShowPentest(false);
                setShowInternship(false);
                setShowFeedback(false);
                setShowOthers(true);
            }
        };

        console.log(errorMessage);

        return (
            <FormDataContainer>
                <FormTypesContainer>
                    <FormType onClick={() => handleShowState("showPentest")}>Pentests</FormType>
                    <FormType onClick={() => handleShowState("showInternship")}>Internships</FormType>
                    <FormType onClick={() => handleShowState("showFeedback")}>Feedback</FormType>
                    <FormType onClick={() => handleShowState("showOthers")}>Others</FormType>
                </FormTypesContainer>
                {/* {showPentest && ( */}
                {/*    <FormTypesContainer> */}
                {/*        <FormType onClick={() => handleShowState('WebApplicationPentest')}>Web Application Pentest</FormType> */}
                {/*        <FormType onClick={() => handleShowState('APIPentest')}>API Pentest</FormType> */}
                {/*        <FormType onClick={() => handleShowState('MobileApplicationPentest')}>Mobile Application Pentest</FormType> */}
                {/*        <FormType onClick={() => handleShowState('CloudPentest')}>Cloud Pentest</FormType> */}
                {/*        <FormType onClick={() => handleShowState('IOTandOTPentest')}>IOT and OT Pentest</FormType> */}
                {/*        <FormType onClick={() => handleShowState('NetworkPentest')}>Network Pentest</FormType> */}
                {/*    </FormTypesContainer> */}
                {/* )} */}
                {/* {showInternship && ( */}
                {/*    <FormTypesContainer> */}
                {/*        <FormType onClick={() => handleShowState('Business Development/Sales/Marketing Internship')}>Business Development/Sales/Marketing Internship </FormType> */}
                {/*        <FormType onClick={() => handleShowState('MERN Stack Internship')}>MERN Stack Internship </FormType> */}
                {/*        <FormType onClick={() => handleShowState('Content Creator Internship')}>Content Creator Internship </FormType> */}
                {/*        <FormType onClick={() => handleShowState('Next.js Internship')}>Next.js Internship </FormType> */}
                {/*        <FormType onClick={() => handleShowState('Penetration Testing Internship')}>Penetration Testing Internship </FormType> */}
                {/*        <FormType onClick={() => handleShowState('SOC Analyst Internship')}>SOC Analyst Internship </FormType> */}
                {/*    </FormTypesContainer> */}
                {/* )} */}
                <FromDataSection></FromDataSection>
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
        );
    } else {
        return <div>Dashboard</div>;
    }
};

export default FormData;
