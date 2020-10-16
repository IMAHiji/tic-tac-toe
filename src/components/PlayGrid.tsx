import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { useTicTacToeState } from '../TicTacToeContext';
import Square from './Square';

const useStyles = makeStyles(() => {
    return {
        playGridContainer: {
            width: '100vw',
            height: '100vh',
        },
        playGridList: {
            width: '50vw',
            height: '50vh',
            maxHeight: '50vh',
            display: 'flex',
            maxWidth: '50vw',
            flexWrap: 'wrap',
        },
    };
});

const PlayGrid = () => {
    const { playGridContainer, playGridList } = useStyles();
    const {
        state: { playArray, playerTurn, hasWinner, roundWinner },
    } = useTicTacToeState();

    return (
        <Grid container wrap="wrap" className={playGridContainer} justify="center" direction="column" alignContent="center">
            <Typography title="Player Turn">Player {playerTurn}&apos;s Turn</Typography>
            {hasWinner ? <Typography title="Winner Display">{roundWinner} is the winner!</Typography> : null}
            <List className={playGridList}>
                {playArray.map((item, index) => {
                    const key = `key-${index}`;
                    return <Square value={item} index={index} key={key} />;
                })}
            </List>
        </Grid>
    );
};

export default PlayGrid;
