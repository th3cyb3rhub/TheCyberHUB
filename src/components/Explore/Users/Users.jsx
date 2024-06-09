import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import {
    Header,
    IconVerified,
    Name,
    UserContainer,
    UserDetail,
    Username,
    UserPicture,
    UsersContainer,
} from "./UsersElements";
import { RouteLink } from "src/components/Common/GeneralDashboardSidebar/GeneralDashboardSidebarElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import NotFound from "src/NotFound";
import { LeftSection } from "src/components/Feeds/FeedPosts/FeedPostsElements";

const Users = ({ userDetails, searchTerm, isUserDetailLoading }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // if (isError) {
        //     console.log(message);
        // }

        dispatch(getAllUserDetails());

        return () => dispatch(userDetailReset());
    }, [dispatch]);

    if (isUserDetailLoading) return <LoadingSpinner />;
    if (!userDetails.length)
        return <NotFound title="User Detailes Not Found" description="There are no user details" />;
    // based on name or username
    const filteredUsers = userDetails?.filter(
        (user) =>
            user?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            user?.username?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );
    const displayedUsers = searchTerm.length === 0 ? filteredUsers.slice(0, 10) : filteredUsers;

    const avatar = ({ user }) => {
        return cdnContentImagesUrl("/user/" + (user?.avatar || "avatarDummy.png"));
    };

    return filteredUsers.length > 0 ? (
        <UsersContainer>
            {displayedUsers?.map((user, id) => (
                <RouteLink to={`/user/${user.username}`} key={user.username}>
                    <UserContainer>
                        <UserPicture src={avatar(user)} />
                        <UserDetail>
                            <Header>
                                <Name>{user.name}</Name>
                                <LeftSection
                                    style={{
                                        alignItems: "center",
                                    }}
                                >
                                    <Username>@{user.username}</Username>
                                    {user?.verified && (
                                        <IconVerified
                                            style={{
                                                fontSize: "1rem",
                                            }}
                                        />
                                    )}
                                </LeftSection>
                            </Header>
                            <p>{user.bio}</p>
                        </UserDetail>
                    </UserContainer>
                </RouteLink>
            ))}
        </UsersContainer>
    ) : null;
};

export default Users;
