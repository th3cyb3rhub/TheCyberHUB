import React from "react";
import { Detail1, Detail2, DetailsText, JobDetailsContainer } from "./JobDetailsElements";
import { BackArrow, ResumeLink } from "./JobsElements";
import { JobHeader, JobHero, JobTitle } from "../../../Resources/Jobs/JobsElements";
import SendEmail from "../SendEmail";
import CheckValues from "../checkValues";

export default function JobDetailsPage(props) {
    return (
        <JobDetailsContainer>
            <BackArrow onClick={props?.onClick} />
            <JobHero>
                <JobHeader>
                    {props?.reason === "internship" && <JobTitle>{props?.reasonType}</JobTitle>}
                    {props?.reason === "other" && <JobTitle>{props?.contextHeading}</JobTitle>}
                    {props?.reason === "feedback" && <JobTitle>{props?.contextHeading}</JobTitle>}
                </JobHeader>
            </JobHero>

            <DetailsText>
                <span>{props.createdAt.split("T")[0]}</span>
                <span> - </span>
                <span>{props.createdAt.split("T")[1].split(".")[0]}</span>
            </DetailsText>
            <Detail2>
                <DetailsText>Checked: {props?.checked ? <>true</> : <>false</>} </DetailsText>
                <DetailsText>Rejected: {props?.rejected ? <>true</> : <>false</>} </DetailsText>
                <DetailsText>Email Sent: {props?.emailSent ? <>true</> : <>false</>} </DetailsText>
            </Detail2>
            <Detail1>
                <Detail2>
                    <DetailsText> {props?.name} </DetailsText>
                    <DetailsText> {props?.email} </DetailsText>
                </Detail2>
                <Detail2>
                    <DetailsText>
                        Resume link:
                        <ResumeLink target={"_blank"} href={props?.resume}>
                            {props?.resume}
                        </ResumeLink>
                    </DetailsText>
                </Detail2>
                <DetailsText>{props.message}</DetailsText>
            </Detail1>
            <hr />
            <CheckValues id={props._id} checked={props.checked} rejected={props.rejected} emailSent={props.emailSent} />
            <hr />
            <SendEmail
                email={props?.email}
                name={props?.name}
                reason={props?.reason}
                reasonType={props?.reasonType}
                resume={props?.resume}
            />
        </JobDetailsContainer>
    );
}
