import * as React from 'react';

export type SquareValue = 'X' | 'O' | '';

export type TTTSTtate = {
    playArray: SquareValue[];
    playerTurn: SquareValue;

    hasWinner: boolean;
    winningPath: number[];
    roundWinner: SquareValue;
};

export type TTTStateProviderProps = {
    children: React.ReactNode;
    state: TTTSTtate;
};

export type TTTAction = { type: 'TOGGLE_SQUARE'; payload: { index: number; value: SquareValue } };

export type TTTDIspatch = (action: TTTAction) => void;

const TicTacToeStateContext = React.createContext<{ state: TTTSTtate } | undefined>(undefined);
const TicTacToeDispatchContext = React.createContext<{ dispatch: TTTDIspatch } | undefined>(undefined);

function toeReducer(state: TTTSTtate, { type, payload }: any): TTTSTtate {
    const { playArray, playerTurn } = state;
    console.log(type);
    switch (type) {
        case 'TOGGLE_SQUARE': {
            const updatedPlayArray: SquareValue[] = playArray;
            updatedPlayArray[payload.index] = payload.value;
            const { hasWinner, winningPath, roundWinner } = checkForWinner(updatedPlayArray);
            return {
                ...state,
                playArray: updatedPlayArray,
                playerTurn: playerTurn === 'X' ? 'O' : 'X',
                hasWinner,
                winningPath,
                roundWinner,
            };
        }
        default:
            return state;
    }
}

function TicTacToeDataProvider({ children, state: initialState }: TTTStateProviderProps) {
    const [state, dispatch] = React.useReducer(toeReducer, initialState);
    const MemoizedValues = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <TicTacToeStateContext.Provider value={{ state: MemoizedValues.state }}>
            <TicTacToeDispatchContext.Provider value={{ dispatch: MemoizedValues.dispatch }}>{children}</TicTacToeDispatchContext.Provider>
        </TicTacToeStateContext.Provider>
    );
}

function useTicTacToeState() {
    const context = React.useContext(TicTacToeStateContext);
    if (context === undefined) {
        throw new Error('Must be used inside a TicTacToe Context Provider');
    }
    return context;
}

function useTicTacToeDispatch() {
    const context = React.useContext(TicTacToeDispatchContext);
    if (context === undefined) {
        throw new Error('Must be used inside a TicTacToe Context Provider');
    }
    return context;
}

function checkForWinner(playArray: SquareValue[]) {
    // TODO: holy crap I hate this make it more durable.
    const winA = [playArray[0], playArray[1], playArray[2]];
    const winB = [playArray[0], playArray[3], playArray[6]];
    const winC = [playArray[3], playArray[4], playArray[5]];
    const winD = [playArray[6], playArray[7], playArray[8]];
    const winE = [playArray[0], playArray[4], playArray[8]];
    const winF = [playArray[2], playArray[4], playArray[6]];
    const winG = [playArray[2], playArray[5], playArray[8]];
    const checkArray = [winA, winB, winC, winD, winE, winF, winG];
    const winPaths: number[][] = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [2, 5, 8],
    ];

    let winningIndex: number;
    let roundWinner: SquareValue = '';
    let hasWinner = false;
    let winningPath: number[] = [];
    checkArray.forEach((arrayElement: SquareValue[], index) => {
        const hasXwin = arrayElement.every((element: SquareValue) => element === 'X');
        const hasOwin = arrayElement.every((element: SquareValue) => element === 'O');
        if (hasXwin) {
            winningIndex = index;
            roundWinner = 'X';
            winningPath = winPaths[winningIndex];
            hasWinner = true;
        } else if (hasOwin) {
            winningIndex = index;
            roundWinner = 'O';
            winningPath = winPaths[winningIndex];
            console.log('index', index);
            hasWinner = true;
        }
    });

    return { hasWinner, winningPath, roundWinner };
}

export { useTicTacToeDispatch, useTicTacToeState, TicTacToeDataProvider };
