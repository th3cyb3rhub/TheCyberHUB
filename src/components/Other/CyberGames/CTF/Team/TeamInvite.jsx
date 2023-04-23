import React from "react";
import { ButtonResponse, TeamInviteContainer, TeamRequest, TeamRequests } from "./TeamInviteElements";
import {
    // TeamMember,
    TeamMembers,
    // TeamName
} from "./TeamElements";

const TeamInvite = ({ user, challengeName }) => {
    const CTF = user.CTF.find((challenge) => challenge.challengeName === challengeName);
    const teamRequests = CTF.teamRequests;

    return (
        <TeamInviteContainer>
            Team Invites
            <TeamRequests>
                {teamRequests.map((team, id) => (
                    <TeamRequest key={id}>
                        <p>Team: {team.teamName}</p>
                        <TeamMembers>
                            {team.teamMembers.map((teamMember) => (
                                <p key={teamMember.id}>{teamMember.teamMember}</p>
                            ))}
                        </TeamMembers>
                        <p>InviteBy: {team.InviteBy}</p>
                        <ButtonResponse>Accept</ButtonResponse>
                        <ButtonResponse>Decline</ButtonResponse>
                    </TeamRequest>
                ))}
            </TeamRequests>
        </TeamInviteContainer>
    );
};

export default TeamInvite;
