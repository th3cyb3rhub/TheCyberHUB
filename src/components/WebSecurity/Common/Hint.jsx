import React from "react";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { HintContainer, HintIcon } from "./HintElements";

const Hint = () => {
    return (
        <HintContainer>
            <HintContainer>Show Hint</HintContainer>
            <HintIcon>
                <RiLightbulbFlashFill />
            </HintIcon>
            {/* <RiLightbulbFill/> */}
        </HintContainer>
    );
};

export default Hint;
