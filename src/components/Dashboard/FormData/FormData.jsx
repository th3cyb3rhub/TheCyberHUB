import React, { useEffect, useState } from "react";
import { FormDataContainer, FormType } from "./FormDataElements";
import { JobsCardSection, JobsDetailContainer, JobsDetailSection } from "./Jobs/JobsElements";
import Job from "./Jobs/Job";
import JobDetailsPage from "./Jobs/JobDetailsPage";
import { useSelector } from "react-redux";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { NotFound } from "src/components/index";
import { getApiUrl } from "src/features/apiUrl";

const FormData = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user || user.role !== "admin" || user.role !== "team") {
        return <NotFound />;
    }

    const [formData, setFormData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).token;
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
                if (data === "User not authorized") {
                    setIsAuthorised(false);
                } else {
                    setIsAuthorised(true);
                }
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    }, []);

    const [showInternship, setShowInternship] = useState(false);
    const [showVolunteer, setShowVolunteer] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showOthers, setShowOthers] = useState(false);

    const handleShowState = (stateName) => {
        if (stateName === "showInternship") {
            setShowInternship(true);
            setShowFeedback(false);
            setShowOthers(false);
            setDetailsVisible(false);
            setShowVolunteer(false);
        } else if (stateName === "showVolunteer") {
            setShowVolunteer(true);
            setShowInternship(false);
            setShowFeedback(false);
            setShowOthers(false);
            setDetailsVisible(false);
        } else if (stateName === "showFeedback") {
            setShowInternship(false);
            setShowFeedback(false);
            setShowOthers(false);
            setDetailsVisible(false);
            setShowVolunteer(false);
        } else if (stateName === "showOthers") {
            setShowInternship(false);
            setShowFeedback(false);
            setShowOthers(true);
            setDetailsVisible(false);
            setShowVolunteer(false);
        }
    };

    if (!isAuthorised) {
        return <NotFound />;
    }

    return (
        <Wrapper>
            <FormDataContainer>
                {errorMessage && <p>{errorMessage}</p>}
                <div>
                    <FormType onClick={() => handleShowState("showPentest")}>Services</FormType>
                    <FormType onClick={() => handleShowState("showInternship")}>Internships</FormType>
                    <FormType onClick={() => handleShowState("showVolunteer")}>Volunteer</FormType>
                    <FormType onClick={() => handleShowState("showFeedback")}>Feedback</FormType>
                    <FormType onClick={() => handleShowState("showOthers")}>Others</FormType>
                </div>
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
                                    ?.filter((form) => {
                                        if (form?.reason === "internship" && showInternship) {
                                            return true;
                                        }
                                        if (form?.reason === "volunteer" && showVolunteer) {
                                            return true;
                                        }
                                        if (form?.reason === "feedback" && showFeedback) {
                                            return true;
                                        }
                                        if (form?.reason === "other" && showOthers) {
                                            return true;
                                        }
                                        return false;
                                    })
                                    ?.map((data) => (
                                        <Job
                                            key={data?.id}
                                            onClick={() => {
                                                setSelectedJob(data);
                                            }}
                                            {...data}
                                        />
                                    ))}
                            </JobsCardSection>
                            {detailsVisible ? (
                                <JobsDetailSection style={{ float: "right", width: "30%" }}>
                                    {selectedJob ? <JobDetailsPage key={selectedJob?.id} {...selectedJob} /> : null}
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
                                style={detailsVisible ? { display: "none" } : { overflowY: "scroll", height: "100%" }}
                            >
                                {formData?.map((data) => (
                                    <Job
                                        key={data?.id}
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
                                            key={selectedJob?.id}
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
