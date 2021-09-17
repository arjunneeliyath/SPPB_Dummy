import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid, CssBaseline } from '@material-ui/core';
import ErrorBoundary from '../error-boundary/error-boundary';
import Routes from '../route/route';
import Header from '../header/header';
import { containerStyles } from './style';
import PageHeader from '../page-header/page-header';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/footer';
import { authProvider } from '../../utils/authProvider';
toast.configure();

const message = 'Please Sign-in to see your Dashboard';
const auth = authProvider();

const App = () => {
    const classes = containerStyles();

    return (
        <>
            {auth.accessToken ? (
                <>
                    <Router>
                        <CssBaseline classes={{ root: classes.pageContent }} />
                        <ErrorBoundary>
                            <Header />
                        </ErrorBoundary>
                        <Container maxWidth="xl" className={classes.pageContent}>
                            <Container maxWidth="lg">
                                <Grid item xs={12} zeroMinWidth>
                                    <Grid item xs={12}>
                                        <PageHeader />
                                    </Grid>
                                    <ErrorBoundary>
                                        <Routes />
                                    </ErrorBoundary>
                                </Grid>
                                <Footer />
                            </Container>
                        </Container>
                    </Router>
                </>
            ) : (
                <>
                    <h5 className={classes.cardTitle}>{message}</h5>
                    {auth.clearSession()}
                </>
            )}
        </>
    );
};

export default App;
