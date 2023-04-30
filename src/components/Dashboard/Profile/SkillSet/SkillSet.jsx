import React, { useEffect, useState } from "react";
import {
    AchievementHeading,
    AchievementLink,
    AchievementList,
    AddButtonSection,
} from "../Achievements/AchievementsElements";
import {
    AddSkillInput,
    IconAdd,
    RemoveButton,
    SkillName,
    SkillSetContainer,
    SkillSetListItem,
} from "./SkillSetElements";

const SkillSet = ({ skills, setUserDetailData, isEdit }) => {
    const [updatedSkills, setUpdatedSkills] = useState(skills || []);

    const handleTitleChange = (titleIndex, value) => {
        const updatedTitles = [...updatedSkills[0].skill];
        updatedTitles[titleIndex].skillName = value;
        setUpdatedSkills([{ ...updatedSkills[0], skill: updatedTitles }]);
    };

    const handleAddTitle = () => {
        if (updatedSkills.length === 0) {
            setUpdatedSkills([{ skill: [] }]);
        } else {
            const updatedTitles = [...updatedSkills[0].skill];
            updatedTitles.push({
                skillName: "",
                skillLink: "",
            });
            setUpdatedSkills([{ ...updatedSkills[0], skill: updatedTitles }]);
        }
    };

    const handleRemoveTitle = (titleIndex) => {
        const updatedTitles = [...updatedSkills[0].skill];
        updatedTitles.splice(titleIndex, 1);
        setUpdatedSkills([{ ...updatedSkills[0], skill: updatedTitles }]);
    };

    useEffect(() => {
        setUserDetailData((prevState) => ({
            ...prevState,
            skills: updatedSkills,
        }));
    }, [updatedSkills]);

    return (
        <SkillSetContainer>
            <AchievementHeading>Skills</AchievementHeading>
            <AchievementList>
                <SkillSetListItem>
                    {!isEdit &&
                        skills?.length > 0 &&
                        skills[0]?.skill?.map((skill, index) => <SkillName key={index}>{skill?.skillName}</SkillName>)}
                    {isEdit &&
                        updatedSkills?.length >= 0 &&
                        updatedSkills[0]?.skill?.map((title, titleIndex) => (
                            <AchievementLink key={titleIndex}>
                                <AddSkillInput
                                    type="text"
                                    value={title.skillName}
                                    placeholder={"Add a Skill"}
                                    onChange={(e) => handleTitleChange(titleIndex, e.target.value)}
                                />
                                <RemoveButton onClick={() => handleRemoveTitle(titleIndex)}>
                                    <RemoveButton />
                                </RemoveButton>
                            </AchievementLink>
                        ))}
                    {isEdit && updatedSkills.length >= 0 && (
                        <AddButtonSection onClick={handleAddTitle}>
                            <IconAdd />
                        </AddButtonSection>
                    )}
                </SkillSetListItem>
            </AchievementList>
        </SkillSetContainer>
    );
};

export default SkillSet;
