const encodeCode = ({ type, code }) => {
    const payload = code;

    let encodedValue;

    switch (type) {
        case "base64":
            encodedValue = btoa(payload);
            break;
        case "url":
            encodedValue = encodeURIComponent(payload);
            break;
        default:
            console.error("Invalid encoding type");
            return;
    }

    return encodedValue;
};

export default encodeCode;
