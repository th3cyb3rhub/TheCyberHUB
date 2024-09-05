import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CardTool, CardToolHeading, CardTools, ContainerTools, RouterLink, ToolIcon } from "./ToolsElements";
import { GoFileBinary } from "react-icons/go";
import { GiNautilusShell, GiTridentShield } from "react-icons/gi";
import { MdPassword } from "react-icons/md";
import { TbHash } from "react-icons/tb";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";
import { RiEarthFill } from "react-icons/ri";
import { FaGoogle, FaInternetExplorer } from "react-icons/fa";

const Tools = () => {
    const tools = [
        { name: "Reconage", link: "/dashboard/reconage", icon: <GiTridentShield /> },
        { name: "Rev Shell", desc: "Reverse Shell Generator", link: "/tools/revshell", icon: <GiNautilusShell /> },
        { name: "Bin Exploit", link: "/tools/binexploits", icon: <GoFileBinary /> },
        { name: "Encoder", link: "/tools/encoder", icon: <TbHash /> },
        { name: "Google Dork", link: "/tools/googledorks", icon: <FaGoogle /> },
        { name: "Pass Gen", link: "/tools/passgen", icon: <MdPassword /> },
        { name: "Breach Check", link: "/tools/breachcheck", icon: <RiEarthFill /> },
        { name: "IP Info", link: "/tools/ipinfo", icon: <FaInternetExplorer /> },
        { name: "Sub Generator", link: "/tools/subdomain-generator", icon: <FaInternetExplorer /> },
        { name: "Markdown Editor", link: "/tools/markdown-editor", icon: <FaInternetExplorer /> },

        // {name: "Binary Exploits", link: "/tools/binaryexploitation", icon: <RiEarthFill/>,},
        // {name: "jwt Decoder", link: "/tools/jwtdecoder", icon: <RiEarthFill/>,},
        // {name: "Hash Cracker", link: "/tools/hashcracker", icon: <RiEarthFill/>,},
        // {name: "Port Scanner", link: "/tools/portScanner", icon: <RiEarthFill/>,},
    ];
    return (
        <Wrapper>
            <ContainerTools>
                <HeadingBanner heading={"Hacking ReconTools"} />
                <CardTools>
                    {tools.slice(0, 1).map((tool, index) => {
                        return (
                            <RouterLink to={tool.link} key={index}>
                                <CardTool style={{ width: 450, justifyContent: "center" }}>
                                    <ToolIcon style={{ fontSize: "50px" }}>{tool.icon}</ToolIcon>
                                    <CardToolHeading style={{ fontSize: "46px" }}>{tool.name}</CardToolHeading>
                                    <ToolIcon style={{ fontSize: "50px" }}>{tool.icon}</ToolIcon>
                                </CardTool>
                            </RouterLink>
                        );
                    })}
                </CardTools>
                <CardTools>
                    {tools.slice(1).map((tool, index) => {
                        return (
                            <RouterLink to={tool.link} key={index}>
                                <CardTool>
                                    <ToolIcon>{tool.icon}</ToolIcon>
                                    <CardToolHeading>{tool.name}</CardToolHeading>
                                </CardTool>
                            </RouterLink>
                        );
                    })}
                </CardTools>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
