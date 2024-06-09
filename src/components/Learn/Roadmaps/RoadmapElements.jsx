import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { BiCircle } from "react-icons/bi";

export const RoadmapContainer = styled.div`
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    color: #d9d9d9;
    width: 100%;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    gap: 25px;
`;

export const DotIcon = styled(BsDot)`
    margin: 3.5px 5px 0 0;
    font-size: 20px;
    color: #d9d9d9;
`;
export const CircleIcon = styled(BiCircle)`
    margin: 10px 10px 0 0;
    font-size: 6px;
`;
export const HrLine = styled.hr`
    /* width: 100%; */
    color: #2a2a2a;
`;

export const RoadmapHeadingSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    width: 100%;
`;
export const RoadmapHeading = styled.h1`
    font-family: "Fira Code", monospace;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #d9d9d9;
    background: #090909;
    font-size: 50px;
    padding: 25px 0;

    /* background: #090909; */
    width: 100%;
    border-radius: 5px;

    @media screen and (width <= 720px) {
        font-size: 30px;
    }

    @media screen and (width <= 480px) {
        padding: 50px 15px;
    }
`;
export const RoadmapDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #d9d9d9;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    padding: 25px;
    gap: 25px;
`;

export const RoadmapDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #d9d9d9;
    background: #090909;
    width: 100%;
    border-radius: 5px;
    padding: 15px 25px;
    gap: 5px;
`;

export const RoadmapContentHeading = styled.p`
    font-family: "Fira Code", monospace;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    align-items: center;
    color: #c7c7c7;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    background: #121212;
    margin: 5px;
    padding: 0 15px;
    width: 100%;
    border-radius: 10px;

    &:hover {
        color: #00b2ff;
        transition: all 0.3s ease-in-out;
        scale: 1.02;
        background: #222;
    }

    @media screen and (width <= 500px) {
        font-size: 17px;
    }
`;

export const RoadmapDetailsCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    align-items: center;
    width: 100%;
    gap: 10px;

    /* width: 30em;
    text-decoration: none;
    background: #0a0a0a;
    border: #383838 1px solid;
    border-radius: 3px;
    display: flex;
    margin: 0 0 5px 0;
    padding: 5px 15px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    
    &:hover {
        scale: 1.05;
        border: #faf089 1px solid;
        color: #faf089;
        transition: all 0.3s ease-in-out;
    }
    
    @media screen and (max-width: 600px) {
        width: 25em;
    }
    @media screen and (max-width: 500px) {
        width: 20em;
    }
    @media screen and (max-width: 350px) {
        width: 100%;
    } */
`;

export const RoadmapSectionHeading = styled.h2`
    font-family: "Fira Code", monospace;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    color: #ff6b08;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 0.1rem;
    margin: 0 0 25px;

    @media screen and (width <= 500px) {
        font-size: 17px;
    }
`;

export const RoadmapDesc = styled.p`
    margin: 0 0 30px;
`;

export const RoadmapsFooter = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    background: #151515;
`;

export const RoadmapsContainer = styled.div`
    max-width: 65em;
    width: 100%;
    color: white;
    background: #0a0a0a;
    padding: 0 50px;
    padding-bottom: 20px;
    margin: 50px 0;
    display: inline;

    @media screen and (width <= 768px) {
        width: 100%;
        padding: 0 10px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const RelatedRoadmaps = styled.button`
    width: auto;
    background: #0a0a0a;
    border: #343434 1px solid;
    border-radius: 3px;
    display: flex;
    margin: -15px 0 20px;
    padding: 10px 15px;
    color: #ececec;
`;

export const AllRoadmaps = styled(RelatedRoadmaps)`
    cursor: pointer;

    &:hover {
        scale: 1.1;
        transition: all 0.3s ease-in-out;
    }
`;

export const RoadmapInlineCard = styled.div`
    text-decoration: none;
    background: #0a0a0a;
    border: #383838 1px solid;
    border-radius: 3px;
    display: flex;
    margin: 7px 0 5px;
    padding: 5px 15px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        scale: 1.02;
        color: #faf089;
        transition: all 0.3s ease-in-out;
    }
`;

export const RouterLink = styled(Link)`
    text-decoration: none;
`;

export const RedirectLink = styled.a`
    /* buttom margin 5x for undeline */
    width: 100%;
`;

export const RoadmapsHeading = styled.p`
    width: 40%;
    min-width: 20px;
    color: #00b2ff;
    font-size: 18px;
`;

export const RoadmapsDesc = styled.p`
    width: 60%;
    color: #d9d9d9;
    font-size: 16px;
`;
