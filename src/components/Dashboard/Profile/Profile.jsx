import React, { useEffect } from "react";
import { ProfileContainer, UserImage, Wrapper } from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import { Link, useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import ComingSoon from "../../Other/MixComponents/ComingSoon";

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

    const API_URL = import.meta.env.VITE_CDN_URL;
    const profilePicture = user.picture;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";
    const profilePictureUrl = user.picture === "" ? dummyPicture : `${API_URL}/blog_images/${profilePicture}`;

    if (import.meta.env.VITE_WEB_ENV === "production") {
        return <ComingSoon />;
    }
    return (
        <Wrapper>
            <ProfileContainer>
                <section className="heading">
                    <h1>Welcome {user && user.name}</h1>
                </section>
                <Link style={{ color: "whitesmoke" }} to={"edit"}>
                    Edit profile
                </Link>
                <h1> Profile Details </h1>
                {isLoading && <CircleSpinner size={20} color={"#1fc10d"} />}
                Name: {user.name} <br />
                <UserImage src={profilePictureUrl} />
                Username: {user.username} <br />
                Email: {user.email} <br />
            </ProfileContainer>
        </Wrapper>
    );
};

export default Profile;
