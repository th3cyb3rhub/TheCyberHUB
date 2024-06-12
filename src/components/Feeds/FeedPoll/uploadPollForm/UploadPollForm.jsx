import React, { useState } from "react";
import { FormInput, ErrorMessage } from "./FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ANSWER_ERROR_MSG = "Min 4 characters";
const schema = z.object({
    question: z.string().min(10, "Minimum 10 characters"),
    answer1: z.string().min(4, ANSWER_ERROR_MSG),
    answer2: z.string().min(4, ANSWER_ERROR_MSG),
    answer3: z.string().min(4, ANSWER_ERROR_MSG).optional(),
});

export const UploadPollForm = () => {
    const [answers, setAnswers] = useState([1, 2]);
    const {
        register,
        handleSubmit,
        resetField,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        shouldUnregister: true,
    });

    const MAX_ANSWERS = 3;
    const isAtMaxAnswers = answers.length === MAX_ANSWERS;

    const onSubmit = (data) => {
        console.log(data);
    };

    const addAnswer = () => {
        setAnswers((prevAnswers) => [...prevAnswers, prevAnswers.length + 1]);
    };

    const removeAnswer = (index) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers.filter((_, i) => i !== index);
            const currentValues = getValues();

            if (index === 0) {
                index++;
            }

            for (let i = index; i < prevAnswers.length - 1; i++) {
                setValue(`answer${i + 1}`, currentValues[`answer${i + 2}`]);
            }

            return updatedAnswers;
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>Add a question</Title>
            <QuestionBody
                errorMessage={errors?.question?.message}
                placeholder="Question Body..."
                {...register("question")}
            />
            {errors?.question?.message && <ErrorMessage>{errors.question.message}</ErrorMessage>}
            <Answers
                answers={answers}
                errors={errors}
                register={register}
                removeAnswer={removeAnswer}
                isAtMaxAnswers={isAtMaxAnswers}
                resetField={resetField}
            />
            <AddAnswerContainer>
                <Text>Add another answer</Text>
                <Button disabled={isAtMaxAnswers} type="button" onClick={addAnswer}>
                    +
                </Button>
            </AddAnswerContainer>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

const Answers = ({ answers, errors, register, removeAnswer, isAtMaxAnswers, resetField }) => {
    return (
        <>
            {answers.map((answer, index) => (
                <FormInput
                    key={`${answer}-${index}`}
                    name={`answer${index + 1}`}
                    placeholder="Your Answer"
                    errors={errors}
                    resetField={() => resetField(`answer${index + 1}`)}
                    register={register}
                    removeInput={() => removeAnswer(index)}
                    deletable={isAtMaxAnswers}
                >
                    {answer}
                </FormInput>
            ))}
        </>
    );
};

const Button = styled.button`
    font-size: 14px;
    background: ${(props) => (props.disabled ? "#ccc" : "#333")};
    color: ${(props) => (props.disabled ? "#666" : "#fff")};
    border: 1px solid ${(props) => (props.disabled ? "#aaa" : "#555")};
    border-radius: 0.2rem;
    padding: 0.5rem;
    box-shadow: 0 0 1px 1px #f5f5f569;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    &:hover {
        background: ${(props) => (props.disabled ? "#ccc" : "#444")};
    }
`;

const Form = styled.form`
    display: flex;
    background: #252525;
    width: 20rem;
    margin: auto;
    border-radius: 15px;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Text = styled.p`
    color: #fff;
    font-size: 1rem;
`;

const AddAnswerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const Title = styled.p`
    color: #fff;
    font-size: 1.5rem;
`;

const QuestionBody = styled.textarea`
    font-size: 1.2;
    background: #333;
    color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0 1px 1px #f5f5f569;
    min-height: 5rem;
    padding: 0.3rem;
    width: 100%;

    &::placeholder {
        color: #aaa;
    }
`;
