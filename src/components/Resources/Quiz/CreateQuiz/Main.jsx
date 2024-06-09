import React, { useState } from "react";
import { SaveButton, Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CategoriesButtonData } from "src/components/Resources/Quiz/Categories/CategoriesButtonData";
import { AddQuestionAndOptionContainer, Input, Label, QuizContainer } from "./CreateQuizElement";
import AddFeedTags from "src/components/Feeds/PostForm/AddPostTags/AddPostTags";

const QuizAdder = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);
    const [maxOption, setMaxOption] = useState(2);
    const [tags, setTags] = useState([]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const handleCorrectOptionChange = (index) => {
        const newOptions = [...options];
        newOptions.forEach((option, i) => (option.isCorrect = i === index));
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        if (maxOption <= 3) {
            setMaxOption(maxOption + 1);
            setOptions([...options, { text: "", isCorrect: false }]);
        }
    };

    const Submit = () => {
        if (document.getElementById("Question").value === "") {
            alert("Enter Question");
        } else {
            for (let i = 1; i <= maxOption; i++) {
                if (document.getElementById("option" + i).value === "") {
                    alert("Enter Options " + i);
                    return;
                }
            }

            const radioButtons = document.getElementsByClassName("Options");
            let selectedOption;

            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedOption = radioButton.value;
                    break;
                }
            }

            if (!selectedOption) {
                alert("Please select a correct option");
            }
        }
    };

    return (
        <Wrapper>
            <QuizContainer>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <Label style={{ fontSize: "25px" }}>Question:</Label>
                    <Input
                        type="text"
                        id="Question"
                        style={{ width: "100%" }}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                <h2>Options:</h2>
                {options.map((option, index) => (
                    <AddQuestionAndOptionContainer key={index}>
                        <Label>Option {index + 1}:</Label>
                        <Input
                            type="text"
                            id={"option" + (index + 1)}
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />

                        <input
                            type="checkbox"
                            className="Options"
                            name="correctOption"
                            style={{ height: "45px", width: "45px", backgroundColor: "#212121" }}
                            checked={option.isCorrect}
                            onChange={() => handleCorrectOptionChange(index)}
                        />
                    </AddQuestionAndOptionContainer>
                ))}
                <div style={{ display: "flex", flexDirection: "row", margin: "20px", alignItems: "center" }}>
                    <label htmlFor="Select">Choose a Category:</label>
                    <select
                        name="Select"
                        id="Select"
                        style={{
                            backgroundColor: "black",
                            padding: "7px",
                            borderRadius: "5px",
                        }}
                    >
                        {CategoriesButtonData.map((data, index) => (
                            <option key={index} value={data.type}>
                                {data.value}
                            </option>
                        ))}
                    </select>
                </div>
                <Label>Tags:</Label>
                {true && <AddFeedTags tags={tags} setTags={setTags} />}
                <br />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <SaveButton onClick={handleAddOption}>Add Option</SaveButton>
                    <SaveButton style={{ background: "#FF6B08" }} onClick={Submit}>
                        Create
                    </SaveButton>
                </div>
            </QuizContainer>
            {/* <AddFeedTags tags= setTags={"   */}
        </Wrapper>
    );
};

export default QuizAdder;
