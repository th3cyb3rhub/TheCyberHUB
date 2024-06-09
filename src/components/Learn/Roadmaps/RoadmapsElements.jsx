import styled from "styled-components";

export const ResourcesListSection = styled.div`
    text-align: center;
    color: #cecac3;
    width: 27rem;
    margin: 150px auto;
`;

export const Overlay = styled.div`
    width: 20em;
    height: 5em;
    position: absolute;

    /* background: rgb(1 6 6 / 80%);
    opacity: 0.7; */
    margin: -5px 0 0;
`;

export const OverlayDetails = styled.div`
    font-size: 10px;
    color: #d2d2d2;
    border-radius: 3px;
    margin: 5px 5em;
    padding: 5px;
    width: 8em;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(135deg, rgb(0 0 0 / 10%), rgb(255 255 255 / 0%));
    backdrop-filter: blur(10px);
    border: 1px solid rgb(42 42 42);
    box-shadow: 0 8px 32px 0 rgb(0 0 0 / 37%);
`;

export const RoadmapsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1350px;
    width: 100%;
    gap: 25px;
`;

export const RoadmapCardsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const RoadmapCard = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    text-align: start;
    width: 100%;
    max-width: 400px;
    height: auto;
    background-color: #101010;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    @media screen and (width <= 768px) {
        max-width: 90%;
    }

    &:hover {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }
`;

export const RoadmapHeading = styled.h3`
    padding: 5px 20px 0 5px;
`;

export const RoadmapDesc = styled.p`
    padding: 5px 20px 0 5px;
    font-size: 15px;
    color: #fff;
`;

export const SectionHeading = styled.h1`
    margin: -50px auto 60px;
`;
export const SectionSubHeading = styled.h3`
    margin: 50px auto 70px;
`;
export const Heading = styled.h2`
    margin-top: 35px;
    text-align: center;
    color: #cecac3;

    @media screen and (width <= 760px) {
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
