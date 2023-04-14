import styled from "styled-components";

import { getCDNUrl } from "../../../../features/apiUrl";
const projectImage = `${getCDNUrl}/images/assets/images/projects-bg.png`;

const whiteColor = "whitesmoke";
// const greenColor = "#41e541";
export const ProjectsContainer = styled.div`
    color: ${whiteColor};
    text-align: center;
    margin: 100px auto;
    padding: 0 24px;
    width: 100%;
    max-width: 70em;
`;

export const Projects = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Project = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    height: 100%;
    opacity: 1.8;

    width: 21rem;
    background: #171717;
    max-width: 400px;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #262626;
    background-size: cover;
    // background: url(${projectImage}) center;

    transition: all 0.2s ease-in-out;
    background: linear-gradient(135deg, rgba(75, 75, 75, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

    &:hover {
        transform: scale(1.05);
        border-color: #545454;
    }
`;

export const ContainerHeading = styled.h1`
    margin: 20px 0 30px 0;
    padding: 10px 0;
    text-align: center;
`;
export const ProjectsTitleH1 = styled.h1`
    color: #4cc23e;
    margin: 10px 0;
    font-size: 1.8rem;
    font-weight: 600;
`;
export const ProjectsTitleH6 = styled.h1`
    font-size: 0.9rem;
    font-weight: 400;
`;

export const ProjectsContent = styled.div`
    padding: 0 2px;
    font-size: 1rem;
    text-align: center;
`;

export const ProjectsLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;

    &:hover {
        color: #c7c7c7;
        text-decoration: none;
    }
`;

export const ProjectsTags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 10px 0;
    padding: 10px 0;
`;

export const ProjectsTag = styled.div`
    margin: 0 5px;
    padding: 8px 10px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #545454;
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    transition: 260ms all;

    &:hover {
        transform: scale(1.05);
        border-color: #545454;
    }
`;

export const SpinnerDesign = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;
