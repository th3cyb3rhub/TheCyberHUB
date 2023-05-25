import React, { useEffect, useState } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { ButtonText, LoginToAccess, NavigationButtonContainer } from "./LearningPathElements";
import { useSelector } from "react-redux";
import FreeCourse from "./FreeCourse";
import { RouterLink } from "../../Header/UserOptions/UserOptionsElements";
import { useUserData } from "../../Dashboard/checkUserVerified";
import { CircleSpinner } from "react-spinners-kit";
import VerifyToAccess from "../../Dashboard/VerifyToAccess";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../../features/apiStatus";

const LearningPath = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);

    const userData = useUserData({ user });
    const userVerified = userData.isVerified;

    useEffect(() => {
        setIsLoading(true);
        if (userVerified || userData === "Network Error") {
            setIsLoading(false);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [userData, user, isLoading]);

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#1fc10d"} isLoading={isLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    if (!user) {
        return (
            <Wrapper>
                <LoginToAccess> {"Please login to access cyber security course".toUpperCase()} </LoginToAccess>
                <NavigationButtonContainer>
                    <RouterLink to={"/login"}>
                        <ButtonText>Login</ButtonText>
                    </RouterLink>
                    <RouterLink to={"/register"}>
                        <ButtonText>Register</ButtonText>
                    </RouterLink>
                </NavigationButtonContainer>
            </Wrapper>
        );
    }

    return <Wrapper>{userVerified ? <FreeCourse /> : <VerifyToAccess />}</Wrapper>;
};

export default LearningPath;
