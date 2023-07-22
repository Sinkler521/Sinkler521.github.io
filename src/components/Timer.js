import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {checkWin} from "../redux/actions/gameActions";

function Timer() {
    const [time, setTime] = useState(0);
    const winner = useSelector((state) => state.winner);

    useEffect(() => {
        let interval;

        if (winner === "") {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [winner]);

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

const mapTileStateToProps = (state) => {
    return {
        winner: state.winner
    };
};

const mapTileDispatchToProps = (dispatch) => {
    return {
        checkWin: () => dispatch(checkWin()),
    };
};

export const ConnectedTimer = connect(mapTileStateToProps, mapTileDispatchToProps)(Timer);