import React from "react";
import { QuizProgressIndicator, ProgressBar } from "../../components/Resources/Quiz/Categories/CategoriesElements";

export default function RenderProgressIndicator({ currentQuestion, length }) {
    return (
        <QuizProgressIndicator>
            <ProgressBar max={length} value={currentQuestion} />
        </QuizProgressIndicator>
    );
}
