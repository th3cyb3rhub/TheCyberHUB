import React from "react";
import OpensourceProjectsData from "./OpensourceProjectsData";
import {
    ProjectsContainer,
    ProjectsContent,
    ProjectsLink,
    ProjectsTags,
    ProjectsTag,
    ContainerHeading,
    ProjectsTitleH1,
    Projects,
    Project,
} from "./OpensourceProjectsElements";

const OpensourceProjects = () => {
    return (
        <ProjectsContainer>
            <ContainerHeading> Open Source Projects </ContainerHeading>
            <Projects>
                {OpensourceProjectsData.map((project, id) => (
                    <Project key={id}>
                        <ProjectsLink href={project.link} target={"_blank"}>
                            <ProjectsTitleH1>{project.title}</ProjectsTitleH1>
                            <ProjectsContent>
                                {project.content.slice(0, 200)}
                                {project.content.length > 200 ? "..." : ""}
                            </ProjectsContent>
                            <ProjectsTags>
                                {project.tags.map((tag, index) => (
                                    <ProjectsTag key={index}>{tag}</ProjectsTag>
                                ))}
                            </ProjectsTags>
                        </ProjectsLink>
                    </Project>
                ))}
            </Projects>
        </ProjectsContainer>
    );
};

export default OpensourceProjects;
