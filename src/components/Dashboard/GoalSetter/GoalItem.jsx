import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../../../features/goals/goalSlice.js";
import { GoalText } from "./old/GoalElements";

const GoalItem = ({ goal }) => {
    const dispatch = useDispatch();

    return (
        <div className={"goal"}>
            <div>
                <GoalText>{goal.text}</GoalText>
                <hr />
                <div>
                    {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }).format(new Date(goal.createdAt))}
                </div>
                <hr />
                <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
                    X
                </button>
            </div>
        </div>
    );
};

export default GoalItem;
