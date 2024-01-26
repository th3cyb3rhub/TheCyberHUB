import React from "react";
import { useNavigate } from "react-router";

import { CardTool, CardToolHeading, ContainerTools } from "../../../Tools/ToolsElements";
// import HeadingBanner from "../../../Common/HeadingBanner/HeadingBanner";
import { CategoriesButtonData } from "./CategoriesButtonData";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";

export default function Categories() {
    const navigator = useNavigate();
    return (
        <Wrapper>
            <section>
                <ContainerTools>
                    {/* <HeadingBanner heading={"Categories"} /> */}
                    {/* <CardTool> */}
                    {CategoriesButtonData.map((type) => (
                        <CardTool
                            key={type.type}
                            onClick={() => {
                                navigator("/quiz/" + type.type);
                            }}
                        >
                            <CardToolHeading>{type.value}</CardToolHeading>
                        </CardTool>
                    ))}
                </ContainerTools>
            </section>
        </Wrapper>
    );
}
