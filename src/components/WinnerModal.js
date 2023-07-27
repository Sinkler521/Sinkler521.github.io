import React from 'react';
import {useSelector, connect} from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import {nextTurn} from "../redux/actions/gameActions";

const WinnerModal = () => {
    const winner = useSelector(state => state.winner);

    const restartGame = () =>{
        window.location.reload()
    }
    return (
        <Modal show={winner !== ''} onHide={restartGame} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: 'center'}}>
                <p>The winner is: {winner}</p>
            </Modal.Body>
            <Modal.Footer style={{display: "flex", justifyContent: 'center'}}>
                <Button variant="success" onClick={restartGame} style={{fontWeight: "bold"}}>
                    New Game
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapTileStateToProps = (state) => {
    return {
        winner: state.winner,
    };
};

const mapTileDispatchToProps = (dispatch) => {
    return {
        nextTurn: () => dispatch(nextTurn()),
    };
};

export const ConnectedWinnerModal = connect(mapTileStateToProps, mapTileDispatchToProps)(WinnerModal);
