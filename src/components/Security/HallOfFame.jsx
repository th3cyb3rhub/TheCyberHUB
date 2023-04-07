import React from "react";

const HallOfFame = () => {
    const entries = [
        { name: "John Doe", description: "Discovered SQL injection vulnerability" },
        { name: "Jane Smith", description: "Reported cross-site scripting (XSS) vulnerability" },
    ];

    return (
        <div>
            <h1>Hall of Fame</h1>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.name}</strong> - {entry.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HallOfFame;
