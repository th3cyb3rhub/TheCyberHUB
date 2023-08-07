import styled from "styled-components";

import { Button, Header } from "../../Other/Community/CommunityElements";
import { FaChevronDown } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const RouterLink = styled(Link)`
    text-decoration: none;
    transition: 0.3s ease-in-out;

    &:hover {
        transition: 0.3s ease-in-out;
        transform: scale(1.05);
    }
`;
export const ScrollButton = styled(Button)`
    outline: 2px solid #363636;
    transition: 260ms all;

    &:hover {
        background: #20c20e;
        outline-color: #545454;
        outline-offset: 2px;
    }

    & > span {
        &:hover {
            color: #1a1c1d;
        }

        @media only screen and (max-width: 800px) {
            font-size: 15px;
        }
    }
`;

export const JobSection = styled.section`
    color: #cecac3;
    max-width: 1500px;
    width: 100%;

    & div.grid {
        padding: 0.2rem;
        margin: 2rem auto;
        max-width: 100rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
`;

export const JobIntroHeader = styled(Header)`
    color: #cecac3;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 25px;
    height: 600px;
`;

export const JobsDropdownIcon = styled(FaChevronDown)`
    margin: 2px 0 0 5px;
    font-size: 11px;
`;

export const JobsDetailContainer = styled.div`
    margin-top: 55px;
    width: 100%;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

export const BackArrow = styled(IoMdArrowRoundBack)`
    background: linear-gradient(to right, #ffb933, #54f843);
    border-radius: 50%;
    color: #ffffff;
    padding: 5px;
    font-size: 30px;

    cursor: pointer;
    transition: 260ms all;

    &:hover {
        background: linear-gradient(to right, #ffb933, #54f843);
        outline-color: #545454;
        outline-offset: 2px;
        scale: 1.1;
    }

    @media only screen and (min-width: 1000px) {
        display: none;
    }
`;

export const JobsCardSection = styled.div`
    width: 100%;
    height: 100%;
    min-height: 500px;
    border-radius: 0.6rem;
    color: #d7d7d7;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 2fr));
    grid-gap: 25px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 5px;

    &.active {
        max-height: 1000px;
        //overflow-y: scroll;
    }

    @media only screen and (max-width: 1000px) {
        max-height: 800px;
    }
    @media only screen and (max-width: 400px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
    }
`;

export const JobsDetailSection = styled.div`
    padding: 5px;
    min-width: 60%;
    @media only screen and (max-width: 1000px) {
        min-width: 100%;
    }
`;

export const JobContainer = styled.div`
    background-color: rgba(32, 194, 14, 0.04);
    width: 100%;
    //max-width: 440px;
    //min-height: 450px;
    //margin: 10px;
    outline: 1px solid #2a2a2a;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
    padding: 15px 10px 10px 20px;
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
        color: greenyellow;
    }
`;

export const JobTitle = styled.h2`
    color: orange;
    //background: linear-gradient(to right, #b1faa9, #f6dbaa);
    //background-clip: text;
    //-webkit-background-clip: text;
    //-webkit-text-fill-color: transparent;
    font-size: 18px;
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
    font-size: 13px;
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
        font-size: 15px;
        font-weight: bolder;
    }
`;

export const JobReq = styled.div`
    font-size: 13px;
    margin: 15px 0;

    & > ul {
        font-weight: 400;
        letter-spacing: 0.08rem;
        /* list-style-position: inside; */
    }

    & li::marker {
        color: #20c20e;
    }
`;

export const JobDescSection = styled.div`
    margin-top: 10px;
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
