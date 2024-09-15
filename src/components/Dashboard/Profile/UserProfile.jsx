import React, { useEffect, useState } from "react";
import { ProfileContainer, ProfileDetailsSection, Wrapper } from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, userDetailReset } from "src/features/userDetail/userDetailSlice";
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
import { NotFound } from "src/components/index";
import UserPoints from "./UserPoints/UserPoints";
import MyCtfCertificates from "./MyCtfCertificates";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import AuthPopup from "src/pages/AuthPopup/AuthPopup";

const UserProfile = () => {
    const dispatch = useDispatch();

    const { isApiLoading, isApiWorking } = apiStatus();

    const { userDetail, isUserDetailLoading, isError, message } = useSelector((state) => state.userDetail);

    const { username } = useParams();

    const [showAuthPopup, setShowAuthPopup] = useState(false);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getUserDetail(username));

        return () => dispatch(userDetailReset());
    }, [isError, message, dispatch, username]);

    if (isApiLoading || isUserDetailLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#ff6b08"} isLoading={isApiLoading || isUserDetailLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    if (
        !userDetail ||
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
            {showAuthPopup && (
                <AuthPopup
                    onClose={() => {
                        setShowAuthPopup(false);
                    }}
                />
            )}
            <ProfileContainer>
                <ProfileHeader userDetail={userDetail} />
                <ProfileDetailsSection>
                    <UserLinks
                        userDetail={userDetail}
                        isUserDetailsLoading={isUserDetailLoading}
                        setShowAuthPopup={setShowAuthPopup}
                    />
                    <UserDetailsContainer>
                        <UserPoints userDetail={userDetail} />
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
