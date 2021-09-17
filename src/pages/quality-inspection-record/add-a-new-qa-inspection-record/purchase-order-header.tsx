import React from 'react';
import { Grid, FormLabel, Typography, TextField } from '@material-ui/core';
import { useStyles } from './styles';
import { IPurchaseOrder } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { setFormattedDate } from '../../../utils/date-formater';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { emptyFunction } from '../../../utils/helper';

interface IAddFormProps {
    purchaseOrder: IPurchaseOrder;
    currentPage: string;
    handleTruckCarrierChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDateChange?: (date: MaterialUiPickersDate) => void;
    recordDate?: MaterialUiPickersDate;
    truckCarrier?: string;
}

const PurchaseOrderHeader = (props: IAddFormProps) => {
    const { purchaseOrder, currentPage, handleDateChange, handleTruckCarrierChange, recordDate, truckCarrier } = props;
    const classes = useStyles();
    return (
        <div>
            <Grid container className={classes.style3}>
                <Grid container className={classes.topBoxStyle} spacing={1}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Foreign PO#</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.foreignPO}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.paddingTop}>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Growing Region</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.growingRegion || '-'}
                                </Typography>
                            </Grid>
                        </Grid>
                        {currentPage === 'homePage' ? null : (
                            <Grid container className={classes.paddingTop}>
                                <Grid item xs={12}>
                                    <FormLabel className={classes.labelField3}>Truck/Carrier</FormLabel>
                                    <span className={classes.astrisk}> *</span>
                                    <TextField
                                        rows={1}
                                        maxRows={1}
                                        value={truckCarrier}
                                        id={`${truckCarrier}-id`}
                                        variant="outlined"
                                        onChange={handleTruckCarrierChange}
                                        size="small"
                                        title={truckCarrier}
                                        className={classes.textarea}
                                        error={truckCarrier === undefined || truckCarrier?.trim() === ''}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Division/Facility</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.divisionFacility}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.paddingTop}>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Vendor</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.vendor}
                                </Typography>
                            </Grid>
                        </Grid>
                        {currentPage === 'singleInspection' ? (
                            <Grid container className={classes.paddingTop}>
                                <Grid item xs={12}>
                                    <FormLabel className={classes.labelField3}>Result</FormLabel>
                                    <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                        Fail
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Record Date</FormLabel>
                                {currentPage !== 'homePage' ? <span className={classes.astrisk}> *</span> : null}
                                {currentPage === 'homePage' ? (
                                    <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                        {setFormattedDate(new Date())}
                                    </Typography>
                                ) : (
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            format="MM-dd-yyyy"
                                            value={recordDate || new Date()}
                                            id="datePicker"
                                            placeholder=""
                                            onChange={handleDateChange ? handleDateChange : emptyFunction}
                                            autoComplete="new-password"
                                            className={classes.datePicker2}
                                            InputProps={{ readOnly: true }}
                                            maxDate={new Date()}
                                        />
                                    </MuiPickersUtilsProvider>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container className={classes.paddingTop}>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>PO Comments</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.poComments}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Buyer</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.buyer}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.paddingTop}>
                            <Grid item xs={12}>
                                <FormLabel className={classes.labelField3}>Due Date</FormLabel>
                                <Typography variant="h6" component="h6" className={classes.labelFieldDisplay3}>
                                    {purchaseOrder.dueDate}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default PurchaseOrderHeader;
