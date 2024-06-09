import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ContainerViewBlog, ViewBlogHeader } from "src/components/Blogs/ViewBlog/ViewBlogElements";
import { Wrapper } from "./ProfileElements";
import { Form, Input } from "./EditProfileElements";
import { updateUser } from "src/features/auth/authSlice";
import { webEnv } from "src/features/apiUrl";
import { CircleSpinner } from "react-spinners-kit";
import ComingSoon from "src/components/Other/MixComponents/ComingSoon";

const EditProfile = () => {
    if (webEnv === "production") {
        return <ComingSoon />;
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    const [profileData, setProfileData] = useState({
        name: "",
        username: "",
        email: "",
    });

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/");
        }
    }, [dispatch, isError, user, navigate, message]);

    if (isLoading) {
        return <CircleSpinner size={20} color={"#ff6b08"} />;
    }

    const onChange = (e) => {
        const value = e.target.value;

        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const updatedUserData = {
            name: profileData.name || user.name,
            // picture: file.name,
            username: profileData.username || user?.username,
            email: profileData.email || user.email,
        };

        if (profileData.name === "") delete updatedUserData.name;
        if (profileData.username === "") delete updatedUserData.username;
        if (profileData.email === "") delete updatedUserData.email;

        dispatch(updateUser({ id: user?._id, userData: updatedUserData }));
    };

    return (
        <Wrapper>
            <div>
                <ContainerViewBlog>
                    <ViewBlogHeader>
                        <Form onSubmit={onSubmit}>
                            <label htmlFor="title">Name</label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={profileData.name || user.name}
                                onChange={onChange}
                            />
                            <label htmlFor="title">Username</label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={profileData.username || user?.username}
                                onChange={onChange}
                            />
                            <label htmlFor="title">Email</label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                value={profileData.email || user.email}
                                onChange={onChange}
                            />
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Update Profile
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/profile")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    </ViewBlogHeader>
                </ContainerViewBlog>
            </div>
        </Wrapper>
    );
};

export default EditProfile;
