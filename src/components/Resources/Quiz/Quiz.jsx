import React from "react";
import Categories from "./Categories/Categories";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { QuizContainer } from "./QuizElements";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";

const Quiz = () => {
    return (
        <Wrapper>
            <QuizContainer>
                <HeadingBanner heading={"Quiz"} />
                <Categories />
            </QuizContainer>
        </Wrapper>
    );
};

export default Quiz;
