import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { ButtonText, LoginToAccess, NavigationButtonContainer } from "../Resources/LearningPath/LearningPathElements";
import { RouterLink } from "../Header/UserOptions/UserOptionsElements";
import VerifyToAccess from "../Dashboard/VerifyToAccess";

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

export const UserNotVerified = () => {
    return <VerifyToAccess />;
};
