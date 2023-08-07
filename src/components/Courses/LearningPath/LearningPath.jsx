import React, { useEffect, useState } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { ButtonText, LoginToAccess, NavigationButtonContainer } from "./LearningPathElements";
import { useSelector } from "react-redux";
import FreeCourse from "./FreeCourse";
import { RouterLink } from "../../Header/UserOptions/UserOptionsElements";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../../features/apiStatus";

const LearningPath = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#1fc10d"} isLoading={isLoading || isApiLoading} />
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

    return (
        <Wrapper>
            <FreeCourse />
        </Wrapper>
    );
};

export default LearningPath;
