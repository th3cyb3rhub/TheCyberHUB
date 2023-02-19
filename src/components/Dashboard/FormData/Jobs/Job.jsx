import React from "react";
import { JobContainer, JobHero, JobLocation, JobRole, JobRoleTitle, JobTitle } from "./JobsElements";
import { Detail2, DetailsText } from "./JobDetailsElements";

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
            <Detail2>
                <DetailsText>Chkd: {props?.checked ? <>true</> : <>false</>} </DetailsText>
                <DetailsText>Rjkt: {props?.rejected ? <>true</> : <>false</>} </DetailsText>
                <DetailsText>Mail: {props?.emailSent ? <>true</> : <>false</>} </DetailsText>
            </Detail2>
        </JobContainer>
    );
}
