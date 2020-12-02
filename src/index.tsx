import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import App from './App';
import { TicTacToeDataProvider, TTTSTtate } from './TicTacToeContext';
import './index.css';

const initialState: TTTSTtate = {
    playArray: ['', '', '', '', '', '', '', '', ''],
    playerTurn: 'X',
    hasWinner: false,
    winningPath: [],
    roundWinner: '',
};

ReactDOM.render(
    <React.StrictMode>
        <TicTacToeDataProvider state={initialState}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </TicTacToeDataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
