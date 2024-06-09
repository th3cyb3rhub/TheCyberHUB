import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "src/features/goals/goalSlice";
import { toast } from "react-toastify";
import styled from "styled-components";
import { MdAddBox } from "react-icons/md";

const GoalInput = styled.input`
    border: none;
    background: #212121;
    color: #d7d7d7;
    padding: 7px 12px;
    font-size: 16px;
    width: 100%;
    border-radius: 4px;
    outline: none;
    margin: 1rem 0;
`;

const GoalInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: none;
    height: 3rem;
    margin: 1rem 0;
`;

const GoalSubmit = styled.button`
    color: #ff6b09;
    padding: 0.5rem;
    font-size: 1.5rem;
    border-radius: 5px;

    &:hover {
        opacity: 0.7;
    }
`;

const GoalForm = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") {
            toast.warn("Cannot submit empty goal");
            setError(true);
            return;
        }

        dispatch(createGoal({ text }));
        setError(false);
        setText("");
    };

    return (
        <section className={"form"}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="goal">Goal</label>
                    <GoalInputContainer>
                        <GoalInput
                            type="text"
                            name="text"
                            id="text"
                            value={text}
                            error={error}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's your goal?"
                        />
                        <GoalSubmit type={"submit"}>
                            <MdAddBox className="!m-[unset]" />
                        </GoalSubmit>
                    </GoalInputContainer>
                </div>
            </form>
        </section>
    );
};

export default GoalForm;
