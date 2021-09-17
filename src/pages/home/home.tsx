import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IReduxState } from '../../modules/store';
import { AnyAction } from 'redux';
import { Grid, Typography, Paper, Box, Link, Button, Card, CardContent } from '@material-ui/core';
import { useStyles } from './style';
import Hidden from '@material-ui/core/Hidden';
import { IQaInspectionFormValues } from '../../interfaces/quality-inspection-record/qa-inspection-record/qa-inspection-form-values';
import { getPurchaseOrderList } from '../../modules/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import { IPurchaseOrderDetails } from '../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order-details';
import { setFormattedDate } from '../../utils/date-formater';
import { useHistory } from 'react-router-dom';
import { routePath } from '../../constants/routes';
import CircularIndeterminate from '../../components/busy-indicator/busy-indicator';
import { clearPreferenceSaved } from '../../modules/home/preference-dropdown';

interface IHomeProps {
    getPurchaseOrderList: (data: IQaInspectionFormValues) => void;
    purchaseOrderList: IPurchaseOrderDetails[];
    preferenceSaved: boolean;
    clearPreferenceSaved: (data: boolean) => void;
}

const home = (props: IHomeProps) => {
    const { purchaseOrderList, getPurchaseOrderList, preferenceSaved, clearPreferenceSaved } = props;
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        getPurchaseOrderList({
            fromDate: setFormattedDate(new Date()),
            toDate: setFormattedDate(new Date()),
            section: 'BOTH',
        });
    }, []);

    useEffect(() => {
        if (preferenceSaved) {
            setIsLoading(true);
            getPurchaseOrderList({
                fromDate: setFormattedDate(new Date()),
                toDate: setFormattedDate(new Date()),
                section: 'BOTH',
            });
            clearPreferenceSaved(false);
        }
    }, [preferenceSaved]);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
        }
    }, [purchaseOrderList]);

    const onViewAllClick = () => {
        history.push(routePath.viewAll.index, purchaseOrderList);
    };

    return (
        <>
            <Grid container className={classes.homeBg}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6" className={classes.homeTitle}>
                        Welcome to QCR, please choose the section from above menus to work with.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                    <Paper className={classes.box} elevation={0}>
                        <Typography className={classes.title}>List of POs for Today</Typography>
                        <Hidden xsDown>
                            <Grid container spacing={1}>
                                <Grid item sm={2}>
                                    <Typography className={classes.poTitle}>Foreign PO#</Typography>
                                </Grid>
                                <Grid item sm={2}>
                                    <Typography className={classes.poTitle}>Division</Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <Typography className={classes.poTitle}>Facility</Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <Typography className={classes.poTitle}>Vendor</Typography>
                                </Grid>
                            </Grid>
                        </Hidden>
                        {isLoading ? (
                            <CircularIndeterminate />
                        ) : purchaseOrderList?.length > 0 ? (
                            <Box>
                                {purchaseOrderList.slice(0, 5).map((item, index) => (
                                    <Paper elevation={1} className={classes.poList} key={index}>
                                        <Box mt={2}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={2} xs={12}>
                                                    <Hidden smUp>
                                                        <Typography className={classes.poTitle}>PO No.</Typography>
                                                    </Hidden>
                                                    <Typography className={classes.poText}>
                                                        <p className={classes.poNumber}>{item.poNumber}</p>
                                                    </Typography>
                                                </Grid>
                                                <Grid item sm={2} xs={12}>
                                                    <Hidden smUp>
                                                        <Typography className={classes.poTitle}>Division</Typography>
                                                    </Hidden>
                                                    <Typography className={classes.poText}>{item.division}</Typography>
                                                </Grid>
                                                <Grid item sm={4} xs={12}>
                                                    <Hidden smUp>
                                                        <Typography className={classes.poTitle}>Facility</Typography>
                                                    </Hidden>
                                                    <Typography className={classes.poText}>{item.facility}</Typography>
                                                </Grid>
                                                <Grid item sm={4} xs={12}>
                                                    <Hidden smUp>
                                                        <Typography className={classes.poTitle}>Vendor</Typography>
                                                    </Hidden>
                                                    <Typography className={classes.poText}>{item.vendor}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        ) : (
                            <p>No records found</p>
                        )}
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.viewButton}
                                    onClick={onViewAllClick}
                                    disabled={purchaseOrderList?.length === 0 || isLoading}
                                >
                                    <Link
                                        className={
                                            purchaseOrderList?.length === 0 || isLoading
                                                ? classes.disableText
                                                : classes.normalText
                                        }
                                    >
                                        View All
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Paper className={classes.box} elevation={0}>
                        <Typography className={classes.title}>Inspection Overview</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} className={classes.bRight}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography className={classes.titlesm}>Past 2 Days</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box>
                                            <Card className={classes.cardInsightsLarge}>
                                                <CardContent className={classes.pad15}>
                                                    <Typography variant="body2" component="p" align="center">
                                                        Total POs Inspected
                                                    </Typography>
                                                    <Typography
                                                        variant="h4"
                                                        component="h2"
                                                        color="primary"
                                                        align="center"
                                                    >
                                                        50
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box mb={2}>
                                            <Card className={classes.cardInsightsSmall}>
                                                <CardContent className={classes.pad15}>
                                                    <Typography variant="body2" component="p" align="center">
                                                        Total Rejections
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                        align="center"
                                                        color="error"
                                                    >
                                                        50
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                        <Box>
                                            <Card className={classes.cardInsightsSmall}>
                                                <CardContent className={classes.pad15}>
                                                    <Typography variant="body2" component="p" align="center">
                                                        Total Pass
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                        color="textSecondary"
                                                        align="center"
                                                        style={{ color: '#008400' }}
                                                    >
                                                        50
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.titlesm}>Past 2 Weeks</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box>
                                            <Card className={classes.cardInsightsLarge}>
                                                <CardContent className={classes.pad15}>
                                                    <Typography variant="body2" component="p" align="center">
                                                        Total POs Inspected
                                                    </Typography>
                                                    <Typography
                                                        variant="h4"
                                                        component="h2"
                                                        color="primary"
                                                        align="center"
                                                    >
                                                        50
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box mb={2}>
                                            <Card className={classes.cardInsightsSmall}>
                                                <CardContent className={classes.pad15}>
                                                    <Typography variant="body2" component="p" align="center">
                                                        Total Rejections
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                        align="center"
                                                        color="error"
                                                    >
                                                        50
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                        <Box>
                                            <Card className={classes.cardInsightsSmall}>
                                                <CardContent className={classes.pad15}>
                                                    <Typography variant="body2" component="p" align="center">
                                                        Total Pass
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                        color="textSecondary"
                                                        align="center"
                                                        style={{ color: '#008400' }}
                                                    >
                                                        50
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};
const mapStateToProps = (state: IReduxState) => ({
    purchaseOrderList: state.purchaseOrderData.purchaseOrderList,
    preferenceSaved: state.home.preferenceSaved,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getPurchaseOrderList: (data: IQaInspectionFormValues) => dispatch(getPurchaseOrderList(data)),
    clearPreferenceSaved: (data: boolean) => dispatch(clearPreferenceSaved(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(home);
