import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ContainerViewBlog, ViewBlogHeader } from "../../Blogs/ViewBlog/ViewBlogElements";
import { UserImage, Wrapper } from "./ProfileElements";
import { EditProfileContainer, Form, Input, Label } from "./EditProfileElements";
import { updateUser } from "../../../features/auth/authSlice";
import { AddImage } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import axios from "axios";
import { getUserDetails } from "../../../features/userDetails/userDetailSlice";
import { getApiUrl, getCDNUrl, webEnv } from "../../../features/apiUrl";
import { CircleSpinner } from "react-spinners-kit";
import ComingSoon from "../../Other/MixComponents/ComingSoon";

const EditProfile = () => {
    if (webEnv === "production") {
        return <ComingSoon />;
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    const [profileData, setProfileData] = useState({
        name: "",
        // picture: "",
        username: "",
        email: "",
    });

    // const {name, username, email} = profileData

    let setFilename = "";
    if (profileData.username === "") {
        setFilename = user.username;
    } else setFilename = profileData.username;

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/");
        } else {
            dispatch(getUserDetails());
        }
    }, [dispatch, isError, user, navigate, message]);

    if (isLoading) {
        return <CircleSpinner size={20} color={"#1fc10d"} />;
    }

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const onChange = (e) => {
        const value = e.target.value;

        if (file) {
            if (e.target.name === "username") {
                const newFile = new File(
                    [file],
                    `${
                        value &&
                        value
                            .toLowerCase()
                            .replace(/ +/g, "_")
                            .replace(/[^a-zA-Z0-9]/g, "_")
                            .replace(/_+/g, "_")
                    }_ProfilePicture.${file && file.type.split("/")[1]}`,
                    { type: file && file.type },
                );
                setFile(newFile);
                setFileName(newFile.name);
            }
        }

        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            const newFile = new File(
                [reader.result],
                `${
                    setFilename &&
                    setFilename
                        .toLowerCase()
                        .replace(/ +/g, "_")
                        .replace(/[^a-zA-Z0-9]/g, "_")
                        .replace(/_+/g, "_")
                }_ProfilePicture.${file && file.type.split("/")[1]}`,
                { type: file && file.type },
            );
            setFile(newFile);
            setFileName(file.name);
        };
        reader.readAsArrayBuffer(file);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            const API_URL = getApiUrl("api/upload/");

            await axios.post(API_URL, formData);
        } catch (err) {
            console.error(err);
        }

        const updatedUserData = {
            name: profileData.name || user.name,
            picture: file.name,
            username: profileData.username || user.username,
            email: profileData.email || user.email,
        };

        if (profileData.name === "") delete updatedUserData.name;
        if (profileData.username === "") delete updatedUserData.username;
        if (profileData.email === "") delete updatedUserData.email;

        dispatch(updateUser({ id: user.id, userData: updatedUserData }));
    };

    const profilePicture = user.picture;
    let profilePictureUrl = ``;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";

    if (profilePicture === dummyPicture) {
        profilePictureUrl = profilePicture;
    } else profilePictureUrl = `${getCDNUrl}/profile_pictures/${profilePicture}`;

    return (
        <Wrapper>
            <EditProfileContainer>
                <ContainerViewBlog>
                    <ViewBlogHeader>
                        <Form onSubmit={onSubmit}>
                            <UserImage src={profilePictureUrl} />
                            <Label style={{ color: "grey" }} htmlFor="addCoverImage">
                                Add Cover Image <AddImage />
                            </Label>
                            <Input
                                type="file"
                                name="addCoverImage"
                                id="addCoverImage"
                                onChange={onFileChange}
                                style={{ display: "none" }}
                            />
                            {fileName && <p>{fileName} selected</p>}
                            <Label htmlFor="title">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={profileData.name || user.name}
                                onChange={onChange}
                            />
                            <Label htmlFor="title">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={profileData.username || user.username}
                                onChange={onChange}
                            />
                            <Label htmlFor="title">Email</Label>
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
            </EditProfileContainer>
        </Wrapper>
    );
};

export default EditProfile;
