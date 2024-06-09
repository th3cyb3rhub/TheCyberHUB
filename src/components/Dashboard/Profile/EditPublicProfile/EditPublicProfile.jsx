import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, userDetailReset, updateUserDetail } from "src/features/userDetail/userDetailSlice";
import { ProfileContainer, ProfileDetailsSection, Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import { NotFound } from "src/components/index";
import { UserDetailsContainer } from "src/components/Dashboard/Profile/SkillSet/SkillSetElements";
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
    const { userDetail, isUserDetailLoading, isError, message } = useSelector((state) => state.userDetail);

    const [isSuccess, setIsSuccess] = useState(false);

    const { username } = useParams();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (user !== null && user.username !== username) {
            navigate(`/user/${username}`);
        }

        if (isSuccess) {
            navigate(`/user/${user.username}`);
        }

        dispatch(getUserDetail(user.username));
        return () => dispatch(userDetailReset());
    }, [isError, message, dispatch, user.username]);

    const { avatar, aboutMe, bio, skills, achievements, cyberProfiles, socialLinks, projects } = userDetail;

    const getInitialUserDetailData = () => ({
        avatar: avatar || "",
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
        //     navigate(`/user/${user.username}`);
        // }
    }, [userDetail, isSuccess, navigate, user.username]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (user && userDetail && user?.username === userDetail?.username) {
            await dispatch(updateUserDetail({ id: userDetail?.user, userData: userDetailData }));
            navigate(`/user/${user.username}`);
            setIsSuccess(true);

            setUserDetailData(getInitialUserDetailData());
        }
    };

    if (isUserDetailLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#ff6b08"} />
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
