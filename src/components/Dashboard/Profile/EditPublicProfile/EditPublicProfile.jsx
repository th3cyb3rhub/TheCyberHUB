import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, reset, updateUserDetail } from "../../../../features/userDetail/userDetailSlice";
import { ProfileContainer, ProfileDetailsSection, Wrapper } from "../ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import { NotFound } from "../../../index";
import { UserDetailsContainer } from "../SkillSet/SkillSetElements";
import EditUserProjects from "./EditUserProjects";
import EditAchievements from "./EditAchievements";
import EditSkillSet from "./EditSkillSet";
import EditAboutMe from "./EditAboutMe";
import EditUserLinks from "./EditUserLinks";
import EditProfileHeader from "./EditProfileHeader";
import { useNavigate, useParams } from "react-router-dom";

const EditPublicProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { userDetail, isLoading, isError, message } = useSelector((state) => state.userDetail);

    const [isSuccess, setIsSuccess] = useState(false);

    const { username } = useParams();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (user !== null && user.username !== userDetail.username) {
            navigate(`/@${username}`);
        }

        if (isSuccess) {
            navigate(`/@${user.username}`);
        }

        dispatch(getUserDetail(user.username));
        return () => dispatch(reset());
    }, [isError, message, dispatch, user.username]);

    const { aboutMe, bio, skills, achievements, cyberProfiles, socialLinks, projects } = userDetail;

    const getInitialUserDetailData = () => ({
        bio: bio || "",
        aboutMe: aboutMe || "",
        skills: skills || [],
        achievements: achievements || [],
        socialLinks: socialLinks || [],
        projects: projects || [],
        cyberProfiles: cyberProfiles || [],
        solved: userDetail?.solved || [],
    });

    const [userDetailData, setUserDetailData] = useState(getInitialUserDetailData());

    useEffect(() => {
        setUserDetailData(getInitialUserDetailData());
        // if (isSuccess) {
        //     navigate(`/@${user.username}`);
        // }
    }, [userDetail, isSuccess, navigate, user.username]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (user && userDetail && user?.username === userDetail?.username) {
            await dispatch(updateUserDetail({ id: userDetail?.user, userData: userDetailData }));
            navigate(`/@${user.username}`);
            setIsSuccess(true);
        }
    };

    if (isLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#1fc10d"} />
            </Wrapper>
        );
    }

    if (
        userDetail?.length === 0 ||
        userDetail === "Request failed with status code 404" ||
        message === "Request failed with status code 500"
    ) {
        return (
            <Wrapper>
                <NotFound />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <ProfileContainer>
                <EditProfileHeader user={user} userDetail={userDetail} />
                <ProfileDetailsSection>
                    <EditUserLinks
                        userDetail={userDetail}
                        userDetailData={userDetailData}
                        setUserDetailData={setUserDetailData}
                        onSubmit={onSubmit}
                    />
                    <UserDetailsContainer>
                        {aboutMe && aboutMe?.length === 0 && user?._id !== userDetail?.user ? null : (
                            <EditAboutMe
                                aboutMe={aboutMe}
                                userDetailData={userDetailData}
                                setUserDetailData={setUserDetailData}
                            />
                        )}
                        {skills && skills?.length === 0 && user?._id !== userDetail?.user ? null : (
                            <EditSkillSet
                                skills={skills}
                                userDetailData={userDetailData}
                                setUserDetailData={setUserDetailData}
                            />
                        )}
                        {projects && projects?.length === 0 && user?._id !== userDetail?.user ? null : (
                            <EditUserProjects
                                projects={projects}
                                userDetailData={userDetailData}
                                setUserDetailData={setUserDetailData}
                            />
                        )}
                        {achievements && achievements?.length === 0 && user?._id !== userDetail?.user ? null : (
                            <EditAchievements
                                achievements={achievements}
                                userDetailData={userDetailData}
                                setUserDetailData={setUserDetailData}
                            />
                        )}
                    </UserDetailsContainer>
                </ProfileDetailsSection>
            </ProfileContainer>
        </Wrapper>
    );
};
export default EditPublicProfile;
