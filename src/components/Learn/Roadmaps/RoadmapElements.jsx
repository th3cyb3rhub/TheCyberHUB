import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsDot, BiCircle } from "react-icons/all";

export const RoadmapContainer = styled.div`
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    color: #d9d9d9;
    width: 100%;
    justify-content: center;
    align-items: center;
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
    //width: 100%;
    color: #2a2a2a;
`;

export const RoadmapDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #d9d9d9;
    justify-content: center;
`;

export const RoadmapDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #d9d9d9;
    margin: 15px 0;
    border: 1px solid #ff0000;
`;

export const RoadmapContentHeading = styled.p`
    display: flex;
    justify-content: flex-start;
    text-align: left;
    align-items: start;
    margin: 5px auto;
    margin-left: 50px;
    min-width: 20px;
    width: auto;
    color: #d9d9d9;
    font-size: 18px;
`;

export const RoadmapDetailsCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    align-items: start;
    width: 100%;

    //width: 30em;
    //text-decoration: none;
    //background: #0a0a0a;
    //border: #383838 1px solid;
    //border-radius: 3px;
    //display: flex;
    //margin: 0 0 5px 0;
    //padding: 5px 15px;
    //transition: all 0.3s ease-in-out;
    //cursor: pointer;
    //
    //&:hover {
    //    scale: 1.05;
    //    border: #faf089 1px solid;
    //    color: #faf089;
    //    transition: all 0.3s ease-in-out;
    //}
    //
    //@media screen and (max-width: 600px) {
    //    width: 25em;
    //}
    //@media screen and (max-width: 500px) {
    //    width: 20em;
    //}
    //@media screen and (max-width: 350px) {
    //    width: 100%;
    //}
`;

export const RoadmapSectionHeading = styled.h3`
    display: flex;
    justify-content: flex-start;
    text-align: left;
    //align-items: self-start;

    color: #d9d9d9;
    //width: 100%;
    width: auto;
    margin: 15px auto;
    font-weight: 500;
    letter-spacing: 0.1rem;
`;

export const RoadmapDesc = styled.p`
    margin: 0 0 30px 0;
`;

export const RoadmapsFooter = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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

    @media screen and (max-width: 768px) {
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
    margin: -15px 0 20px 0;
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
    margin: 7px 0 5px 0;
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
    text-decoration: dashed underline #faf089;
`;

export const RoadmapsHeading = styled.p`
    width: 40%;
    min-width: 20px;
    color: greenyellow;
    font-size: 18px;
`;

export const RoadmapsDesc = styled.p`
    width: 60%;
    color: #d9d9d9;
    font-size: 16px;
`;
