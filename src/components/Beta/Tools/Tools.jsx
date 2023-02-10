import React from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { CardTools, ContainerTools, RouterLink } from "./ToolsElements";

const Tools = () => {
    return (
        <Wrapper>
            <ContainerTools>
                <RouterLink to={"breachCheck"}>
                    <CardTools>Breach Check</CardTools>
                </RouterLink>
                <RouterLink to={"./"}>
                    <CardTools>Coming Soon</CardTools>
                </RouterLink>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
