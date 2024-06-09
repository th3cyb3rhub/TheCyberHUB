import React, { useEffect, useState } from "react";
import {
    BackArrow,
    Checkbox,
    CheckboxContainer,
    Content,
    ContentHeading,
    ContentList,
    ContentNavigation,
    Days,
    ForwardArrow,
    LearningPathContainer,
    LearningPathWrapper,
    LeftContainer,
    NavigationButtonSection,
    RightContainer,
    // SectionHeading,
    TopicBox,
    VLine,
} from "./LearningPathElements";
import LearningPathData from "./LearningPathData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FreeCourse = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const selectFirstHeading = () => {
        return LearningPathData[0].weeks[0].days[0].contents[0].heading;
    };
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [showNavigation, setShowNavigation] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        setSelectedHeading(selectFirstHeading);
    }, [user, navigate]);

    const handleHeadingClick = (heading) => {
        setSelectedHeading(heading);
        setSelectedContent(heading);
    };
    const handleContentNavigation = () => {
        setShowNavigation(!showNavigation);
    };
    return (
        <LearningPathWrapper>
            {/* <SectionHeading> {"Complete Cyber Security Course".toUpperCase()} </SectionHeading> */}
            <NavigationButtonSection>
                {showNavigation ? (
                    <BackArrow onClick={handleContentNavigation} />
                ) : (
                    <ForwardArrow onClick={handleContentNavigation} />
                )}
            </NavigationButtonSection>
            <LearningPathContainer>
                {showNavigation && (
                    <>
                        <LeftContainer>
                            <ContentNavigation>
                                {LearningPathData.map((data, index) => (
                                    <ContentList key={index}>
                                        {data?.weeks.map((week, index) => (
                                            <div key={index}>
                                                <h2>{week.week}</h2>
                                                {week?.days.map((days, index) => (
                                                    <Days key={index}>
                                                        <h3>{days.day}</h3>
                                                        {days.contents.map((content, index) => (
                                                            <TopicBox
                                                                key={index}
                                                                onClick={() => handleHeadingClick(content.heading)}
                                                                $isSelected={content.heading === selectedContent}
                                                            >
                                                                <ContentHeading>{content.heading}</ContentHeading>
                                                                <CheckboxContainer>
                                                                    <Checkbox
                                                                        id={content.heading}
                                                                        value={content.heading}
                                                                        $isSelected={
                                                                            content.heading === selectedContent
                                                                        }
                                                                        type="checkbox"
                                                                    />
                                                                </CheckboxContainer>
                                                            </TopicBox>
                                                        ))}
                                                    </Days>
                                                ))}
                                            </div>
                                        ))}
                                    </ContentList>
                                ))}
                            </ContentNavigation>
                        </LeftContainer>
                        <VLine />
                    </>
                )}
                <RightContainer>
                    <Content>
                        {selectedHeading &&
                            LearningPathData.find((data) =>
                                data.weeks.find((week) =>
                                    week.days.find((days) =>
                                        days.contents.find((content) => content.heading === selectedHeading),
                                    ),
                                ),
                            )
                                .weeks.find((week) =>
                                    week.days.find((days) =>
                                        days.contents.find((content) => content.heading === selectedHeading),
                                    ),
                                )
                                .days.find((days) =>
                                    days.contents.find((content) => content.heading === selectedHeading),
                                )
                                .contents.find((content) => content.heading === selectedHeading).content}
                    </Content>
                </RightContainer>
            </LearningPathContainer>
        </LearningPathWrapper>
    );
};

export default FreeCourse;
