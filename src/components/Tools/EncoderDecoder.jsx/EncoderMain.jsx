import React, { useEffect, useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import {
    Input,
    Button,
    CodeContainer,
    Container,
    MenuButton,
    MenuButtonContainer,
    MenuContainer,
} from "./EncoderElement";
import Decode from "./DecoderCode";
import EncoderCode from "./EncoderCode";

export default function EncoderMain() {
    const [activeButton, setActiveButton] = useState("Encode");
    const [input, setInput] = useState("");
    useEffect(() => {
        if (activeButton === "Encode") {
            document.getElementById("Encode").style.background = "#1A1C1D";
            document.getElementById("Decode").style.background = "transparent";
            document.getElementById("Encode/Decode").textContent = "Encode";
        } else if (activeButton === "Decode") {
            document.getElementById("Decode").style.background = "#1A1C1D";

            document.getElementById("Encode").style.background = "transparent";
            document.getElementById("Encode/Decode").textContent = "Decode";
        }
    }, [activeButton]);
    useEffect(() => {
        document.getElementById("Input").value = "";
    }, [input]);

    function InputHandle() {
        const inputValue = document.getElementById("Input").value;
        setInput(inputValue);
    }

    function ButtonClick(Button) {
        setActiveButton(Button);
    }
    return (
        <Wrapper>
            <Container>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Input id="Input" style={{ marginLeft: "0px" }} placeholder="Enter Text To Encode/Decode" />
                    <Button id="Encode/Decode" onClick={InputHandle}>
                        Encode
                    </Button>
                </div>

                <MenuContainer>
                    <MenuButtonContainer>
                        <MenuButton
                            id="Encode"
                            onClick={() => {
                                ButtonClick("Encode");
                            }}
                        >
                            Encode
                        </MenuButton>
                        <MenuButton
                            id="Decode"
                            onClick={() => {
                                ButtonClick("Decode");
                            }}
                        >
                            Decode
                        </MenuButton>
                    </MenuButtonContainer>
                    <CodeContainer>
                        {activeButton === "Encode" ? <EncoderCode Input={input || ""} /> : <Decode Input={input} />}
                    </CodeContainer>
                </MenuContainer>
            </Container>
        </Wrapper>
    );
}
