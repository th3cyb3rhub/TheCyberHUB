import React, { useEffect } from "react";
import {
    HeaderContainer,
    HeaderSection,
    ProfileContainer,
    ProfileDetailsSection,
    ProfileUserDetailsContainer,
    UserBanner,
    UserImage,
    UserInfo,
    Wrapper,
} from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import { Link, useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import ComingSoon from "../../Other/MixComponents/ComingSoon";
import { getCDNUrl, webEnv } from "../../../features/apiUrl";
import { BsFillGearFill } from "react-icons/bs";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.userDetails);

    useEffect(() => {
        if (user && isError) console.log(message);
        if (!user) navigate("/");
        else dispatch(getUserDetails());
        return () => dispatch(reset());
    }, [isError, message, dispatch, user, navigate]);

    const API_URL = getCDNUrl;
    const profilePicture = user?.picture;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";
    const profilePictureUrl = user?.picture === "" ? dummyPicture : `${API_URL}/blog_images/${profilePicture}`;

    if (webEnv !== "production") {
        return <ComingSoon />;
    }
    console.log(user?.picture);
    return (
        <Wrapper>
            <ProfileContainer>
                <HeaderContainer>
                    <HeaderSection className="heading">
                        <Link
                            style={{
                                color: "whitesmoke",
                                display: "flex",
                                flex: 1,
                                justifyContent: "flex-end",
                                marginRight: 10,
                            }}
                            to={"edit"}
                        >
                            <BsFillGearFill style={{ zIndex: 2 }} size={25} />
                        </Link>
                    </HeaderSection>

                    {/* Change background image to working user's image - using static images */}
                    <UserBanner
                        src={
                            "https://thecyberhub.nyc3.cdn.digitaloceanspaces.com/assets/images/Registeration/CybersecurityRegPage.png"
                        }
                    />
                    <UserImage src={user?.picture || profilePictureUrl} />
                </HeaderContainer>
                <ProfileDetailsSection>
                    <ProfileUserDetailsContainer>
                        <h3
                            style={{
                                marginInline: "2%",
                            }}
                        >
                            Profile Details
                        </h3>
                        {isLoading && <CircleSpinner size={20} color={"#1fc10d"} />}

                        <UserInfo>
                            <h5>Name: {user?.name}</h5>
                            <h5>Email: {user?.email}</h5>
                            <h5>Username: {user?.username}</h5> <br />
                        </UserInfo>
                    </ProfileUserDetailsContainer>
                </ProfileDetailsSection>
            </ProfileContainer>
        </Wrapper>
    );
};

export default Profile;
