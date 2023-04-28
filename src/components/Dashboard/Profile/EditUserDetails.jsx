import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ContainerViewBlog, ViewBlogHeader } from "../../Blogs/ViewBlog/ViewBlogElements";
import { EditProfileContainer, Form, Input, Label } from "./EditProfileElements";
import { getUserDetail, updateUserDetail } from "../../../features/userDetail/userDetailSlice";
import { CircleSpinner } from "react-spinners-kit";

const EditUserDetails = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userDetail, isLoading, isError, message } = useSelector((state) => state.userDetail);

    const [profileData, setProfileData] = useState({
        name: "",
        username: "",
    });

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/");
        } else {
            dispatch(getUserDetail());
        }
    }, [dispatch, isError, user, navigate, message]);

    if (isLoading) {
        return <CircleSpinner size={20} color={"#1fc10d"} />;
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
            name: profileData.name || userDetail.name,
            username: profileData.username || userDetail.username,
        };

        if (profileData.name === "") delete updatedUserData.name;
        if (profileData.username === "") delete updatedUserData.username;
        console.log(updatedUserData);

        dispatch(updateUserDetail({ id: user._id, userData: updatedUserData }));
    };

    return (
        <EditProfileContainer>
            <ContainerViewBlog>
                <ViewBlogHeader>
                    <Form onSubmit={onSubmit}>
                        <Label htmlFor="title">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={profileData.name || userDetail.name}
                            onChange={onChange}
                        />
                        <Label htmlFor="title">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            value={profileData.username || userDetail.username}
                            onChange={onChange}
                        />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Update Profile
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/profile")}>
                                Cancel
                            </button>
                        </div>
                    </Form>
                </ViewBlogHeader>
            </ContainerViewBlog>
        </EditProfileContainer>
    );
};

export default EditUserDetails;
