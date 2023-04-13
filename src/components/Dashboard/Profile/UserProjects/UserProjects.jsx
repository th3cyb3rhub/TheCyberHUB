import React, { useEffect, useState } from "react";
import {
    AchievementHeading,
    AchievementItem,
    AchievementLink,
    AchievementList,
    AchievementsContainer,
    AddButtonSection,
    EditTitle,
    IconDot,
} from "../Achievements/AchievementsElements";
import { IconAdd, RemoveButton } from "../SkillSet/SkillSetElements";

const UserProjects = ({ projects, setUserDetailData, isEdit }) => {
    const [updatedProjects, setUpdatedProjects] = useState(projects || []);

    const handleTitleChange = (titleIndex, value) => {
        const updatedTitles = [...updatedProjects[0].project];
        updatedTitles[titleIndex].projectName = value;
        setUpdatedProjects([{ ...updatedProjects[0], project: updatedTitles }]);
    };

    const handleLinkChange = (titleIndex, value) => {
        const updatedTitles = [...updatedProjects[0].project];
        updatedTitles[titleIndex].projectLink = value;
        setUpdatedProjects([{ ...updatedProjects[0], project: updatedTitles }]);
    };

    const handleAddTitle = () => {
        if (updatedProjects.length === 0) {
            setUpdatedProjects([{ project: [] }]);
        } else {
            const updatedTitles = [...updatedProjects[0].project];
            updatedTitles.push({
                projectName: "",
                projectLink: "",
            });
            setUpdatedProjects([{ ...updatedProjects[0], project: updatedTitles }]);
        }
    };

    const handleRemoveTitle = (titleIndex) => {
        const updatedTitles = [...updatedProjects[0].project];
        updatedTitles.splice(titleIndex, 1);
        setUpdatedProjects([{ ...updatedProjects[0], project: updatedTitles }]);
    };

    useEffect(() => {
        setUserDetailData((prevState) => ({
            ...prevState,
            projects: updatedProjects,
        }));
    }, [updatedProjects]);

    return (
        <AchievementsContainer>
            <AchievementHeading>Projects</AchievementHeading>
            <AchievementList>
                <AchievementItem>
                    {isEdit &&
                        updatedProjects?.length > 0 &&
                        updatedProjects[0]?.project?.map((title, titleIndex) => (
                            <AchievementLink key={titleIndex}>
                                <EditTitle
                                    type="text"
                                    value={title.projectName}
                                    placeholder={"Project Title"}
                                    onChange={(e) => handleTitleChange(titleIndex, e.target.value)}
                                />
                                <EditTitle
                                    type="text"
                                    value={title.projectLink}
                                    placeholder={"Project Link"}
                                    onChange={(e) => handleLinkChange(titleIndex, e.target.value)}
                                />
                                <RemoveButton onClick={() => handleRemoveTitle(titleIndex)}>
                                    <RemoveButton /> x
                                </RemoveButton>
                            </AchievementLink>
                        ))}
                    {isEdit && updatedProjects?.length >= 0 && (
                        <AddButtonSection onClick={handleAddTitle}>
                            <IconAdd /> Add Title
                        </AddButtonSection>
                    )}

                    {!isEdit &&
                        projects?.length > 0 &&
                        projects[0]?.project?.map((title, titleIndex) => (
                            <AchievementLink
                                key={titleIndex}
                                href={
                                    title?.projectLink.startsWith("http")
                                        ? title?.projectLink
                                        : "https://" + title?.projectLink
                                }
                                target="_blank"
                            >
                                <IconDot /> {title?.projectName}
                            </AchievementLink>
                        ))}
                </AchievementItem>
            </AchievementList>
        </AchievementsContainer>
    );
};

export default UserProjects;
