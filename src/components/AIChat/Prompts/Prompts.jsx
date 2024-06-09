import React, { useState, useEffect } from "react";
import promptsData from "./prompts.json";
import PromptCard from "./PromptCard";

const Prompts = ({ handleSendDummyMessage }) => {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        // Shuffle the prompts array
        const shuffledPrompts = promptsData.sort(() => Math.random() - 0.5).slice(0, 6);
        setPrompts(shuffledPrompts);
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full h-full mb-4 lg:flex-row md:flex-row sm:flex-col gap-2">
                {prompts.map((prompt, index) => (
                    <PromptCard
                        key={index}
                        prompt={prompt}
                        index={index}
                        handleSendDummyMessage={handleSendDummyMessage}
                    />
                ))}
            </div>
        </div>
    );
};

export default Prompts;
