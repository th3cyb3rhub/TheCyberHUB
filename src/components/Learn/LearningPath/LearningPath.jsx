import React from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { ButtonText, LoginToAccess, NavigationButtonContainer } from "./LearningPathElements";
import { useSelector } from "react-redux";
import FreeCourse from "./FreeCourse";
import { RouterLink } from "../../Header/UserOptions/UserOptionsElements";

const LearningPath = () => {
    const { user } = useSelector((state) => state.auth);

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

    if (user) {
        return (
            <Wrapper>
                <FreeCourse />
            </Wrapper>
        );
    } else return null;
};

export default LearningPath;
