import React, { useState } from "react";
import {
    FlagAns,
    FlagHintButton,
    FlagQues,
    FlagSubmit,
    ShowFlagHint,
    SubmissionContainer,
    SubmissionFlagSection,
    SubmissionSection,
} from "src/components/CaptureTheFlag/SingleCTF/SubmissionElements";
import { TbBulb } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { updateUserDetail } from "src/features/userDetail/userDetailSlice";

const Submission = ({ ctfId, flags, user, setIsCompleted, setIsCertExisted }) => {
    const dispatch = useDispatch();
    const buttonColor = "#131313";
    // const [submitFlagId, setSubmitFlagId] = useState(null);
    // const [isLoading, setIsLoading] = useState({});

    const handleSubmit = (flagId) => {
        // setIsLoading((prev) => ({ ...prev, [flagId]: true }));
        // setSubmitFlagId(flagId);

        // submit logic
        setTimeout(() => {
            // setSubmitFlagId(null);
            // setIsLoading((prev) => ({ ...prev, [flagId]: false }));
        }, 1000);
    };

    const [enteredAns, setEnteredAns] = useState({});
    const [hintFlagId, setHintFlagId] = useState(null);
    const [solved, setSolved] = useState([]);
    const [solvedFlags, setSolvedFlags] = useState([]);

    const handleFlagSubmit = (flagId) => {
        handleSubmit(flagId);
        // handleButtonClick();
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
                dispatch(updateUserDetail({ id: user?._id, userData: { solved: updatedSolved } }));
                setSolvedFlags([...solvedFlags, flagId]);
                setSolved([]);
            } else {
                const newCtf = { ctfId, flags: [{ flagId, date: new Date() }] };
                const updatedSolved = [...solved, newCtf];
                dispatch(updateUserDetail({ id: user?._id, userData: { solved: updatedSolved } }));
                setSolvedFlags([...solvedFlags, flagId]);
            }
        }
    };

    // const getValueWithFlagId = (flagId) => {
    //     if (getSolvedFlags()?.includes(flagId)) {
    //         return flags.find((flag) => flag._id === flagId).flag;
    //     }
    // };

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

    // if (userDetailIsLoading) {
    //     return <CircleSpinner size={30} color="#ff6b08"/>;
    // }

    return (
        <SubmissionContainer>
            {flags?.map((flag) => (
                <SubmissionSection key={flag._id}>
                    <FlagQues> {flag.ques} </FlagQues>
                    <SubmissionFlagSection>
                        <FlagAns
                            type="text"
                            placeholder="Enter flag value"
                            value={enteredAns[flag._id] || ""}
                            onChange={(e) => handleInputChange(e, flag._id)}
                        />
                        <FlagSubmit
                            onClick={() => handleFlagSubmit(flag._id)}
                            style={{ color: buttonColor === "#f77000" && "#f77000" }}
                        >
                            Submit
                        </FlagSubmit>
                        {flag.hint === "" ? null : (
                            <>
                                {hintFlagId === flag._id ? (
                                    solvedFlags?.includes(flag._id) ? null : (
                                        <ShowFlagHint>{flag.hint}</ShowFlagHint>
                                    )
                                ) : null}
                                <FlagHintButton onClick={() => handleToggleHint(flag._id)}>
                                    {hintFlagId === flag._id ? (
                                        "Hide Hint"
                                    ) : (
                                        <>
                                            <TbBulb /> Hint
                                        </>
                                    )}
                                </FlagHintButton>
                            </>
                        )}
                    </SubmissionFlagSection>
                </SubmissionSection>
            ))}
        </SubmissionContainer>
    );
};

export default Submission;
