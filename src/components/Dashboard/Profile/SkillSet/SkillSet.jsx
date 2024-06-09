import React from "react";
import { AchievementList } from "src/components/Dashboard/Profile/Achievements/AchievementsElements";
import { SkillName, SkillSetContainer, SkillSetListItem } from "./SkillSetElements";

const SkillSet = ({ skills }) => {
    return (
        <SkillSetContainer>
            <h3>Skills</h3>
            <AchievementList>
                <SkillSetListItem>
                    {skills?.length > 0 &&
                        skills[0]?.skill?.map((skill, index) => <SkillName key={index}>{skill?.skillName}</SkillName>)}
                </SkillSetListItem>
            </AchievementList>
        </SkillSetContainer>
    );
};

export default SkillSet;
