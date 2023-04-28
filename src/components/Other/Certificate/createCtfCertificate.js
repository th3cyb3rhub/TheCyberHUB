import axios from "axios";
import { getApiUrl } from "../../../features/apiUrl";

const createCtfCertificate = async ({ ctf, ctfId, userId, ctfDate, username, fullName, email }) => {
    const ctfCertificate = {
        ctf,
        ctfId,
        user: userId,
        ctfDate,
        username,
        fullName,
        email,
        issueDate: new Date(Date.now()).toISOString(),
        description: `Congratulations on successfully completing ${ctf} and demonstrating your skills in cybersecurity`,
        kind: "rooted",
    };

    try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios
            .post(getApiUrl(`api/ctfCertificate/createCtfCertificate`), ctfCertificate, config)
            .then((response) => {})
            .catch((error) => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
};

export default createCtfCertificate;
