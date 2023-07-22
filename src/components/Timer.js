import {useEffect, useState} from "react";

export function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    };

    const addZero = (number) => {
        if (number <= 9) {
            return `0${number}`;
        } else {
            return number;
        }
    };

    return <div className="timer">{formatTime(time)}</div>;
}