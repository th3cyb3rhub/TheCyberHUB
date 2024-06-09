import React from "react";
import {
    AchievementItem,
    AchievementLink,
    AchievementList,
    AchievementsContainer,
    IconDot,
} from "src/components/Dashboard/Profile/Achievements/AchievementsElements";

const UserProjects = ({ projects }) => {
    return (
        <AchievementsContainer>
            <h3>Projects</h3>
            <AchievementList>
                <AchievementItem>
                    {projects?.length > 0 &&
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
