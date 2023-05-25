import React, { useEffect } from "react";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, reset } from "../../../features/goals/goalSlice";
import "./GoalSetter.css";
import { Wrapper } from "../Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import { GoalsContainer } from "./old/GoalElements";
import apiStatus from "../../../features/apiStatus";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";

const GoalSetter = () => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { goals, message } = useSelector((state) => state.goals);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getGoals());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch, message]);

    if (isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#1fc10d"} isLoading={isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) {
        return <UnderMaintenance />;
    }

    return (
        <Wrapper>
            <GoalsContainer>
                <GoalForm />
                <section className={"content"}>
                    {goals?.length > 0 ? (
                        <div className={"goals"}>
                            {goals?.map((goal) => (
                                <GoalItem key={goal?._id} goal={goal} />
                            ))}
                        </div>
                    ) : (
                        <h3> You have not set any goals</h3>
                    )}
                </section>
            </GoalsContainer>
        </Wrapper>
    );
};

export default GoalSetter;
