import React from "react";
import { JobContainer, JobHero, JobLocation, JobRole, JobRoleTitle, JobTitle } from "./JobsElements";

export default function Job(props) {
    return (
        <JobContainer onClick={props?.onClick}>
            <JobHero>
                {props?.reason === "other" && <JobTitle>{props?.contextHeading}</JobTitle>}
                {props?.reason === "feedback" && <JobTitle>{props?.contextHeading}</JobTitle>}
                <JobTitle>{props?.reasonType}</JobTitle>
            </JobHero>
            <JobRole>
                <JobRoleTitle>{props.name}</JobRoleTitle>
            </JobRole>
            <JobLocation>
                <span>{props.reasonType}</span>
            </JobLocation>
            <JobLocation>
                <span>{props.createdAt.split("T")[0]}</span>
                <span> | </span>
                <span>{props.createdAt.split("T")[1]}</span>
            </JobLocation>
        </JobContainer>
    );
}
