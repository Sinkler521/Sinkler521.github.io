import {useEffect, useRef} from "react"
import {connect, useDispatch, useSelector} from "react-redux";
import {
    selectTile,
    resetSelectedTiles,
    checkWin,
    updateScorePlayerTwo,
    updateScorePlayerOne,
    nextTurn,
    matchTiles
} from "../redux/actions/gameActions";

function Tile(props) {
    const {tile, nextTurn} = props;
    const selected = useSelector((state) =>
        state.tiles.find((t) => t.id === tile.id)?.selected
    );
    const active = useSelector((state) =>
        state.tiles.find((t) => t.id === tile.id)?.active
    );
    const selectedTiles = useSelector((state) => state.selectedTiles);
    const currentPlayer = useSelector((state) => state.currentPlayer);
    const themeColor = useSelector((state) => state.themeColor);
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (selected) {
            dispatch(selectTile(tile.id));
        }
    }, [selected, tile.id, dispatch]);

    const handleClick = () => {
        if (active && !selected && selectedTiles.length < 2) {
            dispatch(selectTile(tile.id));

            if (selectedTiles.length === 1) {
                const [firstSelectedTile] = selectedTiles;

                if (firstSelectedTile.value === tile.value) {
                    timeoutRef.current = setTimeout(() => {
                        dispatch(resetSelectedTiles());
                        if (currentPlayer === 'playerOne') {
                            dispatch(updateScorePlayerOne());
                        } else if (currentPlayer === 'playerTwo') {
                            dispatch(updateScorePlayerTwo());
                        }
                        checkWin()
                        nextTurn()
                    }, 500);
                } else {
                    timeoutRef.current = setTimeout(() => {
                        dispatch(resetSelectedTiles());
                        nextTurn()
                    }, 500);
                }
            }
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className="tile"
            style={{
                backgroundColor: active ? themeColor : 'antiquewhite',
                backgroundSize: 'cover',
                backgroundImage: selected ? `url(${tile.image})` : 'none',
            }}
            onClick={handleClick}
            onTouchEnd={handleClick}
        ></div>
    );
}


const mapTileStateToProps = (state) => {
    return {
        tiles: state.tiles,
        selectedTiles: state.selectedTiles,
        currentPlayer: state.currentPlayer,
        themeColor: state.themeColor,
    };
};

const mapTileDispatchToProps = (dispatch) => {
    return {
        selectTile: (id) => dispatch(selectTile(id)),
        matchTiles: () => dispatch(matchTiles()),
        checkWin: () => dispatch(checkWin()),
        nextTurn: () => dispatch(nextTurn()),
        updateScorePlayerOne: () => dispatch(updateScorePlayerOne()),
        updateScorePlayerTwo: () => dispatch(updateScorePlayerTwo()),
        resetSelectedTiles: () => dispatch(resetSelectedTiles()),
    };
};

export const ConnectedTile = connect(mapTileStateToProps, mapTileDispatchToProps)(Tile);