import React from "react";
import {
    FormDescSection,
    FormDetails,
    FormDetailsContainer,
    FormDetailsHeader,
    FormDetailsHero,
    FormDetailsLocation,
    FormDetailsRating,
    FormDetailsReq,
    FormDetailsRole,
    FormDetailsRoleTitle,
    FormDetailsTimeline,
    FormDetailsTitle,
    List,
    ListContainer,
    ListContent,
    ListIcon,
    // ,BackArrow
} from "./SingleFormDataElements";

export default function FormDetailsPage(props) {
    return (
        <FormDetailsContainer>
            {/* <BackArrow onClick={props.onClick} /> */}
            <FormDetailsHero>
                <FormDetailsHeader>
                    {props.status && <span className="status">{props.status}</span>}
                    <FormDetailsTitle>{props.jobTitle}</FormDetailsTitle>
                    <FormDetailsRole>
                        <FormDetailsRoleTitle>{props.jobRoleTitle}</FormDetailsRoleTitle>
                        <FormDetailsRating>{props.jobRating}</FormDetailsRating>
                    </FormDetailsRole>
                    <FormDetailsLocation>
                        <span>{props.jobLocation}</span>
                    </FormDetailsLocation>
                </FormDetailsHeader>
            </FormDetailsHero>
            <FormDetails>
                {props.jobDetails?.map((item, i) => (
                    <div key={i}>
                        <span>{item.item}</span>
                        {item.badge && (
                            <div className="badge">
                                <span>{item.badge}</span>
                            </div>
                        )}
                    </div>
                ))}
            </FormDetails>
            {/* <FormDetails> */}
            {/*    {props.jobDetails2?.map((item, i) => ( */}
            {/*        <div key={i}> */}
            {/*            <span>{item}</span> */}
            {/*        </div> */}
            {/*    ))} */}
            {/* </FormDetails> */}
            <FormDescSection>{props.jobDesc1}</FormDescSection>
            <FormDetailsReq>
                <h3> Requirements: </h3>
                <ListContainer>
                    {props.jobReq?.map((item, id) => (
                        <List key={id}>
                            <ListIcon /> <ListContent> {item} </ListContent>
                        </List>
                    ))}
                </ListContainer>
            </FormDetailsReq>
            <FormDetailsReq>
                <h3> Responsibilities: </h3>
                <ListContainer>
                    {props.jobRes?.map((item, id) => (
                        <List key={id}>
                            <ListIcon /> <ListContent> {item} </ListContent>
                        </List>
                    ))}
                </ListContainer>
            </FormDetailsReq>
            <FormDescSection>{props.jobDesc2}</FormDescSection>
            <FormDetailsTimeline>
                <span>{props.jobTimeline.datePosted}</span>
                <span className="dot">{props.jobTimeline.separator}</span>
                <span>
                    From <span className="remote">{props.jobTimeline.directory}</span>
                </span>
            </FormDetailsTimeline>
        </FormDetailsContainer>
    );
}
