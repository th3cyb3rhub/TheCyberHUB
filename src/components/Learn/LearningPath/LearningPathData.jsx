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
                                            allow="accelerometer;  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
