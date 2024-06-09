import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "src/features/goals/goalSlice.js";
import { GoalText } from "./old/GoalElements";

const GoalItem = ({ goal }) => {
    const dispatch = useDispatch();

    return (
        <div className={"goal"}>
            <div>
                <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
                    X
                </button>
                <GoalText>{goal.text}</GoalText>

                <div className="creation-date">
                    <hr />
                    {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }).format(new Date(goal.createdAt))}
                </div>
            </div>
        </div>
    );
};

export default GoalItem;
