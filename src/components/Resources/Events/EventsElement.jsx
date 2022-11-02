import styled from "styled-components";
import { Link } from "react-router-dom";

export const EventsContainer = styled.div`
    max-width: 1100px;
    margin: 100px auto;
    padding: 0 24px;
    display: flex;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    color: #cecac3;
`;

export const RouterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export const MainEventsContainer = styled.div`
    width: 70%;

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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: self-start;
    justify-content: start;
`;

export const UpComingEventsContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const EventsHeading = styled.h1`
    margin: 0 0 20px 0;
`;

export const EventsHeadingMedium = styled.h2`
    font-size: 1.4rem;
    margin: 0 0 10px 0;
`;

export const EventsHeadingSmall = styled.h3`
    margin: 0 0 10px 0;
`;
export const EventsSubHeading = styled.h4`
    margin: 5px 0 10px 0;
    color: #777777;
`;

export const EventsImage = styled.img`
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
    width: 30%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
        width: auto;
    }
`;
