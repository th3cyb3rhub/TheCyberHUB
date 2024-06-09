import React, { useState } from "react";
import axios from "axios";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { getApiUrl } from "src/features/apiUrl";

const Dorking = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(getApiUrl("api/tool/dorking"), { query });
            setResults(response.data);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleChange} style={{ color: "black" }} />
                <button type="submit">Search</button>
            </form>
            {results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            <a href={result.link} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                                <p>
                                    {index + 1} {result.link}
                                </p>
                                {/* <p>{result.title}</p> */}
                                {/* <p>{result.snippet}</p> */}
                                {/* <p>-------------</p> */}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </Wrapper>
    );
};

export default Dorking;
