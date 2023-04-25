import React, { useState } from "react";

import { JobsCardSection, JobsDetailContainer, JobsDetailSection, JobSection } from "./JobsElements";

import Job from "./Job";
import { JobsData } from "./JobsData";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import JobDetailsPage from "./JobDetailsPage";
import InternshipProgram from "./Internship/InternshipProgram";

const Jobs = () => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <Wrapper>
            <InternshipProgram />
            <JobSection>
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
                                {JobsData.map((data) => (
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
                                {JobsData.map((data) => (
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
                                <JobsDetailSection style={{ float: "right", width: "35%" }}>
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
            </JobSection>
        </Wrapper>
    );
};

export default Jobs;
