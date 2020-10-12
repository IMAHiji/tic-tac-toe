import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PlayGrid from './components/PlayGrid';

const useStyles = makeStyles(() => {
    return {
        appContainer: {
            height: '50vh',
        },
    };
});
function App() {
    const { appContainer } = useStyles();

    return (
        <Grid container justify="center" className={appContainer}>
            <PlayGrid />
        </Grid>
    );
}

export default App;
