import React from "react";
import { IFrameVideo } from "./LearningPathElements";

const LearningPathData = [
    {
        id: 1,
        weeks: [
            {
                week: "",
                days: [
                    {
                        day: "Community",
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
                                            allowFullScreen
                                        ></IFrameVideo>
                                    </div>
                                ),
                                flag: "python",
                            },
                        ],
                    },
                    {
                        day: "Cyber Security",
                        contents: [
                            {
                                heading: "Cybersecurity Introduction",
                                content: (
                                    <div>
                                        <IFrameVideo
                                            src="https://www.youtube.com/embed/p2Uz3C7Z-VE"
                                            title="Getting started with Cyber Security in 2023"
                                            frameBorder="0"
                                            allowFullScreen
                                        ></IFrameVideo>
                                    </div>
                                ),
                            },
                            {
                                heading: "Will be updated soon",
                                content: <div>Will be updated soon</div>,
                            },
                        ],
                    },
                    {
                        day: "Android App Pentesting",
                        contents: [
                            {
                                heading: "Android App Pentesting Intro",
                                content: <div>Will be updated soon</div>,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default LearningPathData;
