import { useState, useCallback } from "react";
import { Link as ScrollLink } from "react-scroll";

import {
  Overlay,
  Container,
  Heading,
  Paragraph,
} from "../../Community/CommunityElements";
import { ScrollButton, JobIntroHeader } from "./JobsElements";

import Job from "./Job";
import { JobsData } from "./JobsData";
import { JobSection } from "./JobsElements";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { auto } from "@popperjs/core";

const Jobs = () => {
  const [viewMore, setViewMore] = useState(false);

  const toggleViewMore = useCallback(() => {
    setViewMore((prevView) => !prevView);
  }, []);

  const allJobs = JobsData.map((data) => <Job key={data.id} {...data} />);

  return (
    <JobSection viewMore={viewMore}>
      <JobIntroHeader>
        <Overlay></Overlay>
        <Container>
          <Heading>
            Searching for a job? <br /> Look no futher!
          </Heading>
          <Paragraph>
            We have collated several areas/field where there are job
            vacancy(ies). <br /> Go through the <span>Job Section</span>, and
            find one that is best match for you.
          </Paragraph>
          <ScrollLink
            to={"jobs"}
            smooth={true}
            duration={600}
            spy={true}
            exact={"true"}
            offset={-80}
          >
            <ScrollButton>
              <FaChevronDown />
              <span>Find A Job</span>
            </ScrollButton>
          </ScrollLink>
        </Container>
      </JobIntroHeader>
      <div id="jobs" className="grid">
        {allJobs}
      </div>
      <button className="view" onClick={toggleViewMore}>
        {!viewMore ? (
          <FaChevronDown size={20} style={{ color: "white" }} />
        ) : (
          <FaChevronUp size={20} style={{ color: "white" }} />
        )}
      </button>
    </JobSection>
  );
};

export default Jobs;
