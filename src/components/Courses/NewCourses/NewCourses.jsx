import CoursesData from "./CoursesData";
import React, { useState } from "react";
import { Card, CardBody, Img, Link, VideoHeading } from "src/components/Learn/Courses/VideoCard/VideoCardElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { encodeURL } from "src/components/Blogs/util";
import { Cards } from "src/components/Forum/ForumPosts/ForumPostsElements";

const NewCourses = () => {
    const [filterContent, setFilterContent] = useState("");

    const doFilterContent = (filter) => {
        if (filterContent === null) {
            setFilterContent(filter);
        } else {
            setFilterContent(null);
        }
    };

    return (
        <Cards>
            {Object.values(CoursesData).map((courseData, index) => (
                <>
                    <RouterLink to={{ pathname: `${encodeURL(courseData.courseName)}` }}>
                        <Card
                            key={index}
                            onClick={() => {
                                doFilterContent(courseData.courseName);
                            }}
                        >
                            <div>
                                <Img src={courseData.thumbnail} alt="card__image" width="600" />
                            </div>
                            <CardBody>
                                <VideoHeading>
                                    <Link href="" target={"_blank"}>
                                        {courseData.courseName}
                                    </Link>
                                </VideoHeading>
                            </CardBody>
                        </Card>
                    </RouterLink>
                </>
            ))}
        </Cards>
    );
};

export default NewCourses;
