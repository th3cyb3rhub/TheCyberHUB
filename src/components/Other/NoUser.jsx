import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import {
    ButtonText,
    LoginToAccess,
    NavigationButtonContainer,
} from "src/components/Resources/LearningPath/LearningPathElements";
import { RouterLink } from "src/components/Header/UserOptions/UserOptionsElements";

export const NoUser = () => {
    return (
        <Wrapper>
            <LoginToAccess> {"Please login to access this page".toUpperCase()} </LoginToAccess>
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
};
