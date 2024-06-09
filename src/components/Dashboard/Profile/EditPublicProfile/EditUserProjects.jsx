import React, { useEffect, useState } from "react";
import {
    AchievementItem,
    AchievementLink,
    AchievementList,
    AchievementsContainer,
    AddButtonSection,
    EditTitle,
} from "src/components/Dashboard/Profile/Achievements/AchievementsElements";
import { IconAdd, RemoveButton } from "src/components/Dashboard/Profile/SkillSet/SkillSetElements";

const UserProjects = ({ projects, setUserDetailData }) => {
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
            <h3>Projects</h3>
            <AchievementList>
                <AchievementItem>
                    {updatedProjects?.length > 0 &&
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
                    {updatedProjects?.length >= 0 && (
                        <AddButtonSection onClick={handleAddTitle}>
                            <IconAdd /> Add Title
                        </AddButtonSection>
                    )}
                </AchievementItem>
            </AchievementList>
        </AchievementsContainer>
    );
};

export default UserProjects;
