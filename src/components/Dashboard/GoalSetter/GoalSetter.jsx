import React, { useEffect } from "react";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, reset } from "../../../features/goals/goalSlice";
import "./GoalSetter.css";
import { Wrapper } from "../Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
const GoalSetter = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getGoals());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch, isError, message]);

    return (
        <Wrapper>
            {isLoading && <CircleSpinner size={20} color={"#1fc10d"} />}
            <GoalForm />

            <section className={"content"}>
                {goals.length > 0 ? (
                    <div className={"goals"}>
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3> You have not set any goals</h3>
                )}
            </section>
        </Wrapper>
    );
};

export default GoalSetter;
