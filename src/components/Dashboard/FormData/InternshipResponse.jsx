import React, { useEffect, useState } from "react";
import { FormDataContainer } from "./FormDataElements";
import { JobsCardSection, JobsDetailContainer, JobsDetailSection } from "./Jobs/JobsElements";
import Job from "./Jobs/Job";
import JobDetailsPage from "./Jobs/JobDetailsPage";
import { useSelector } from "react-redux";
import { Wrapper } from "../Profile/ProfileElements";
import { NotFound } from "../../index";
import { getApiUrl } from "../../../features/apiUrl";
import {
    InternshipButton,
    InternshipResponseContainer,
    MonthButton,
    SelectInternshipSection,
    SelectMonthSection,
} from "./InternshipResponseElements";

const InternshipResponse = () => {
    const { user } = useSelector((state) => state.auth);
    if (!user || user?.userType === "user" || (user?.userType !== "admin" && user?.userType !== "team")) {
        return <NotFound />;
    }

    const [formData, setFormData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedReasonType, setSelectedReasonType] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

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
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage(err.message);
            });
    }, []);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const filteredData = selectedMonth
        ? formData.filter((data) => {
              const month = new Date(data.createdAt).getMonth();
              return month === selectedMonth;
          })
        : [];

    const filteredFormData = selectedReasonType
        ? filteredData.filter((data) => data.reasonType === selectedReasonType)
        : filteredData;

    return (
        <Wrapper>
            <InternshipResponseContainer>
                <SelectMonthSection>
                    {months?.map((month, index) => (
                        <MonthButton key={index} onClick={() => handleMonthClick(index)}>
                            {month}
                        </MonthButton>
                    ))}
                </SelectMonthSection>
                <SelectInternshipSection>
                    {Array?.from(new Set(formData?.map((data) => data.reasonType)))?.map(
                        (reasonType) =>
                            reasonType !== "Web Application Pentest" &&
                            reasonType !== "" && (
                                <InternshipButton
                                    key={reasonType}
                                    selected={selectedReasonType === reasonType}
                                    onClick={() => setSelectedReasonType(reasonType)}
                                >
                                    {reasonType}
                                    <span>
                                        ({filteredData.filter((data) => data.reasonType === reasonType).length})
                                    </span>
                                </InternshipButton>
                            ),
                    )}
                </SelectInternshipSection>
                <FormDataContainer>
                    {errorMessage && <p>{errorMessage}</p>}
                    <JobsDetailContainer id="jobs">
                        {window.innerWidth > 1000 ? (
                            <>
                                <JobsCardSection
                                    onClick={() => {
                                        setDetailsVisible(true);
                                    }}
                                    style={detailsVisible ? { overflowY: "scroll", height: "100%" } : {}}
                                    className={detailsVisible ? "active" : ""}
                                >
                                    {filteredFormData?.map((data) => (
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
                                <JobsCardSection
                                    onClick={() => {
                                        setDetailsVisible(!detailsVisible);
                                    }}
                                    style={
                                        detailsVisible ? { display: "none" } : { overflowY: "scroll", height: "100%" }
                                    }
                                >
                                    {filteredFormData?.map((data) => (
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
            </InternshipResponseContainer>
        </Wrapper>
    );
};

export default InternshipResponse;
