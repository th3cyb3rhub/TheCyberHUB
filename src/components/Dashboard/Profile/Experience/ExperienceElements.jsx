import styled from "styled-components";

export const ExperienceContainer = styled.div`
    margin: 2rem 0;
`;

export const ExperienceHeading = styled.h2`
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
`;

export const ExperienceList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const ExperienceItem = styled.li`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ExperienceCompany = styled.h3`
    font-size: 1.5rem;
    flex-basis: 30%;
`;

export const ExperiencePosition = styled.h4`
    font-size: 1.2rem;
    color: #777;
    flex-basis: 25%;
`;

export const ExperienceDuration = styled.p`
    font-size: 1.2rem;
    color: #777;
    flex-basis: 15%;
`;

export const ExperienceDescription = styled.p`
    font-size: 1.2rem;
    color: #777;
    flex-basis: 30%;
`;

export const ExperienceLinks = styled.div`
    display: flex;
    flex-basis: 10%;
`;

export const ExperienceLink = styled.a`
    color: #777;
    font-size: 1.2rem;
    margin-right: 1rem;
`;
