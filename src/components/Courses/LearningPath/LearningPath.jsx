import React, { useEffect, useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { ButtonText, LoginToAccess, NavigationButtonContainer } from "./LearningPathElements";
import { useSelector } from "react-redux";
import FreeCourse from "./FreeCourse";
import { RouterLink } from "src/components/Header/UserOptions/UserOptionsElements";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";

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
                <CircleSpinner size={20} color={"#ff6b08"} isLoading={isLoading || isApiLoading} />
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
