import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Square, { SquareType, SquareValue } from './Square';

const useStyles = makeStyles(() => {
    return {
        playGridContainer: {
            width: '100vw',
        },
        playGridList: {
            width: '100%',
            display: 'flex',
            maxWidth: '50vw',
            flexWrap: 'wrap',
        },
    };
});

const PlayGrid = () => {
    const { playGridContainer, playGridList } = useStyles();
    const initialArray: SquareType['value'][] = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    ];
    const [playArray, setPlayArray] = React.useState<SquareType['value'][]>(
        initialArray
    );
    const [playerTurn, setPlayerTurn] = React.useState<SquareValue>('X');
    const [haveWinner, setHaveWinner] = React.useState<boolean>(false);

    const togglePlayerTurn = () => {
        return setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
    };
    const handleChangeValue = (index: number) => {
        if (haveWinner) {
            return;
        }
        const newArray = [...playArray];
        if (newArray[index]) return;
        if (playerTurn === 'X') {
            newArray[index] = 'X';
            setPlayArray(newArray);
        } else {
            newArray[index] = 'O';
            setPlayArray(newArray);
        }
        togglePlayerTurn();
    };

    React.useEffect(() => {
        const winA = [playArray[0], playArray[1], playArray[2]];
        const winB = [playArray[0], playArray[3], playArray[6]];
        const winC = [playArray[3], playArray[4], playArray[5]];
        const winD = [playArray[6], playArray[7], playArray[8]];
        const winE = [playArray[0], playArray[4], playArray[8]];
        const winF = [playArray[2], playArray[4], playArray[6]];
        const winG = [playArray[2], playArray[5], playArray[8]];
        const checkArray = [winA, winB, winC, winD, winE, winF, winG];
        checkArray.forEach((arrayElement: SquareValue[]) => {
            const hasXwin = arrayElement.every(
                (element: SquareValue) => element === 'X'
            );
            const hasOwin = arrayElement.every(
                (element: SquareValue) => element === 'O'
            );
            if (hasXwin) {
                setHaveWinner(true);
            } else if (hasOwin) {
                setHaveWinner(true);
            }
        });

        // const hasXwin = winA.every((element: SquareValue) => element === 'X');
        // const hasOwin = winA.every((element: SquareValue) => element === 'O');
    }, [playArray]);

    return (
        <Grid
            container
            wrap="wrap"
            className={playGridContainer}
            justify="center">
            <Typography>Player {playerTurn} &apos;s Turn</Typography>
            <Typography>{haveWinner ? 'WINNER~!' : null}</Typography>
            <List className={playGridList}>
                {playArray.map((item, index) => {
                    const key = `key-${index}`;
                    return (
                        <Square
                            value={item}
                            setValue={handleChangeValue}
                            index={index}
                            key={key}
                        />
                    );
                })}
            </List>
        </Grid>
    );
};

export default PlayGrid;
