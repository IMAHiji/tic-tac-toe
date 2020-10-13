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
    const initialArray: SquareType['value'][] = ['', '', '', '', '', '', '', '', ''];
    const [playArray, setPlayArray] = React.useState<SquareType['value'][]>(initialArray);
    const [winningIndices, setWinningIndices] = React.useState<number>(99);
    const [winner, setWinner] = React.useState<SquareValue>();
    const [playerTurn, setPlayerTurn] = React.useState<SquareValue>('X');
    const [haveWinner, setHaveWinner] = React.useState<boolean>(false);
    const winA = React.useMemo(() => [playArray[0], playArray[1], playArray[2]], [playArray]);
    const winB = React.useMemo(() => [playArray[0], playArray[3], playArray[6]], [playArray]);
    const winC = React.useMemo(() => [playArray[3], playArray[4], playArray[5]], [playArray]);
    const winD = React.useMemo(() => [playArray[6], playArray[7], playArray[8]], [playArray]);
    const winE = React.useMemo(() => [playArray[0], playArray[4], playArray[8]], [playArray]);
    const winF = React.useMemo(() => [playArray[2], playArray[4], playArray[6]], [playArray]);
    const winG = React.useMemo(() => [playArray[2], playArray[5], playArray[8]], [playArray]);
    const checkArray = React.useMemo(() => [winA, winB, winC, winD, winE, winF, winG], [winA, winB, winC, winD, winE, winF, winG]);

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
        let winningIndex: number;
        let roundWinner: SquareValue;
        checkArray.forEach((arrayElement: SquareValue[], index) => {
            const hasXwin = arrayElement.every((element: SquareValue) => element === 'X');
            const hasOwin = arrayElement.every((element: SquareValue) => element === 'O');
            if (hasXwin) {
                winningIndex = index;
                roundWinner = 'X';
                console.log('index', index);
                setHaveWinner(true);
            } else if (hasOwin) {
                winningIndex = index;
                roundWinner = 'O';
                console.log('index', index);
                setHaveWinner(true);
            }
            setWinningIndices(winningIndex);
            setWinner(roundWinner);
        });
    }, [checkArray]);

    return (
        <Grid container wrap="wrap" className={playGridContainer} justify="center">
            <Typography>Player {playerTurn} &apos;s Turn</Typography>
            <Typography>{haveWinner ? 'WINNER~!' : null}</Typography>
            <List className={playGridList}>
                {playArray.map((item, index) => {
                    const key = `key-${index}`;

                    return <Square value={item} setValue={handleChangeValue} index={index} key={key} />;
                })}
            </List>
        </Grid>
    );
};

export default PlayGrid;
