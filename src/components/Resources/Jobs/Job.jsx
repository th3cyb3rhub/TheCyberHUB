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
  JobTimeline,
} from "./JobsElements";

import { FaEllipsisV } from "react-icons/fa";

export default function Job(props) {
  return (
    <>
      <JobContainer>
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
          <FaEllipsisV />
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
        <JobDetails>
          {props.jobDetails2.map((item, i) => (
            <div key={i}>
              <span>{item}</span>
            </div>
          ))}
        </JobDetails>
        <JobReq>
          <ul>
            {props.jobReq.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </JobReq>
        <JobTimeline>
          <span>{props.jobTimeline.datePosted}</span>
          <span className="dot">{props.jobTimeline.separator}</span>
          <span>
            From <span className="remote">{props.jobTimeline.directory}</span>
          </span>
        </JobTimeline>
      </JobContainer>
    </>
  );
}
