import React, { useEffect, useState } from "react";

const TimeToStart = ({ ctfDate }) => {
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const targetTime = new Date(ctfDate).getTime();
            const timeDifference = targetTime - now;
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setTimeRemaining({ hours, minutes, seconds });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [ctfDate]);

    return (
        <h1>
            CTF will start in {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds}{" "}
            seconds
        </h1>
    );
};

export default TimeToStart;
