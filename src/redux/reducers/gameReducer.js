import {getPicture} from "../../assets/images/getPicture.js";
import {checkWin} from "../actions/gameActions.js";

const types = require('../types.js')

// this code creates shuffled tiles which are used to initiate gameboard view
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const tileValues = Array.from({length: 8}, (_, index) => index + 1);
const tiles = [];

for (let i = 0; i < 8; i++) {
    const tileA = {
        id: i + 1,
        value: tileValues[i],
        active: true,
        matched: false,
        selected: false,
        image: getPicture(i + 1)
    };
    const tileB = {
        id: i + 9,
        value: tileValues[i],
        active: true,
        matched: false,
        selected: false,
        image: getPicture(i + 1)
    };
    tiles.push(tileA, tileB);
}

const shuffledTiles = shuffleArray(tiles);

const initialState = {
    tiles: shuffledTiles,
    selectedTiles: [],
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
    currentPlayer: "playerOne",
    themeColor: "#78f3c9",
    winner: '',
};

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SELECT_TILE:
            const {id} = action.payload;
            const updatedAllTiles = state.tiles.map((tile) => {
                if (tile.id === id) {
                    return {...tile, selected: true};
                }
                return tile;
            });

            // for selected tiles
            const allSelectedTiles = state.tiles
                .map((tile) => (tile.selected ? tile : null))
                .filter(Boolean);

            return {
                ...state,
                tiles: updatedAllTiles,
                selectedTiles: allSelectedTiles,
            };
        case types.RESET_GAME:
            return {
                ...initialState,
                tiles: state.tiles.map((tile) => ({...tile, active: true, matched: false})),
            };
        case types.UPDATE_SCORE_PLAYER_ONE:
            return {
                ...state,
                scorePlayerOne: state.scorePlayerOne + 1,
            };
        case types.UPDATE_SCORE_PLAYER_TWO:
            return {
                ...state,
                scorePlayerTwo: state.scorePlayerTwo + 1,
            };
        case types.RESET_SELECTED_TILES:
            const nonSelectedTiles = state.tiles.map((tile) => {
                if (
                    state.selectedTiles.length === 2 &&
                    state.selectedTiles[0].value === state.selectedTiles[1].value &&
                    tile.value === state.selectedTiles[0].value
                ) {
                    return {
                        ...tile,
                        active: false,
                        selected: false
                    };
                } else {
                    return {
                        ...tile,
                        selected: false
                    };
                }
            });

            checkWin()

            return {
                ...state,
                selectedTiles: [],
                tiles: nonSelectedTiles
            };
        case types.NEXT_TURN:
            if (state.currentPlayer === "playerOne") {
                return {
                    ...state,
                    currentPlayer: "playerTwo"
                };
            } else {
                return {
                    ...state,
                    currentPlayer: "playerOne"
                }
            }
        case types.CHECK_WIN:
            let winner = '';
            if (state.scorePlayerOne >= 5) {
                winner = 'winner: Player one';
            } else if (state.scorePlayerTwo >= 5) {
                winner = 'winner: Player two';
            } else if (state.scorePlayerTwo === 4 && state.scorePlayerOne === 4) {
                winner = 'Tie';
            }

            const endGameTiles = state.tiles.map((tile) => {
                return {
                    ...tile,
                    active: false
                }
            })

            return {
                ...state,
                tiles: endGameTiles,
                winner: winner,
            };
        case types.CHANGE_THEME_COLOR:
            return {
                ...state,
                themeColor: action.payload,
            };
        default:
            return state;
    }
}