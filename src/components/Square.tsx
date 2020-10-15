import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { SquareValue, useTicTacToeDispatch, useTicTacToeState } from '../TicTacToeContext';

const useStyles = makeStyles(() => {
    return {
        squareContainer: {
            border: '1px solid black',
            height: '33%',
            width: '33%',
            flexBasis: 'auto',
            '&:before': {
                content: '',
                paddingTop: '100%',
            },
        },
        listItemWrapper: {
            height: '100%',
            width: '100%',
        },
    };
});

export type SquareType = {
    value: SquareValue;
    index: number;
};

const Square = ({ value, index }: SquareType) => {
    const { squareContainer, listItemWrapper } = useStyles();
    const { dispatch } = useTicTacToeDispatch();
    const {
        state: { playerTurn, hasWinner },
    } = useTicTacToeState();
    const handleClick = () => {
        if (hasWinner) return;
        dispatch({ type: 'TOGGLE_SQUARE', payload: { index, value: playerTurn } });
    };

    return (
        <Grid item xs={4} className={squareContainer}>
            <ListItem button onClick={handleClick} className={listItemWrapper}>
                {value}
            </ListItem>
        </Grid>
    );
};

export default Square;
