import React from "react";
import {
    AchievementHeading,
    AchievementItem,
    AchievementLink,
    AchievementList,
    AchievementsContainer,
    IconDot,
} from "../Achievements/AchievementsElements";

const UserProjects = ({ projects }) => {
    return (
        <AchievementsContainer>
            <AchievementHeading>Projects</AchievementHeading>
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
