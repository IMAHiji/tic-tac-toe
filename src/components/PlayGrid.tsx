import React from 'react';
import { useTicTacToeState } from '../TicTacToeContext';
import Square from './Square';
import './playgrid.css';

const PlayGrid = () => {
    const {
        state: { playArray, playerTurn, hasWinner, roundWinner },
    } = useTicTacToeState();

    return (
        <div className="appWrapper">
            <p title="Player Turn">Player {playerTurn}&apos;s Turn</p>
            {hasWinner ? <p title="Winner Display">{roundWinner} is the winner!</p> : null}
            <div className="gridContainer">
                {playArray.map((item, index) => {
                    const key = `key-${index}`;
                    return <Square value={item} index={index} key={key} />;
                })}
            </div>
        </div>
    );
};

export default PlayGrid;
