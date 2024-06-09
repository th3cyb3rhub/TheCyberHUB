import React from "react";
import {
    InternshipContainer,
    InternshipHeader,
    InternshipHeading,
} from "src/components/Opportunities/Internship/InternshipElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import {
    JobContainer,
    JobDetails,
    JobHeader,
    JobHero,
    JobReq,
    JobsCardSection,
    JobTitle,
    RouterLink,
} from "src/components/Resources/Jobs/JobsElements";
import { volunteerPrograms } from "./VolunteerData";
import { List, ListContent, ListIcon } from "src/components/Resources/Jobs/JobDetailsElements";

const Volunteer = () => {
    return (
        <Wrapper>
            <InternshipContainer>
                <InternshipHeader>
                    <InternshipHeading> Volunteer </InternshipHeading>
                </InternshipHeader>

                <JobsCardSection>
                    {volunteerPrograms.map((data) => (
                        <Job key={data.id} {...data} />
                    ))}
                </JobsCardSection>
            </InternshipContainer>
        </Wrapper>
    );
};

function Job(props) {
    return (
        <JobContainer>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div>
                    <JobHero>
                        <JobHeader>
                            <JobTitle>{props.volunteerFor}</JobTitle>
                        </JobHeader>
                    </JobHero>
                    <JobDetails>
                        <h3> Responsibilities: </h3>
                        <ul>
                            {props.responsibilities.map((item, id) => (
                                <List key={id}>
                                    <ListIcon /> <ListContent> {item} </ListContent>
                                </List>
                            ))}
                        </ul>
                    </JobDetails>
                    <JobReq>
                        <h3> Requirements: </h3>
                        <ul>
                            {props.requirements.map((item, id) => (
                                <List key={id}>
                                    <ListIcon /> <ListContent> {item} </ListContent>
                                </List>
                            ))}
                        </ul>
                    </JobReq>
                </div>

                <RouterLink
                    to={"/contact"}
                    style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "#1F1F1F",
                        width: "100%",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        display: "inline-block",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            transition: "all 0.2s ease-in-out",
                            backgroundColor: "#fff",
                            color: "#1F1F1F",
                        },
                    }}
                >
                    Apply
                </RouterLink>
            </div>
        </JobContainer>
    );
}

export default Volunteer;
