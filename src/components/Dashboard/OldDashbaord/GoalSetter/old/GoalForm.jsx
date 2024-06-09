import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "src/features/goals/goalSlice";

import "src/components/Dashboard/OldDashbaord/GoalSetter/GoalSetter.css";

const GoalForm = () => {
    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createGoal({ text }));
        setText("");
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
};

export default GoalForm;
