import React from "react";
import { CodeContainer } from "./EncoderCodeElement";

function EncoderCode(props) {
    function Base64() {
        return btoa(props.Input);
    }

    function Url() {
        return encodeURIComponent(props.Input);
    }

    function fullURLEncode(url) {
        let encodedURL = encodeURI(url);
        const urlComponents = encodedURL.split("?");

        // Encode individual query parameters
        if (urlComponents.length > 1) {
            const queryString = urlComponents[1];
            const encodedQueryString = queryString
                .split("&")
                .map(function (param) {
                    const pair = param.split("=");
                    return encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]);
                })
                .join("&");

            encodedURL = urlComponents[0] + "?" + encodedQueryString;
        }

        return encodedURL;
    }

    function asciiHexEncode(inputString) {
        let hexEncoded = "";

        for (let i = 0; i < inputString.length; i++) {
            const charCode = inputString.charCodeAt(i);
            const hexValue = charCode.toString(16).toUpperCase();
            hexEncoded += ("00" + hexValue).slice(-2); // Ensure two digits per character
        }

        return hexEncoded;
    }

    function htmlEncode(inputString) {
        return inputString.replace(/[\u00A0-\u9999<>]/gim, function (i) {
            return "&#" + i.charCodeAt(0) + ";";
        });
    }

    return (
        <div>
            <CodeContainer text={Base64()} title={"Base64 Encode"} />
            <CodeContainer text={Url()} title={"Url Encode"} />
            <CodeContainer text={fullURLEncode(props.Input)} title={"Full Url Encode"} />
            <CodeContainer text={asciiHexEncode(props.Input)} title={"ASCII HEX Encode"} />
            <CodeContainer text={htmlEncode(props.Input)} title={"HTML Encode"} />
        </div>
    );
}

export default EncoderCode;
