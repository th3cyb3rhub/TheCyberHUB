import React from "react";
import { PollAnswers } from "./PollAnswers";
import { Poll } from "./Poll";

export default {
    title: "Components/Poll/PollAnswers",
    component: Poll,
    id: "components-poll-questions",
};

const Template = (args) => (
    <Poll {...args}>
        <PollAnswers
            answers={[
                { percentage: 50, title: "JavaScript", isCorrectAnswer: true },
                { percentage: 30, title: "Python", isCorrectAnswer: false },
                { percentage: 20, title: "Ruby", isCorrectAnswer: false },
            ]}
        />
    </Poll>
);

export const DefaultPollAnswers = Template.bind({});
DefaultPollAnswers.args = {
    title: "What Programming language do you use",
    votes: "57 votes",
    daysLeft: "4 days left",
};
