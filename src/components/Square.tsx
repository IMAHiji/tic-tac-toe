import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

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
export type SquareValue = 'X' | 'O' | '';

export type SquareType = {
    value: SquareValue;
    setValue: (index: number) => void;
    index: number;
};

const Square = ({ value, setValue, index }: SquareType) => {
    const { squareContainer, listItemWrapper } = useStyles();

    return (
        <Grid item xs={4} className={squareContainer}>
            <ListItem button onClick={() => setValue(index)} className={listItemWrapper}>
                {value}
            </ListItem>
        </Grid>
    );
};

export default Square;
