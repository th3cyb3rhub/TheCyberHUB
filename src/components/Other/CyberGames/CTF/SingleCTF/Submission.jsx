import React, { useEffect, useState } from "react";
import {
    FlagAns,
    FlagHintButton,
    FlagQues,
    FlagSolved,
    FlagSubmit,
    ShowFlagHint,
    SubmissionContainer,
    SubmissionFlagSection,
    SubmissionSection,
} from "./SubmissionElements";
import { TbBulb } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUserDetail } from "../../../../../features/userDetail/userDetailSlice";
import { CircleSpinner } from "react-spinners-kit";

const Submission = ({ ctfId, flags, user }) => {
    const dispatch = useDispatch();
    const {
        userDetail,
        isLoading,
        // isError, message
    } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(getUserDetail(user.username));
    }, [dispatch, user.username]);

    const [buttonColor, setButtonColor] = useState("blue");

    const handleButtonClick = () => {
        setButtonColor("#f77000");
        setTimeout(() => {
            setButtonColor("#131313");
        }, 1000); // change back to blue after 1 second
    };

    const getSolvedFlags = () => {
        const solved = userDetail?.solved || [];
        const ctfIndex = solved.findIndex((ctf) => ctf.ctfId === ctfId);
        if (ctfIndex !== -1) {
            return solved[ctfIndex].flags?.map((flag) => flag?.flagId);
        }
        return [];
    };
    const [solvedFlags, setSolvedFlags] = useState(getSolvedFlags() || []);
    const [enteredAns, setEnteredAns] = useState({});
    const [hintFlagId, setHintFlagId] = useState(null);
    const [solved, setSolved] = useState(userDetail.solved || []);

    useEffect(() => {
        if (userDetail) {
            const solved = userDetail.solved || [];
            const ctfIndex = solved.findIndex((ctf) => ctf.ctfId === ctfId);
            const solvedFlags = ctfIndex !== -1 ? solved[ctfIndex].flags?.map((flag) => flag?.flagId) : [];
            setSolvedFlags(solvedFlags);
            setSolved(solved);
        }
    }, [userDetail, ctfId]);

    if (isLoading) {
        return <CircleSpinner size={30} color="#09ff1b" loading={isLoading} />;
    }

    const handleFlagSubmit = (flagId) => {
        handleButtonClick();
        const flag = flags?.find((flag) => flag?._id === flagId);
        if (
            flag &&
            enteredAns[flagId].split(" ").join("").toLowerCase() === flag.flag.split(" ").join("").toLowerCase() &&
            !solvedFlags?.includes(flagId) &&
            !solved?.includes(flagId)
        ) {
            const ctfIndex = solved.findIndex((ctf) => ctf.ctfId === ctfId);
            if (ctfIndex !== -1) {
                const ctf = solved[ctfIndex];
                const flags = [...ctf.flags, { flagId, date: new Date() }];
                const updatedCtf = { ...ctf, flags };
                const updatedSolved = [...solved.slice(0, ctfIndex), updatedCtf, ...solved.slice(ctfIndex + 1)];
                dispatch(updateUserDetail({ id: user._id, userData: { solved: updatedSolved } }));
                setSolvedFlags([...solvedFlags, flagId]);
            } else {
                const newCtf = { ctfId, flags: [{ flagId, date: new Date() }] };
                const updatedSolved = [...solved, newCtf];
                dispatch(updateUserDetail({ id: user._id, userData: { solved: updatedSolved } }));
                setSolvedFlags([...solvedFlags, flagId]);
            }
        }
    };

    const getValueWithFlagId = (flagId) => {
        if (getSolvedFlags()?.includes(flagId)) {
            return flags.find((flag) => flag._id === flagId).flag;
        }
    };

    const handleInputChange = (e, flagId) => {
        const value = e.target.value;
        setEnteredAns((prevState) => ({ ...prevState, [flagId]: value }));
    };
    const handleToggleHint = (flagId) => {
        if (hintFlagId === flagId) {
            setHintFlagId(null);
        } else {
            setHintFlagId(flagId);
        }
    };

    return (
        <SubmissionContainer>
            {flags?.map((flag) => (
                <SubmissionSection key={flag._id}>
                    <FlagQues> {flag.ques} </FlagQues>
                    <SubmissionFlagSection>
                        {solvedFlags?.includes(flag?._id) ? (
                            <FlagSolved> {getValueWithFlagId(flag._id) || enteredAns[flag._id] || ""} </FlagSolved>
                        ) : (
                            <FlagAns
                                type="text"
                                placeholder="Enter flag value"
                                value={enteredAns[flag._id] || ""}
                                onChange={(e) => handleInputChange(e, flag._id)}
                            />
                        )}

                        {solvedFlags?.includes(flag._id) ? (
                            <FlagSubmit> Solved </FlagSubmit>
                        ) : (
                            <FlagSubmit
                                onClick={() => handleFlagSubmit(flag._id)}
                                style={{ color: buttonColor === "#f77000" && "#f77000" }}
                            >
                                {buttonColor === "#f77000" ? "Wrong Answer" : "Submit"}
                            </FlagSubmit>
                        )}
                        {flag.hint === "" ? null : (
                            <>
                                {hintFlagId === flag._id ? <ShowFlagHint>{flag.hint}</ShowFlagHint> : null}
                                {solvedFlags?.includes(flag._id) ? null : (
                                    <FlagHintButton onClick={() => handleToggleHint(flag._id)}>
                                        {hintFlagId === flag._id ? (
                                            "Hide Hint"
                                        ) : (
                                            <>
                                                <TbBulb /> Hint
                                            </>
                                        )}
                                    </FlagHintButton>
                                )}
                            </>
                        )}
                    </SubmissionFlagSection>
                </SubmissionSection>
            ))}
        </SubmissionContainer>
    );
};

export default Submission;
