import React, { useEffect } from "react";
import GoalForm from "./GoalForm";
import { useDispatch, useSelector } from "react-redux";
import { GoalsContainer } from "./GoalElements";
import { deleteGoal, getGoals, reset } from "../../../features/goals/goalSlice";
import Spinner from "../../MixComponents/Spinner/Spinner";

const GoalSetter = () => {
    const dispatch = useDispatch();
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

    useEffect(() => {
        dispatch(getGoals());
        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <GoalsContainer>
            <p>Goals Dashboard</p>
            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <div key={goal._id} className="goal" style={{ color: "black" }}>
                                <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
                                <h2>{goal.text}</h2>
                                <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
                                    X
                                </button>
                            </div>
                            // <GoalItem key={goal._id} goal={goal}/>
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </GoalsContainer>
    );
};

export default GoalSetter;
