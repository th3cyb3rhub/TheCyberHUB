import styled from "styled-components";

export const ResourcesListSection = styled.div`
    text-align: center;
    color: #cecac3;
    width: 27rem;
    margin: 150px auto;

    @media screen and (max-width: 600px) {
        width: 20rem;
    }
`;

export const Overlay = styled.div`
    width: 20em;
    height: 5em;
    position: absolute;
    //background: rgba(1, 6, 6, 0.8);
    //opacity: 0.7;
    margin: -5px 0 0 0;
`;

export const OverlayDetails = styled.div`
    font-size: 10px;
    color: #d2d2d2;
    border-radius: 3px;
    margin: 5px 5em;
    padding: 5px 5px;
    width: 8em;
    background: #1a1c1d;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgb(42, 42, 42);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const RoadmapContainer = styled.div`
    max-width: 65em;
    margin: 150px auto;
    display: flex;
    justify-content: center;
    //flex-wrap: wrap;
    flex-flow: row wrap;
    align-items: flex-start;
    text-align: center;
`;

export const RoadmapCard = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: start;
    text-align: start;

    width: 20em;
    height: 5em;
    background-color: #120e18;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }
`;

export const RoadmapHeading = styled.h4`
    color: #faf089;
    padding: 5px 20px 0 5px;
`;

export const RoadmapDesc = styled.p`
    padding: 5px 20px 0 5px;
    font-size: 12px;
    color: #ffffff;
`;

export const SectionHeading = styled.h1`
    margin: -50px auto 60px auto;
`;
export const SectionSubHeading = styled.h3`
    margin: 50px auto 70px auto;
`;
export const Heading = styled.h2`
    margin-top: 35px;
    text-align: center;
    color: #cecac3;

    @media screen and (max-width: 760px) {
        text-align: center;
    }
`;

export const List = styled.li`
    color: #cecac3;
`;

export const Link = styled.a`
    color: #cecac3;
    text-decoration-color: #d1913c;
    text-decoration-style: dashed;
`;

export const ListContent = styled.div`
    margin-top: 15px;
    text-align: start;
    color: #cecac3;
`;
