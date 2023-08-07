import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUserDetails, reset } from "../../../features/userDetail/userDetailSlice";
import {
    Header,
    IconVerified,
    Name,
    UserBio,
    UserContainer,
    UserDetail,
    Username,
    UserPicture,
    UsersContainer,
} from "./UsersElements";
const Users = ({ userDetails, searchTerm }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // if (isError) {
        //     console.log(message);
        // }

        dispatch(getAllUserDetails());

        return () => dispatch(reset());
    }, [dispatch]);

    // based on name or username
    const filteredUsers = userDetails?.filter(
        (user) =>
            user?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            user?.username?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );
    const displayedUsers = searchTerm.length === 0 ? filteredUsers.slice(0, 3) : filteredUsers;

    return filteredUsers.length > 0 ? (
        <UsersContainer>
            {displayedUsers?.map((user) => (
                <UserContainer key={user.username}>
                    <UserPicture src={"https://avatars.githubusercontent.com/u/44284877?v=4"} />
                    <UserDetail>
                        <Header>
                            <Name>{user.name}</Name>
                            <Username>@{user.username}</Username>
                            <IconVerified />
                        </Header>
                        <UserBio>{user.bio}</UserBio>
                    </UserDetail>
                </UserContainer>
            ))}
        </UsersContainer>
    ) : null;
};

export default Users;
