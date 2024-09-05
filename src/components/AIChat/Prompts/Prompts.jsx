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
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-4 gap-2 overflow-auto">
            {prompts.map((prompt, index) => (
                <PromptCard key={index} prompt={prompt} index={index} handleSendDummyMessage={handleSendDummyMessage} />
            ))}
        </div>
    );
};

export default Prompts;
