import { StartMachineButton, DescriptionTitle } from "./MainPageElement";
// import QuestionAnswerComponent from "./QuestionAnswerComponent";
import { FaPlay } from "react-icons/fa";
import React from "react";
import Submission from "./Submission";

export default function QuestionAnswer(props) {
    const challenge = props.challenge;
    const user = props.user;
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "5px" }}>
                <div>
                    <DescriptionTitle>Description</DescriptionTitle>
                </div>
                <div>
                    <StartMachineButton
                        onClick={() => {
                            window.open(props.link);
                        }}
                    >
                        <FaPlay style={{ margin: "3px" }} />
                        Run Machine
                    </StartMachineButton>
                </div>
            </div>
            <p>{props.Description}</p>
            <DescriptionTitle>Answer The Question Below</DescriptionTitle>
            <Submission
                ctfId={challenge?._id}
                flags={challenge?.flags}
                user={user}
                setIsCompleted={true}
                setIsCertExisted={true}
            />
        </div>
    );
}
