import {useSelector} from "react-redux";
import {Timer} from './Timer.js'

export function Header(props) {

    const scorePlayerOne = useSelector((state) => state.scorePlayerOne);
    const scorePlayerTwo = useSelector((state) => state.scorePlayerTwo);


    return (
        <header>
            <nav className="navbar fixed-top navbar-light bg-success">
                <div className="container-fluid">
                    <div className="row w-100 m-0 p-0">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
                            <span className="navbar-brand fw-bolder text-light">Guesstiles game</span>
                        </div>
                        <div
                            className="col-xl-3 col-lg-3 col-md-3 col-sm-12 text-center d-flex align-items-center justify-content-evenly">
                            <span
                                className="mt-xl-0 mt-lg-0 mt-md-0 mt-sm-2 mt-2 text-decoration-none text-light">{scorePlayerOne}</span>
                            <span
                                className="mt-xl-0 mt-lg-0 mt-md-0 mt-sm-2 mt-2 text-decoration-none text-light">{props.winner !== '' ? props.winner : props.turn}</span>
                            <span
                                className="mt-xl-0 mt-lg-0 mt-md-0 mt-sm-2 mt-2 text-decoration-none text-light">{scorePlayerTwo}</span>
                        </div>
                        <div
                            className="col-xl-3 col-lg-3 col-md-3 col-sm-12 align-items-center d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                            <span
                                className="text-light text-decoration-none mt-xl-0 mt-lg-0 mt-md-0 mt-sm-2 mt-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-2 mb-2"><Timer/></span>
                            <button onClick={props.newGame} onTouchEnd={props.newGame}
                                    className="btn btn-sm btn-light shadow-sm fw-bold ms-lg-4 ms-md-0 ms-sm-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">Restart
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
