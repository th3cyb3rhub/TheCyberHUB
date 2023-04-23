import React from "react";
import {
    JobDescSection,
    JobDetails,
    JobDetailsContainer,
    JobDetailsHeader,
    JobDetailsHero,
    JobDetailsLocation,
    JobDetailsRating,
    JobDetailsReq,
    JobDetailsRole,
    JobDetailsRoleTitle,
    JobDetailsTimeline,
    JobDetailsTitle,
    List,
    ListContainer,
    ListContent,
    ListIcon,
} from "./JobDetailsElements";
import { BackArrow } from "./JobsElements";

export default function JobDetailsPage(props) {
    return (
        <JobDetailsContainer>
            <BackArrow onClick={props.onClick} />
            <JobDetailsHero>
                <JobDetailsHeader>
                    {props.status && <span className="status">{props.status}</span>}
                    <JobDetailsTitle>{props.jobTitle}</JobDetailsTitle>
                    <JobDetailsRole>
                        <JobDetailsRoleTitle>{props.jobRoleTitle}</JobDetailsRoleTitle>
                        <JobDetailsRating>{props.jobRating}</JobDetailsRating>
                    </JobDetailsRole>
                    <JobDetailsLocation>
                        <span>{props.jobLocation}</span>
                    </JobDetailsLocation>
                </JobDetailsHeader>
            </JobDetailsHero>
            <JobDetails>
                {props.jobDetails.map((item, i) => (
                    <div key={i}>
                        <span>{item.item}</span>
                        {item.badge && (
                            <div className="badge">
                                <span>{item.badge}</span>
                            </div>
                        )}
                    </div>
                ))}
            </JobDetails>
            {/* <JobDetails> */}
            {/*    {props.jobDetails2.map((item, i) => ( */}
            {/*        <div key={i}> */}
            {/*            <span>{item}</span> */}
            {/*        </div> */}
            {/*    ))} */}
            {/* </JobDetails> */}
            <JobDescSection>{props.jobDesc1}</JobDescSection>
            <JobDetailsReq>
                <h3> Requirements: </h3>
                <ListContainer>
                    {props.jobReq.map((item, id) => (
                        <List key={id}>
                            <ListIcon /> <ListContent> {item} </ListContent>
                        </List>
                    ))}
                </ListContainer>
            </JobDetailsReq>
            <JobDetailsReq>
                <h3> Responsibilities: </h3>
                <ListContainer>
                    {props.jobRes.map((item, id) => (
                        <List key={id}>
                            <ListIcon /> <ListContent> {item} </ListContent>
                        </List>
                    ))}
                </ListContainer>
            </JobDetailsReq>
            <JobDescSection>{props.jobDesc2}</JobDescSection>
            <JobDetailsTimeline>
                <span>{props.jobTimeline.datePosted}</span>
                <span className="dot">{props.jobTimeline.separator}</span>
                <span>
                    From <span className="remote">{props.jobTimeline.directory}</span>
                </span>
            </JobDetailsTimeline>
        </JobDetailsContainer>
    );
}
