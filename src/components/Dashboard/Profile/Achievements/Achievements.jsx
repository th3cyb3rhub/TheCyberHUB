import React from "react";
import {
    AchievementHeading,
    AchievementItem,
    AchievementLink,
    AchievementList,
    AchievementsContainer,
    IconDot,
} from "./AchievementsElements";

const Achievements = ({ achievements }) => {
    return (
        <AchievementsContainer>
            <AchievementHeading>Achievements</AchievementHeading>
            <AchievementList>
                <AchievementItem>
                    {achievements?.length > 0 &&
                        achievements[0]?.achievement?.map((title, titleIndex) => (
                            <AchievementLink
                                key={titleIndex}
                                href={
                                    title?.achievementLink.startsWith("http")
                                        ? title?.achievementLink
                                        : "https://" + title?.achievementLink
                                }
                                target="_blank"
                            >
                                <IconDot /> {title?.achievementName}
                            </AchievementLink>
                        ))}
                </AchievementItem>
            </AchievementList>
        </AchievementsContainer>
    );
};

export default Achievements;
