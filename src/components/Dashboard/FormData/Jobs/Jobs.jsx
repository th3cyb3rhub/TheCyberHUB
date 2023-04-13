import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { Container, Heading, Overlay, Paragraph } from "../../Community/CommunityElements";
import {
    JobIntroHeader,
    JobsCardSection,
    JobsDetailContainer,
    JobsDetailSection,
    JobsDropdownIcon,
    JobSection,
    ScrollButton,
} from "./JobsElements";

import Job from "./Job";
import { JobsData } from "./JobsData";
import { Wrapper } from "../../Dashboard/UserProfile/ProfileElements";
import JobDetailsPage from "./JobDetailsPage";

const Jobs = () => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <Wrapper>
            <JobSection>
                {/* {!detailsVisible ? (<> */}
                <JobIntroHeader>
                    <Overlay />
                    <Container>
                        <Heading>
                            Searching for a job? <br /> Look no further!
                        </Heading>
                        <Paragraph>
                            Explore job opportunities across various fields with our comprehensive job board. <br />
                            Improve your skills and gain real-world experience through our unpaid internship program.
                            <br />
                            Performance-based incentives and perks await you after three months, including swag and
                            more!
                        </Paragraph>
                        <ScrollLink to={"jobs"} smooth={true} duration={600} spy={true} exact={"true"} offset={-80}>
                            <ScrollButton>
                                <span>Find A Job</span>
                                <JobsDropdownIcon />
                            </ScrollButton>
                        </ScrollLink>
                    </Container>
                </JobIntroHeader>

                {/* </>) : (null)} */}

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
            </JobSection>
        </Wrapper>
    );
};

export default Jobs;
