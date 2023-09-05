import React from "react";
import Team from "../Team/Team";
import TeamChat from "../Team/TeamChat";

const CtfTeam = ({ teams, isTeamEdit }) => {
    return (
        <div>
            <Team team={teams[0]} isTeamEdit={isTeamEdit} />
            <TeamChat team={teams[0]} isTeamEdit={isTeamEdit} />
        </div>
    );
};

export default CtfTeam;
