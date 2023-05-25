import React, { useEffect, useState } from "react";
import {
    AchievementHeading,
    AchievementItem,
    AchievementLink,
    AchievementList,
    AchievementsContainer,
    AddButtonSection,
    EditTitle,
} from "../Achievements/AchievementsElements";
import { IconAdd, RemoveButton } from "../SkillSet/SkillSetElements";

const Achievements = ({ achievements, setUserDetailData }) => {
    const [updatedAchievements, setUpdatedAchievements] = useState(achievements || []);

    const handleTitleChange = (titleIndex, value) => {
        const updatedTitles = [...updatedAchievements[0].achievement];
        updatedTitles[titleIndex].achievementName = value;
        setUpdatedAchievements([{ ...updatedAchievements[0], achievement: updatedTitles }]);
    };

    const handleLinkChange = (titleIndex, value) => {
        const updatedTitles = [...updatedAchievements[0].achievement];
        updatedTitles[titleIndex].achievementLink = value;
        setUpdatedAchievements([{ ...updatedAchievements[0], achievement: updatedTitles }]);
    };

    const handleAddTitle = () => {
        if (updatedAchievements.length === 0) {
            setUpdatedAchievements([{ achievement: [] }]);
        } else {
            const updatedTitles = [...updatedAchievements[0].achievement];
            updatedTitles.push({
                achievementName: "",
                achievementLink: "",
            });
            setUpdatedAchievements([{ ...updatedAchievements[0], achievement: updatedTitles }]);
        }
    };

    const handleRemoveTitle = (titleIndex) => {
        const updatedTitles = [...updatedAchievements[0].achievement];
        updatedTitles.splice(titleIndex, 1);
        setUpdatedAchievements([{ ...updatedAchievements[0], achievement: updatedTitles }]);
    };

    useEffect(() => {
        setUserDetailData((prevState) => ({
            ...prevState,
            achievements: updatedAchievements,
        }));
    }, [updatedAchievements]);

    return (
        <AchievementsContainer>
            <AchievementHeading>Achievements</AchievementHeading>
            <AchievementList>
                <AchievementItem>
                    {updatedAchievements?.length > 0 &&
                        updatedAchievements[0]?.achievement?.map((title, titleIndex) => (
                            <AchievementLink key={titleIndex}>
                                <EditTitle
                                    type="text"
                                    value={title.achievementName}
                                    placeholder={"Award // Talks // Bug Bounty // etc"}
                                    onChange={(e) => handleTitleChange(titleIndex, e.target.value)}
                                />
                                <EditTitle
                                    type="text"
                                    value={title.achievementLink}
                                    placeholder={"https://example.com"}
                                    onChange={(e) => handleLinkChange(titleIndex, e.target.value)}
                                />
                                <RemoveButton onClick={() => handleRemoveTitle(titleIndex)}>
                                    <RemoveButton /> x
                                </RemoveButton>
                            </AchievementLink>
                        ))}
                    {updatedAchievements?.length >= 0 && (
                        <AddButtonSection onClick={handleAddTitle}>
                            <IconAdd /> Add Title
                        </AddButtonSection>
                    )}
                </AchievementItem>
            </AchievementList>
        </AchievementsContainer>
    );
};

export default Achievements;
