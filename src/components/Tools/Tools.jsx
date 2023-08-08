import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { CardToolHeading, CardTools, ContainerTools, RouterLink } from "./ToolsElements";

import { RiEarthFill } from "react-icons/ri";

const Tools = () => {
    return (
        <Wrapper>
            <ContainerTools>
                <RouterLink to={"subdomain-finder"}>
                    <CardTools>
                        <CardToolHeading>
                            <RiEarthFill /> Subdomain Finder
                        </CardToolHeading>
                    </CardTools>
                </RouterLink>
                {/* <RouterLink to={"breach-check"}> */}
                {/*    <CardTools> */}
                {/*        <CardToolHeading> */}
                {/*            <RiEarthFill /> Breach Check */}
                {/*        </CardToolHeading> */}
                {/*    </CardTools> */}
                {/* </RouterLink> */}
                {/* <RouterLink to={"portScanner"}> */}
                {/*    <CardTools> */}
                {/*        <CardToolHeading> */}
                {/*            <CgOpenCollective/> Port Scanner */}
                {/*        </CardToolHeading> */}
                {/*    </CardTools> */}
                {/* </RouterLink> */}
                <RouterLink to={"./"}>
                    <CardTools>
                        <CardToolHeading>Coming Soon</CardToolHeading>
                    </CardTools>
                </RouterLink>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
