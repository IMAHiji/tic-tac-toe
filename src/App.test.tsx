import * as React from 'react';

import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TicTacToeDataProvider, TTTSTtate } from './TicTacToeContext';
import theme from './theme';
import App from './App';

const initialState: TTTSTtate = {
    playArray: ['', '', '', '', '', '', '', '', ''],
    playerTurn: 'X',
    hasWinner: false,
    winningPath: [],
    roundWinner: '',
};

function Renderer() {
    return (
        <div>
            <TicTacToeDataProvider state={initialState}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </TicTacToeDataProvider>
        </div>
    );
}

function NoProviderRenderer() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </div>
    );
}

describe('Tic Tac Toe App', () => {
    afterEach(() => {
        cleanup();
        jest.resetModules();
    });
    test('Renders 9 squares', () => {
        const { getAllByTitle } = render(<Renderer />);
        const squares = getAllByTitle(/\bPosition\b.*\bsquare\b/);
        expect(squares.length).toBe(9);
    });

    test('Starts with player X as start', () => {
        const { getByTitle } = render(<Renderer />);
        expect(getByTitle('Player Turn').textContent).toBe("Player X's Turn");
    });
    test('When it is player X\'s turn clicking a square renders an "X"', () => {
        const { getAllByTitle, getByTitle } = render(<Renderer />);
        const squares = getAllByTitle(/\bPosition\b.*\bsquare\b/);
        userEvent.click(squares[0]);
        expect(getByTitle('Player Turn').textContent).toBe("Player O's Turn");
        expect(squares[0].textContent).toBe('X');
    });
    test('When it is player O\'s turn clicking a square renders an "O"', () => {
        const { getAllByTitle, getByTitle } = render(<Renderer />);
        const squares = getAllByTitle(/\bPosition\b.*\bsquare\b/);
        userEvent.click(squares[0]);
        userEvent.click(squares[1]);
        expect(getByTitle('Player Turn').textContent).toBe("Player X's Turn");
        expect(squares[1].textContent).toBe('O');
    });
    test('Correctly reports an X winner if a win condition is met', async () => {
        const { getAllByTitle, findByTitle } = render(<Renderer />);
        const squares = getAllByTitle(/\bPosition\b.*\bsquare\b/);
        // Player X turn
        userEvent.click(squares[0]);
        // Player O turn
        userEvent.click(squares[3]);
        // Player X turn
        userEvent.click(squares[1]);
        // PLayer O Turn
        userEvent.click(squares[6]);
        // Player X Turn -- should win here
        userEvent.click(squares[2]);
        const winnerDisplay = await findByTitle('Winner Display');
        expect(winnerDisplay.textContent).toBe('X is the winner!');
    });

    test('Does not fire toggle square if there is a winner already', async () => {
        const { getAllByTitle } = render(<Renderer />);
        const squares = getAllByTitle(/\bPosition\b.*\bsquare\b/);
        // Player X turn
        userEvent.click(squares[0]);
        // Player O turn
        userEvent.click(squares[3]);
        // Player X turn
        userEvent.click(squares[1]);
        // PLayer O Turn
        userEvent.click(squares[6]);
        // Player X Turn -- should win here
        userEvent.click(squares[2]);
        // Player O turn, but should not change the square value because a winner is present
        userEvent.click(squares[4]);
        expect(squares[4].textContent).toBe('');
    });
    test('Throws an error if you try to use TicTacToe State out of context', async () => {
        const noContext = () => render(<NoProviderRenderer />);
        expect(noContext).toThrow();
    });
});
