import React from "react";
import { JobDetailsContainer } from "./JobDetailsElements";
import { BackArrow, JobReq } from "./JobsElements";
import { JobHeader, JobHero, JobLocation, JobRole, JobRoleTitle, JobTitle } from "../../../Resources/Jobs/JobsElements";

export default function JobDetailsPage(props) {
    return (
        <JobDetailsContainer>
            <BackArrow onClick={props?.onClick} />
            <JobHero>
                <JobHeader>
                    {props?.reason === "other" && <JobTitle>{props?.contextHeading}</JobTitle>}
                    {props?.reason === "feedback" && <JobTitle>{props?.contextHeading}</JobTitle>}{" "}
                    <JobLocation>
                        <span>{props.createdAt.split("T")[0]}</span>
                    </JobLocation>
                    <JobRole>
                        <JobRoleTitle>{props?.name}</JobRoleTitle>
                    </JobRole>
                    <JobRole>
                        <JobRoleTitle>{props?.email}</JobRoleTitle>
                    </JobRole>
                    <JobRole>
                        <JobRoleTitle>{props?.company}</JobRoleTitle>
                    </JobRole>
                    <JobRole>
                        <JobRoleTitle>{props?.website}</JobRoleTitle>
                    </JobRole>
                    <JobRole>
                        <JobRoleTitle>{props?.phoneNumber}</JobRoleTitle>
                    </JobRole>
                    <JobRole>
                        <JobRoleTitle>pentestBefore: {props?.pentestBefore}</JobRoleTitle>
                    </JobRole>
                </JobHeader>
            </JobHero>
            <JobReq>{props.message}</JobReq>
        </JobDetailsContainer>
    );
}
