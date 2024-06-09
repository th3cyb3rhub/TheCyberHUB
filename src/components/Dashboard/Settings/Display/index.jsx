import React, { useState } from "react";
import {
    Section,
    TeamName,
    TeamNameContainer,
    TeamNameHeading,
    TeamNameInput,
    EditIcon,
    OwnerContainer,
    OwnerLabel,
    OwnerNames,
    OwnerNameContainer,
    SearchAndAdd,
    Group,
    Input,
    Icon,
    AddMemberButton,
    BtnTxt,
    MembersTable,
    TableHeader,
    TableRow,
    DeleteIcon,
    TeamOwner,
    AddOwnerButton,
    Form,
} from "./displayComponents.jsx";

export default function Login() {
    const [editing, setEditing] = useState(false);
    const [teamName, setTeamName] = useState("Change your Team Name");
    const [newTeamName, setNewTeamName] = useState("");
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showOwnerForm, setShowOwnerForm] = useState(false);
    const [newOwner, setNewOwner] = useState("");
    const [teamOwners, setTeamOwners] = useState([]);
    const [newMember, setNewMember] = useState({
        name: "",
        email: "",
        activity: "",
        role: "",
    });

    const handleAddOwner = (event) => {
        event.preventDefault();
        setTeamOwners([...teamOwners, newOwner]);
        setNewOwner("");
        setShowOwnerForm(false);
    };

    const handleOwnerInputChange = (event) => {
        setNewOwner(event.target.value);
    };

    const handleAddOwnerClick = () => {
        setShowOwnerForm(true);
    };

    const handleEdit = () => {
        setEditing(true);
        setNewTeamName(teamName);
    };

    const handleSave = () => {
        setEditing(false);
        setTeamName(newTeamName);
    };

    const handleChange = (e) => {
        setNewTeamName(e.target.value);
    };

    const handleAddMemberClick = () => {
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    const handleAddMember = (event) => {
        event.preventDefault();
        setMembers([...members, newMember]);
        setNewMember({ name: "", email: "", activity: "", role: "" });
        setShowForm(false);
    };

    const handleInputChange = (event) => {
        setNewMember({ ...newMember, [event.target.name]: event.target.value });
    };

    return (
        <Section>
            <TeamName>
                {editing ? (
                    <TeamNameInput type="text" value={newTeamName} onChange={handleChange} autoFocus />
                ) : (
                    <TeamNameContainer>
                        <TeamNameHeading>{teamName}</TeamNameHeading>
                        <EditIcon onClick={handleEdit} />
                    </TeamNameContainer>
                )}
                {editing && <button onClick={handleSave}>Save</button>}
            </TeamName>
            <OwnerContainer>
                <OwnerLabel>
                    <TeamOwner>Team Owner: </TeamOwner>
                    <AddOwnerButton onClick={handleAddOwnerClick}>+</AddOwnerButton>
                    {showOwnerForm && (
                        <Form onSubmit={handleAddOwner}>
                            <input
                                name="owner"
                                value={newOwner}
                                onChange={handleOwnerInputChange}
                                placeholder="Owner name"
                                required
                            />
                            <button type="submit">Add owner</button>
                        </Form>
                    )}
                </OwnerLabel>
                <OwnerNames>
                    {teamOwners.map((owner, index) => (
                        <OwnerNameContainer key={index}>{owner}</OwnerNameContainer>
                    ))}
                </OwnerNames>
            </OwnerContainer>
            <SearchAndAdd>
                <Group>
                    <Icon />
                    <Input placeholder="Search" type="search" />
                </Group>
                <AddMemberButton onClick={handleAddMemberClick} className="button type1">
                    <BtnTxt>+ Add Member</BtnTxt>
                </AddMemberButton>
                {showForm && (
                    <Form onSubmit={handleAddMember}>
                        <input
                            name="name"
                            value={newMember.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            required
                        />
                        <input
                            name="email"
                            value={newMember.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            name="activity"
                            value={newMember.activity}
                            onChange={handleInputChange}
                            placeholder="Activity"
                            required
                        />
                        <input
                            name="role"
                            value={newMember.role}
                            onChange={handleInputChange}
                            placeholder="Role"
                            required
                        />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </SearchAndAdd>
            <MembersTable>
                <thead>
                    <TableHeader>
                        <th>Member Name</th>
                        <th>Email</th>
                        <th>Last Activity</th>
                        <th>Role</th>
                        <th>Action</th>
                    </TableHeader>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <TableRow key={index}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.activity}</td>
                            <td>{member.role}</td>
                            <td>
                                <DeleteIcon onClick={() => handleDelete(index)} />
                            </td>
                        </TableRow>
                    ))}
                </tbody>
            </MembersTable>
        </Section>
    );
}
