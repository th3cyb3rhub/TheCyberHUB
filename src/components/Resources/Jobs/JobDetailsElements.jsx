import styled from "styled-components";
import { DotSymbol } from "../../Homepage/Info/InfoElements";

export const JobDetailsContainer = styled.div`
    background-color: rgba(32, 194, 14, 0.04);
    width: 100%;
    margin: 10px;
    outline: 1px solid #2a2a2a;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 25px;
    row-gap: 0.8rem;
    transition: 260ms all;

    &:hover {
        outline-offset: 2px;
    }

    @media only screen and (max-width: 1000px) {
        margin: 0;
    }
`;

export const JobDetailsHero = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
`;

export const JobDetailsHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    & span.status {
        color: greenyellow;
    }
`;

export const JobDetailsTitle = styled.h2`
    color: orange;

    //background: linear-gradient(to right, #b1faa9, #f6dbaa);
    //background-clip: text;
    //-webkit-background-clip: text;
    //-webkit-text-fill-color: transparent;
    font-size: 18px;
    font-weight: bolder;
    letter-spacing: 0.1rem;
`;

export const JobDetailsRole = styled.div`
    display: flex;
    column-gap: 0.5rem;
`;

export const JobDetailsRoleTitle = styled.span`
    font-weight: 500;
    letter-spacing: 0.1rem;
`;

export const JobDetailsRating = styled.span`
    display: inline-flex;
    column-gap: 0.2rem;
    align-items: center;
    font-weight: bold;
`;

export const JobDetailsLocation = styled.div`
    & > span {
        font-weight: 300;
    }
`;

export const JobDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    gap: 10px;
    justify-content: start;

    & > div {
        background: #1a1c1d;
        outline: 1px solid #2a2a2a;
        border-radius: 3px;
        padding: 3px 7px;
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

export const ListIcon = styled(DotSymbol)`
    color: #20c20e;
    margin-bottom: 4px;
    margin-right: 4px;
    font-size: 0.5rem;
    display: inline;
    justify-content: center;
    text-align: center;
`;

export const JobDetailsReq = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ListContainer = styled.div`
    background: #0a0a0a;
    padding: 5px;
    padding-left: 10px;
`;
export const List = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const JobDescSection = styled.div`
    margin: 10px 0;
`;
export const ListContent = styled.p`
    margin: 5px;
    width: 100%;
    font-family: "Poppins", sans-serif;
    text-align: left;
    font-size: 15px;
    color: #f4f4f4;
`;

export const JobDetailsTimeline = styled(JobDetails)`
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
