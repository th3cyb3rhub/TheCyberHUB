import React from "react";

const PromptCard = ({ prompt, handleSendDummyMessage, index }) => {
    return (
        <button
            key={index}
            onClick={() => {
                handleSendDummyMessage(`${prompt.title}, ${prompt.description}`);
            }}
            className="border-solid w-full p-2.5 border-2 border-[#252525] rounded-lg hover:outline-red-500 hover:bg-[#252525] "
        >
            <p>
                {prompt.title} <br />
                <span className="opacity-50">{prompt.description}</span>
            </p>
        </button>
    );
};

export default PromptCard;
