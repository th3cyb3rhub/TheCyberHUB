import styled from "styled-components";
import { Link } from "react-router-dom";

export const EventsContainer = styled.div`
    max-width: 1500px;
    padding: 0 24px;
    display: flex;
    margin-top: 25px;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    color: #cecac3;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const RouterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export const MainEventsContainer = styled.div`
    width: 55%;
    margin-bottom: 25px;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const EventsVenue = styled.p`
    display: inline;
    margin-left: 5px;
    color: #2f80ed;
    text-align: center;
    text-decoration: none;
`;

export const EventsContent = styled.div`
    margin-bottom: 10px;
`;

export const EventLocation = styled.div`
    color: #777777;
    margin-bottom: 5px;
`;
export const OnGoingEventsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const UpComingEventsSection = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const UpComingEventsContainer = styled.div`
    display: grid;
    margin: 0 0 0 25px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;

export const EventsHeading = styled.h1`
    background: #0c0c0c;
    margin: 0 0 20px 0;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
`;

export const EventsHeadingMedium = styled.h2`
    font-size: 1.4rem;
    margin: 0 0 10px 0;
`;

export const EventsHeadingSmall = styled.h3`
    margin: 0 0 10px 0;
`;
export const EventsSubHeading = styled.div`
    margin: 5px 0 10px 0;
    color: #777777;
`;

export const EventsImage = styled.img`
    text-align: center;
    height: 100%;
    width: auto;
    margin-bottom: 10px;
`;

export const EventLink = styled.a`
    text-decoration: none;
    color: inherit;
`;

export const EventsHeader = styled.div``;
export const PastEventsContainer = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 25px;

    @media screen and (max-width: 768px) {
        width: auto;
    }
`;

export const EventComponent = styled.div`
    width: 80%;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    padding-top: 0;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
    color: #cecac3;

    * {
        margin: 10px auto;
    }
`;

export const EventHeaderImageContainer = styled.div`
    min-height: 200px;
    height: fit-content;
    position: relative;
    width: 100%;
    text-align: center;
    align-items: center;
`;

export const EventHeaderImage = styled.img`
    margin-top: 0;
    width: 100%;
    object-fit: contain;
    border-radius: 5px;
`;

export const EventVenue = styled.div`
    position: absolute;
    padding: 8px 20px;
    background-color: #eeeeee;
    color: #333333;
    right: 0;
    bottom: 0;
    white-space: nowrap;
`;

export const EventTitle = styled.h1``;

export const EventContent = styled.p`
    font-family: "Roboto Mono", monospace;
    text-align: left;
    padding: 0 50px 0 10px;
    white-space: pre-line;
    font-size: 20px;
`;
export const EventDate = styled.h3``;
