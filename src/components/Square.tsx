import * as React from 'react';
import { SquareValue, useTicTacToeDispatch, useTicTacToeState } from '../TicTacToeContext';
import './square.css';

export type SquareType = {
    value: SquareValue;
    index: number;
};

const Square = ({ value, index }: SquareType) => {
    const { dispatch } = useTicTacToeDispatch();
    const {
        state: { playerTurn, hasWinner },
    } = useTicTacToeState();
    const handleClick = () => {
        if (hasWinner) return;
        dispatch({ type: 'TOGGLE_SQUARE', payload: { index, value: playerTurn } });
    };

    return (
        <div className="square" role="button" onKeyPress={handleClick} onClick={handleClick} title={`Position ${index} square`} tabIndex={0}>
            {value}
        </div>
    );
};

export default Square;
