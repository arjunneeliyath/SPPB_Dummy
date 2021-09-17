import React from 'react';
import { Grid } from '@material-ui/core';
import ErrorBoundary from '../error-boundary/error-boundary';
import { gridContainer } from './style';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';

const PageHeader = () => {
    const classes = gridContainer();
    return (
        <ErrorBoundary>
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.name}>
                    <Breadcrumb />
                </Grid>
            </Grid>
        </ErrorBoundary>
    );
};

export default PageHeader;
