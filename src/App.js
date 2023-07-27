import './app.css';
import {connect} from 'react-redux'
import ConnectedGameBoard from "./components/GameBoard.js";
import {selectTile, matchTiles} from "./redux/actions/gameActions.js";
import {ConnectedWinnerModal} from "./components/WinnerModal";

function App() {
  return (
      <div className="App container-fluid ps-0 pe-0 ms-0 me-0 app_container">
        <ConnectedWinnerModal/>
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
