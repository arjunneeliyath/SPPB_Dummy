import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';
import { Grid } from '@material-ui/core';

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.root} style={{ justifyContent: 'center' }}>
            <div className={classes.root}>
                <CircularProgress />
            </div>
        </Grid>
    );
}
