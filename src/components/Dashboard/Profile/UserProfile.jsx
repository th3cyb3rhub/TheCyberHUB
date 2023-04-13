import React, { useEffect, useState } from "react";
import { ProfileContainer, ProfileDetailsSection, Wrapper } from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, reset, updateUserDetail } from "../../../features/userDetail/userDetailSlice";
import { useNavigate, useParams } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import UserLinks from "./UserLinks/UserLinks";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import SocialLinksTemplate from "./UserLinks/socialLinksTemplate";
import SkillSet from "./SkillSet/SkillSet";
import { UserDetailsContainer } from "./SkillSet/SkillSetElements";
import AboutMe from "./AboutMe";
import Achievements from "./Achievements/Achievements";
import ActivityGraph from "./ActivityGraph/ActivityGraph";
import UserProjects from "./UserProjects/UserProjects";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userDetail, isLoading, isError, message } = useSelector((state) => state.userDetail);
    const [isEdit, setIsEdit] = useState(false);

    let { username } = useParams();
    username = username.split("@").join("");

    useEffect(() => {
        if (isError) console.log(message);
        dispatch(getUserDetail(username));

        if (user && userDetail && !userDetail.name && !userDetail.username) {
            const userDetailData = { name: user.name, username: user.username };
            dispatch(updateUserDetail({ id: user._id, userData: userDetailData }));
        }

        if ((user && userDetail.socialLinks === []) || userDetail.socialLinks?.length === 0) {
            const userDetailData = { socialLinks: SocialLinksTemplate };
            dispatch(updateUserDetail({ id: user._id, userData: userDetailData }));
        }
        return () => dispatch(reset());
    }, [isError, message, dispatch, navigate]);

    const { aboutMe, bio, skills, achievements, socialLinks, projects } = userDetail;

    const getInitialUserDetailData = () => ({
        bio: bio || "",
        aboutMe: aboutMe || "",
        skills: skills || [],
        achievements: achievements || [],
        socialLinks: socialLinks || [],
        projects: projects || [],
    });

    const [userDetailData, setUserDetailData] = useState(getInitialUserDetailData());

    console.log("socialLinks", socialLinks);
    console.log("userDetailData.socialLinks", userDetailData.socialLinks);

    useEffect(() => {
        setUserDetailData(getInitialUserDetailData());
    }, [userDetail]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            await dispatch(updateUserDetail({ id: userDetail.user, userData: userDetailData }));
            setIsEdit(false);
        }
    };

    if (isLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={30} color={"#1fc10d"} />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <ProfileContainer>
                <ProfileHeader user={user} isEdit={isEdit} setIsEdit={setIsEdit} onSubmit={onSubmit} />
                <ProfileDetailsSection>
                    <UserLinks
                        userDetail={userDetail}
                        socialLinks={socialLinks}
                        bio={bio}
                        location={userDetail.location}
                        workOrg={userDetail.workOrg}
                        isEdit={isEdit}
                        userDetailData={userDetailData}
                        setUserDetailData={setUserDetailData}
                    />
                    <UserDetailsContainer>
                        <AboutMe
                            isEdit={isEdit}
                            aboutMe={aboutMe}
                            userDetailData={userDetailData}
                            setUserDetailData={setUserDetailData}
                        />
                        <SkillSet
                            isEdit={isEdit}
                            skills={skills}
                            userDetailData={userDetailData}
                            setUserDetailData={setUserDetailData}
                        />
                        <UserProjects
                            isEdit={isEdit}
                            projects={projects}
                            userDetailData={userDetailData}
                            setUserDetailData={setUserDetailData}
                        />
                        <Achievements
                            isEdit={isEdit}
                            achievements={achievements}
                            userDetailData={userDetailData}
                            setUserDetailData={setUserDetailData}
                        />
                        <ActivityGraph />
                    </UserDetailsContainer>
                </ProfileDetailsSection>
            </ProfileContainer>
        </Wrapper>
    );
};
export default UserProfile;
