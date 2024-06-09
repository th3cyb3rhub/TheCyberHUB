import { CodeContainer } from "./EncoderCodeElement";
import React from "react";

export default function Decode(props) {
    function UrlDecode(input) {
        try {
            return decodeURIComponent(input);
        } catch (err) {
            console.error("Error in UrlDecode:", err);
            return "Error decoding URL";
        }
    }

    function DecodeBase64() {
        try {
            return atob(props.Input);
        } catch (err) {
            console.error("Error in DecodeBase64:", err);
            return "Error decoding Base64";
        }
    }

    function htmlDecode() {
        try {
            const doc = new DOMParser().parseFromString(props.Input, "text/html");
            return doc.documentElement.textContent;
        } catch (err) {
            console.error("Error in htmlDecode:", err);
            return "Error decoding HTML";
        }
    }

    function hexDecode(hexString) {
        let decodedString = "";
        for (let i = 0; i < hexString.length; i += 2) {
            const hexPair = hexString.substr(i, 2);
            const decimalValue = parseInt(hexPair, 16);
            decodedString += String.fromCharCode(decimalValue);
        }
        return decodedString;
    }

    return (
        <div>
            <CodeContainer text={DecodeBase64()} title={"Base64 Decode"} />
            <CodeContainer text={UrlDecode(props.Input)} title={"Url Decode"} />
            <CodeContainer text={htmlDecode(props.Input)} title={"HTML Decode"} />
            <CodeContainer text={hexDecode(props.Input)} title={"ASCII HEX Decode"} />
        </div>
    );
}
