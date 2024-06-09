import CoursesData from "./CoursesData";
import React from "react";
import { Button } from "src/components/Learn/Courses/VideoCard/VideoCardElements";
import {
    Checkbox,
    CheckboxContainer, //   Content,
    ContentHeading, //   ContentList,
    //   ContentNavigation,
    Days, //   ForwardArrow,
    //   LearningPathContainer,
    //   LearningPathWrapper,
    // LeftContainer, //   NavigationButtonSection,
    RightContainer, // SectionHeading,
    TopicBox, //   VLine,
} from "src/components/Courses/LearningPath/LearningPathElements";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { encodeURL } from "src/components/Blogs/util";
import { useParams } from "react-router";

const Course = () => {
    // const [filterContent, setFilterContent] = useState("")
    const { title } = useParams();

    // const doFilterContent = (filter) => {
    //   if (filterContent === null) {
    //     setFilterContent(filter)
    //   }
    //   else {
    //     setFilterContent(null)
    //   }
    //   console.log(filterContent)
    // }

    const changeImgSrc = (src) => {
        document.getElementById("image").src = src;
    };

    const course = Object.values(CoursesData)?.find(
        (course) => `${encodeURL(course?.courseName)}`.toLowerCase() === title.toLowerCase(),
    );

    return (
        <Wrapper>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                    height: "100%",
                    padding: "20px",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "400px",
                        height: "100%",
                        // padding: "20px",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            // padding: "20px 0",
                        }}
                    >
                        <Button to="/Courses">Go Back</Button>
                    </div>

                    {course.sections.map((section, index) => (
                        <div key={index}>
                            <div key={index}>
                                <h3>{section.sectionName}</h3>
                            </div>

                            <Days key={index}>
                                <ul>
                                    {section.videos.map((video, videoIndex) => (
                                        <>
                                            <TopicBox onClick={() => changeImgSrc(video.imageUrl)} key={index}>
                                                <ContentHeading>{video.title}</ContentHeading>
                                                <CheckboxContainer>
                                                    <Checkbox type="checkbox" />
                                                </CheckboxContainer>
                                            </TopicBox>
                                        </>
                                    ))}
                                </ul>
                            </Days>
                        </div>
                    ))}
                </div>
                <RightContainer>
                    <img src="" id="image" alt={""} />
                </RightContainer>
            </div>
        </Wrapper>
    );
};

export default Course;
