import React from "react";
import Team from "src/components/CaptureTheFlag/Team/Team";
import TeamChat from "src/components/CaptureTheFlag/Team/TeamChat";

const CtfTeam = ({ teams, isTeamEdit }) => {
    return (
        <div>
            <Team team={teams[0]} isTeamEdit={isTeamEdit} />
            <TeamChat team={teams[0]} isTeamEdit={isTeamEdit} />
        </div>
    );
};

export default CtfTeam;
