import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const StreakBox = () => {
    const [streakCount, setStreakCount] = useState(0);
    const [progress, setProgress] = useState(0);

    const updateStreak = () => {
        const newStreakCount = streakCount + 1;
        setStreakCount(newStreakCount);
        const newProgress = (newStreakCount / 7) * 100; // assuming a 7-day streak
        setProgress(newProgress);
    };

    // Chart data and options
    const data = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
            {
                label: "Streak Progress",
                data: [0, 0, 0, 0, 0, 0, progress],
                fill: false,
                borderColor: "#007bff", // blue color
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="streak-box">
            <h2 className="streak-count">{streakCount}</h2>
            <p className="streak-text">Days in a row</p>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ height: `${progress}%` }}></div>
            </div>
            <Line data={data} options={options} />
            <button className="streak-button" onClick={updateStreak}>
                Complete Task
            </button>
        </div>
    );
};

export default StreakBox;
