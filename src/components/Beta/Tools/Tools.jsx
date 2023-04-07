import React from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { CardTools, ContainerTools, RouterLink } from "./ToolsElements";

const Tools = () => {
    return (
        <Wrapper>
            <ContainerTools>
                <RouterLink to={"subdomainFinder"}>
                    <CardTools>Subdomain Finder</CardTools>
                </RouterLink>
                <RouterLink to={"./"}>
                    <CardTools>Coming Soon</CardTools>
                </RouterLink>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
