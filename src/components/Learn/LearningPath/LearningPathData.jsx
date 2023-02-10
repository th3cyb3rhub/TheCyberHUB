import React from "react";
import { IFrameVideo } from "./LearningPathElements";

const LearningPathData = [
    {
        id: 1,
        weeks: [
            {
                week: "Complete Cyber Security Course",
                days: [
                    {
                        day: "Cyber Security",
                        contents: [
                            {
                                id: "123123123123",
                                heading: "Introduction to Community",
                                content: (
                                    <div>
                                        <IFrameVideo
                                            src="https://www.youtube.com/embed/r5CDqVnWFFQ"
                                            title="Linux for Ethical Hackers (Kali Linux Tutorial)"
                                            frameBorder="0"
                                            allow="accelerometer;  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></IFrameVideo>
                                    </div>
                                ),
                                flag: "python",
                            },
                            {
                                heading: "What is Cybersecurity",
                                content: (
                                    <div>
                                        <IFrameVideo
                                            src="https://www.youtube.com/embed/eWRfhZUzrAc"
                                            title="Python for Beginners – Full Course [Programming Tutorial]"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></IFrameVideo>
                                    </div>
                                ),
                            },
                        ],
                    },
                    {
                        day: "Linux",
                        contents: [
                            {
                                heading: "Introduction to Linux",
                                content: (
                                    <div>
                                        <IFrameVideo
                                            src="https://www.youtube.com/embed/lZAoFs75_cs"
                                            title="Linux for Ethical Hackers (Kali Linux Tutorial)"
                                            frameBorder="0"
                                            allow="accelerometer;  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></IFrameVideo>
                                    </div>
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default LearningPathData;
