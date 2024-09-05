import React from "react";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import { ParticipantsContainer } from "./ParticipantsDisplayElement";

const ParticipantsDisplay = ({ participants = [] }) => {
    return (
        <ParticipantsContainer>
            <div className="details-profile">
                {participants.map((participant, pIndex) => (
                    <img
                        src={cdnContentImagesUrl("/user/" + (participant?.avatar || "avatar.png"))}
                        alt={participant?.name}
                        key={pIndex}
                    />
                ))}
            </div>
        </ParticipantsContainer>
    );
};
export default ParticipantsDisplay;
