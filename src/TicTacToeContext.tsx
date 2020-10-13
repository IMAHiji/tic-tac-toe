import * as React from 'react';

export type TicTacToeStateProviderProps = {
    children: React.ReactNode;
    state: TicTacToeState;
};
export type SquareValue = 'X' | 'O' | '';

export type TicTacToeDispatch = (action: any) => void;
export type TicTacToeState = {
    playArray: SquareValue[];
};

const TicTacToeStateContext = React.createContext<{ state: TicTacToeState } | undefined>(undefined);
const TicTacToeDispatchContext = React.createContext<{ dispatch: TicTacToeDispatch } | undefined>(undefined);

function toeReducer(state: TicTacToeState, action: TicTacToeDispatch): TicTacToeState {
    return state;
}

const intialState: TicTacToeState = {
    playArray: ['', '', '', '', '', '', '', '', ''],
};

function TicTacToeStateProvider({ children }: TicTacToeStateProviderProps) {
    const [state, dispatch] = React.useReducer(toeReducer, intialState);
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

export { useTicTacToeDispatch, useTicTacToeState, TicTacToeStateProvider };
