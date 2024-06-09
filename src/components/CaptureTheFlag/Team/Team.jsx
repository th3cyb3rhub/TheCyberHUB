import React, { useState } from "react";
import {
    // ButtonAddPlayer,
    CreateTeam,
    CreateTeamName,
    SearchAddPlayer,
    SearchPlayer,
    SearchPlayerContainer,
    SearchPlayerItem,
    SearchPlayerList,
    TeamMember,
    TeamMembers,
    TeamName,
} from "./TeamElements";
import { AiFillEdit } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { registeredUser, teams } from "src/components/CaptureTheFlag/CTFData";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";

const Team = () => {
    const [team, setTeam] = useState(teams[0]);
    const [editTeam, setEditTeam] = useState(false);
    const [teamName, setTeamName] = useState(team.teamName || "");
    const [teamMembersList, setTeamMembersList] = useState(team.teamMembers || []);
    const [searchResults, setSearchResults] = useState([]);
    const [isTeamEdit, setIsTeamEdit] = useState(true);

    const handleEditTeamName = () => {
        setEditTeam(!editTeam);
        setIsTeamEdit(false);
        setTeam(teams[0]);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleAddMember = (teamMember) => {
        if (
            teamMembersList.length < 2 &&
            teamMember.player !== "" &&
            !teamMembersList.some((member) => member.id === teamMember.id)
        ) {
            setTeamMembersList([
                ...teamMembersList,
                {
                    id: teamMember.id,
                    teamMember: teamMember.player,
                    isAccepted: teamMember.isAccepted || false,
                    isRegistered: teamMember.isRegistered || false,
                },
            ]);
            setSearchResults(searchResults.filter((member) => member.id !== teamMember.id));
        }
    };

    const handleRemoveMember = (teamMemberId) => {
        const updatedTeamMembers = teamMembersList.filter((member) => member.id !== teamMemberId);
        setTeamMembersList(updatedTeamMembers);
    };

    const handleSearchMember = (e) => {
        const searchQuery = e.target.value;
        const filteredMembers = registeredUser.filter(
            (member) =>
                member.player.toLowerCase().includes(searchQuery.toLowerCase()) &&
                member.isAccepted === false &&
                member.isRegistered === true &&
                !teamMembersList.some((teamMember) => teamMember.id === member.id),
        );
        setSearchResults(filteredMembers);
    };

    return (
        <Wrapper>
            <CreateTeam>
                <TeamName>
                    {editTeam ? (
                        <CreateTeamName
                            type="text"
                            placeholder="Team name"
                            value={teamName}
                            onChange={handleTeamNameChange}
                            readOnly={!teamName}
                        />
                    ) : (
                        teamName
                    )}
                    {isTeamEdit ? <AiFillEdit onClick={handleEditTeamName} /> : null}
                </TeamName>

                {editTeam && teamMembersList.length < 2 ? (
                    <SearchPlayerContainer>
                        <SearchAddPlayer>
                            <SearchPlayer type="text" placeholder="Search team members" onChange={handleSearchMember} />
                        </SearchAddPlayer>

                        <SearchPlayerList>
                            {searchResults.map((teamMember) => (
                                <SearchPlayerItem key={teamMember.id} onClick={() => handleAddMember(teamMember)}>
                                    {teamMember.player} -{!teamMember.isRegistered ? "Not Registered" : "Registered"} -
                                    {!teamMember.isAccepted ? "Not Accepted" : "Accepted"}
                                </SearchPlayerItem>
                            ))}
                        </SearchPlayerList>
                    </SearchPlayerContainer>
                ) : null}
            </CreateTeam>

            <TeamMembers>
                {teamMembersList.map((teamMember) => (
                    <TeamMember key={teamMember.id}>
                        {teamMember.teamMember} -{!teamMember.isRegistered ? "Not Registered" : "Registered"}
                        {!teamMember.isAccepted ? <BiTimeFive /> : <BsCheck />}
                        {editTeam ? <ImCross onClick={() => handleRemoveMember(teamMember.id)} /> : null}
                    </TeamMember>
                ))}
            </TeamMembers>
        </Wrapper>
    );
};

export default Team;
