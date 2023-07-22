import './app.css';
import {connect} from 'react-redux'
import ConnectedGameBoard from "./components/GameBoard.js";
import {selectTile, matchTiles} from "./redux/actions/gameActions.js";

function App() {
  return (
      <div className="App container-fluid">
        <ConnectedGameBoard />
      </div>
  );
}

const mapStateToProps = state => {
  return {
    tiles: state.tiles,
    currentPlayer: state.currentPlayer
  };
};

const mapDispatchToProps = {
  selectTile,
  matchTiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
