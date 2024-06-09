import React, { useEffect, useState } from "react";
import { getApiUrl } from "src/features/apiUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SettingsForm() {
    const { user } = useSelector((state) => state.auth);
    const API_BASE_URL = getApiUrl("api/aiChat");

    const [geminiProApiKey, setApiKey] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        fetchApiKey();
    }, []);

    async function fetchApiKey() {
        const response = await axios.get(
            `${API_BASE_URL}/getApiKey`,

            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            },
        );
        setApiKey({
            value: response.data,
            error: "",
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!geminiProApiKey.value) {
            return setApiKey((curr) => ({
                ...curr,
                error: "Api Key required!",
            }));
        }

        const response = await axios.post(
            `${API_BASE_URL}/createApiKey`,
            {
                geminiProApiKey: geminiProApiKey.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            },
        );

        if (response.data.geminiProApiKey) {
            toast("Successfully updated API Key");
        }
    }

    function handleChange(e, setState) {
        setState(() => ({
            value: e.target.value,
            error: "",
        }));
    }

    return (
        <form onSubmit={handleSubmit} className="settings-profile-form">
            <div className="settings-profile-input-wrapper">
                <label htmlFor="geminiProApiKey">Api Key</label>
                <br />
                <input
                    type="text"
                    value={geminiProApiKey.value || ""}
                    id="geminiProApiKey"
                    name="geminiProApiKey"
                    placeholder="Your API key"
                    onChange={(e) => handleChange(e, setApiKey)}
                />
            </div>
            <button type="submit" className="settings-profile-form-submitbtn">
                Submit
            </button>
        </form>
    );
}
