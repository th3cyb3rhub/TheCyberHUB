import React, { useEffect } from "react";
import { ProfileContainer, ProfileDetailsSection, Wrapper } from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails, userDetailReset } from "../../../features/userDetail/userDetailSlice";
import { getAllBlogs } from "../../../features/blogs/blogSlice";
import { useParams } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import UserLinks from "./UserLinks/UserLinks";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import SkillSet from "./SkillSet/SkillSet";
import { UserDetailsContainer } from "./SkillSet/SkillSetElements";
import AboutMe from "./AboutMe";
import Achievements from "./Achievements/Achievements";
import ActivityGraph from "./ActivityGraph/ActivityGraph";
import UserProjects from "./UserProjects/UserProjects";
import { NotFound } from "../../index";
import UserPoints from "./UserPoints/UserPoints";
import MyCtfCertificates from "./MyCtfCertificates";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../../features/apiStatus";

const UserProfile = () => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const dispatch = useDispatch();
    const { userDetails, isUserDetailLoading, isError, message } = useSelector((state) => state.userDetail);

    const { blogs, isBlogLoading } = useSelector((state) => state.blogs);
    const { username } = useParams();

    const userDetail = userDetails?.find((user) => user?.username === username);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getAllBlogs());
        dispatch(getAllUserDetails());

        return () => dispatch(userDetailReset());
    }, [isError, message, dispatch, username]);

    if (isUserDetailLoading || isBlogLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner
                    size={20}
                    color={"#ff6b08"}
                    isLoading={isUserDetailLoading || isBlogLoading || isApiLoading}
                />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

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

    const { aboutMe, skills, achievements, projects } = userDetail || {};
    return (
        <Wrapper>
            <ProfileContainer>
                <ProfileHeader userDetail={userDetail} />
                <ProfileDetailsSection>
                    <UserLinks userDetail={userDetail} userDetails={userDetails} />
                    <UserDetailsContainer>
                        <UserPoints userDetail={userDetail} allUserDetail={userDetails} blogs={blogs} />
                        {(aboutMe && aboutMe?.length === 0) || aboutMe === undefined ? null : (
                            <AboutMe aboutMe={aboutMe} />
                        )}
                        {skills && skills?.length === 0 ? null : <SkillSet skills={skills} />}
                        {projects && projects?.length === 0 ? null : <UserProjects projects={projects} />}
                        {achievements && achievements?.length === 0 ? null : (
                            <Achievements achievements={achievements} />
                        )}
                        <MyCtfCertificates ctfCertificates={userDetail?.ctfCertificates} />
                        <ActivityGraph userDetail={userDetail} />
                    </UserDetailsContainer>
                </ProfileDetailsSection>
            </ProfileContainer>
        </Wrapper>
    );
};
export default UserProfile;
