import React from "react";
import {
    JobContainer,
    JobHero,
    JobHeader,
    JobTitle,
    JobRole,
    JobRoleTitle,
    JobRating,
    JobLocation,
    JobDetails,
    JobReq,
    // JobTimeline,
} from "./JobsElements";

export default function Job(props) {
    return (
        <JobContainer onClick={props.onClick}>
            <JobHero>
                <JobHeader>
                    {props.status && <span className="status">{props.status}</span>}
                    <JobTitle>{props.jobTitle}</JobTitle>
                    <JobRole>
                        <JobRoleTitle>{props.jobRoleTitle}</JobRoleTitle>
                        <JobRating>{props.jobRating}</JobRating>
                    </JobRole>
                    <JobLocation>
                        <span>{props.jobLocation}</span>
                    </JobLocation>
                </JobHeader>
            </JobHero>
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
            <JobReq>
                <ul>
                    {props.jobReq.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </JobReq>
            {/* <JobTimeline> */}
            {/*    <span>{props.jobTimeline.datePosted}</span> */}
            {/*    <span className="dot">{props.jobTimeline.separator}</span> */}
            {/*    <span> */}
            {/*        From <span className="remote">{props.jobTimeline.directory}</span> */}
            {/*    </span> */}
            {/* </JobTimeline> */}
        </JobContainer>
    );
}
