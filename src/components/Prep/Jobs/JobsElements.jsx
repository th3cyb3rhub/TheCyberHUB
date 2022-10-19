import styled from "styled-components";

import { Button, Header } from "../../Community/CommunityElements";
import { FaChevronDown } from "react-icons/fa";

export const ScrollButton = styled(Button)`
  outline: 2px solid #363636;
  transition: 260ms all;

  &:hover {
    background: #20c20e;
    outline-color: #545454;
    outline-offset: 2px;
  }
`;

export const JobIntroHeader = styled(Header)`
  height: 100vh;
`;

export const JobsDropdownIcon = styled(FaChevronDown)`
  margin: 2px 0 0 5px;
  font-size: 11px;
`;

export const JobSection = styled.section`
  margin: 100px 20px;
  color: #cecac3;
  position: relative;

  & button.view {
    background: rgba(32, 194, 14, 0.5);
    border-radius: 50%;
    cursor: pointer;
    outline: 2px solid #363636;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    bottom: -2em;
    left: 50%;
    transition: 260ms all;
  }

  & button.view:hover {
    background: rgba(32, 194, 14, 0.8);
    outline-color: #545454;
    outline-offset: 1px;
  }

  & div.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    height: ${({ viewMore }) => (viewMore ? "auto" : "100vh")};
    overflow: ${({ viewMore }) => (viewMore ? "auto" : "hidden")};
    padding: 0.2rem;
    margin: 10rem 0;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1024px) {
    & div.grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 768px) {
    & div.grid {
      grid-template-columns: 1fr;
    }
  }
`;

export const JobContainer = styled.div`
  background-color: rgba(32, 194, 14, 0.04);
  outline: 1px solid #2a2a2a;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  row-gap: 0.8rem;
  transition: 260ms all;

  &:hover {
    outline-color: #545454;
    outline-offset: 2px;
  }
`;

export const JobHero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;
export const JobHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  & span.status {
    color: orange;
  }
`;

export const JobTitle = styled.h2`
  background: linear-gradient(to right, #b1faa9, #f6dbaa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.3rem;
  font-weight: bolder;
  letter-spacing: 0.1rem;
`;

export const JobRole = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;
export const JobRoleTitle = styled.span`
  font-weight: 500;
  letter-spacing: 0.1rem;
`;

export const JobRating = styled.span`
  display: inline-flex;
  column-gap: 0.2rem;
  align-items: center;
  font-weight: bold;
`;

export const JobLocation = styled.div`
  & > span {
    font-weight: 300;
  }
`;

export const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  justify-content: start;

  & > div {
    background: #1a1c1d;
    outline: 1px solid #2a2a2a;
    border-radius: 3px;
    padding: 0.1rem 0.3rem;
    position: relative;
  }

  & span {
    display: inline-flex;
    column-gap: 0.3rem;
    align-items: center;
    font-weight: 300;
    letter-spacing: 0.1rem;
  }

  & div.badge {
    background: #20c20e;
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    outline: 2px solid #363636;
    outline-offset: 1px;
    padding: 8px;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    height: 0.8rem;
    width: 0.8rem;
    z-index: 1;
  }

  & div.badge span {
    font-size: smaller;
    font-weight: bolder;
  }
`;

export const JobReq = styled.div`
  padding: 0 1rem;

  & > ul {
    font-weight: 400;
    letter-spacing: 0.08rem;
    /* list-style-position: inside; */
  }

  & li::marker {
    color: #20c20e;
  }
`;

export const JobTimeline = styled(JobDetails)`
  color: #20c20e;
  column-gap: 0.4rem;
  font-size: 0.89rem;
  margin-top: auto;

  & span {
    letter-spacing: 0.08rem;
  }

  & span.dot {
    color: #fff;
    font-size: 0.2rem;
  }

  & span.remote {
    font-weight: 600;
  }
`;
