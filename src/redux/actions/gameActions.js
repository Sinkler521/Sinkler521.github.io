const types = require('../types.js')
export function selectTile(id) {
    return {
        type: types.SELECT_TILE,
        payload: {id},
    };
}

export function matchTiles() {
    return {
        type: types.MATCH_TILES,
    };
}

export function resetGame() {
    return {
        type: types.RESET_GAME,
    };
}

export function updateScorePlayerOne() {
    return {
        type: types.UPDATE_SCORE_PLAYER_ONE,
    };
}

export function updateScorePlayerTwo() {
    return {
        type: types.UPDATE_SCORE_PLAYER_TWO,
    };
}

export function resetSelectedTiles() {
    return {
        type: types.RESET_SELECTED_TILES,
    };
}

export function checkWin(){
    return {
        type: types.CHECK_WIN,
    }
}

export function changeThemeColor(color) {
    return {
        type: types.CHANGE_THEME_COLOR,
        payload: color,
    };
}

export function nextTurn(){
    return{
        type: types.NEXT_TURN,
    }
}