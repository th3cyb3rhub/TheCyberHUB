import React from "react";
import InternshipProgramData from "./InternshipProgramData";
import {
    ApplicationHeading,
    ApplicationOpenText,
    ApplicationOpenTextSection,
    InternshipCard,
    InternshipContainer,
    InternshipHeader,
    InternshipHeading,
    InternshipProgramContainer,
} from "./InternshipElements";
import InternshipTimeline from "./InternshipTimeline";

const InternshipProgram = () => {
    return (
        // <Wrapper>
        <InternshipContainer>
            <InternshipHeader>
                <InternshipHeading> Internship </InternshipHeading>
            </InternshipHeader>
            <InternshipTimeline />
            <InternshipProgramContainer>
                {InternshipProgramData.map((cycle) => (
                    <InternshipCycle
                        key={cycle.id}
                        cycleName={cycle.cycleName}
                        applicationOpen={cycle.applicationOpen}
                        applicationClose={cycle.applicationClose}
                        interviewDate={cycle.interviewDate}
                        internshipPeriod={cycle.internshipPeriod}
                        applicationCloseDate={cycle.applicationCloseDate}
                        applicationOpenDate={cycle.applicationOpenDate}
                        internshipStartTime={cycle.internshipStartTime}
                    />
                ))}
            </InternshipProgramContainer>
        </InternshipContainer>
        // {/*</Wrapper>*/}
    );
};

const InternshipCycle = ({
    cycleName,
    applicationOpen,
    interviewDate,
    internshipPeriod,
    roles,
    eligibility,
    applicationProcedure,
    applicationClose,
    applicationOpenDate,
    applicationCloseDate,
    internshipStartTime,
}) => {
    const currentDate = new Date().toISOString();
    const openDate = applicationOpenDate;
    const closeDate = applicationCloseDate;
    const internCloseDate = internshipStartTime;
    const isBetweenDates = currentDate >= openDate && currentDate <= closeDate;
    const appClosed = currentDate >= closeDate && currentDate <= internCloseDate;

    const appWillOpenIn = currentDate < openDate;

    console.log(appWillOpenIn);

    return (
        <InternshipCard isBetweenDates={isBetweenDates} appClosed={appClosed}>
            {isBetweenDates ? (
                <ApplicationOpenTextSection>
                    <ApplicationOpenText>Applications Now Open!</ApplicationOpenText>
                </ApplicationOpenTextSection>
            ) : appClosed ? (
                <ApplicationOpenTextSection>
                    <ApplicationOpenText>Applications Closed</ApplicationOpenText>
                </ApplicationOpenTextSection>
            ) : null}

            <ApplicationHeading>{cycleName}</ApplicationHeading>
            <p>Application Open: {applicationOpen}</p>
            <p>Application Close: {applicationClose}</p>
            <p>Interview Date: {interviewDate}</p>
            <p>Internship Period: {internshipPeriod}</p>
        </InternshipCard>
    );
};

export default InternshipProgram;
