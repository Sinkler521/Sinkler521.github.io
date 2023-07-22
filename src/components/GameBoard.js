import {useDispatch, useSelector, connect} from "react-redux";
import {Header} from "./Header.js"
import {ConnectedTile} from "./Tile.js"
import {checkWin, changeThemeColor, selectTile, matchTiles, nextTurn} from "../redux/actions/gameActions";
import {useEffect} from "react";

function GameBoard(props) {
    const tiles = useSelector((state) => state.tiles);
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => state.currentPlayer)
    const winner = useSelector((state) => state.winner)
    const scorePlayerOne = useSelector((state) => state.scorePlayerOne)
    const scorePlayerTwo = useSelector((state) => state.scorePlayerTwo)

    useEffect(() => {
        if (scorePlayerOne >= 5 || scorePlayerTwo >= 5 || (scorePlayerOne === 4 && scorePlayerTwo === 4)) {
            dispatch(checkWin())
        }
    }, [dispatch, winner, scorePlayerOne, scorePlayerTwo])

    const handleChangeThemeColor = (color) => {
        dispatch(changeThemeColor(color));
    };

    const newGame = () => {
        document.location.reload()
    }

    return (
        <>
            <Header changeThemeColor={handleChangeThemeColor} newGame={newGame} turn={currentPlayer} winner={winner}/>
            <section>
                <div className="row xl-mt-5">
                    <div className="col xl-mt-5"></div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="game_wrap">
                            <div className="game_board">
                                {tiles.map((tile) => (
                                    <ConnectedTile key={tile.id} tile={tile} nextTurn={nextTurn}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-xl-none d-lg-none d-md-none d-sm-flex d-flex">
                    <div className="col justify-content-center align-items-center d-flex">
                        <button className="btn btn-success mb-4" onClick={newGame} onTouchEnd={newGame}>Restart</button>
                    </div>
                </div>
            </section>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        tiles: state.tiles,
        currentPlayer: state.currentPlayer,
        themeColor: state.themeColor,
        winner: state.winner,
        scorePlayerOne: state.scorePlayerOne,
        scorePlayerTwo: state.scorePlayerTwo,
    };
};

const mapDispatchToProps = {
    selectTile,
    matchTiles,
    checkWin,
};

const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);

export default ConnectedGameBoard;