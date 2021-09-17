import React, { useEffect } from 'react';
import { withFormik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import dropDownValues from '../../../constants/quality-inspection-record/dropdown';
import { IQaInspectionFormValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/qa-inspection-form-values';
import poNumberCheckbox from '../../../constants/quality-inspection-record/poNumberCheckbox';

interface IAddFormProps {
    getPurchaseOrderList: (dateValues: IQaInspectionFormValues) => void;
    getPurchaseOrder: (data: IQaInspectionFormValues) => void;
    formValues?: IQaInspectionFormValues;
    setClearComponent: (data: boolean) => void;
    clearFilter: boolean;
    setClearFilter: (data: boolean) => void;
}
export interface IQaInspectionValues {
    po: string;
    fromDate: string | null;
    toDate: string | null;
    section: string;
    foreignPo?: string;
}

const NewQaInspectionRecordForm = (props: IAddFormProps & FormikProps<IQaInspectionValues>) => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        setFieldValue,
        setStatus,
        status,
        formValues,
        setClearComponent,
        setFieldTouched,
        clearFilter,
        setClearFilter,
    } = props;

    const classes = useStyles();

    useEffect(() => {
        if (formValues?.po) {
            clearDate();
        }
    }, [formValues?.po]);

    useEffect(() => {
        if (clearFilter) {
            clearSelectionFilter();
            setClearFilter(false);
        }
    }, [clearFilter]);

    const handleDateChange = (event: any, dateName: string) => {
        const { value } = event.target;
        setStatus({});
        if (dateName === 'toDate' && values.fromDate !== '' && values.fromDate !== null) {
            if (new Date(value) < new Date(values.fromDate)) {
                setStatus({ dateName: dateName, message: 'To Date must be later than From Date' });
            }
        } else if (dateName === 'fromDate' && values.toDate !== '' && values.toDate !== null) {
            if (new Date(value) > new Date(values.toDate)) {
                setStatus({ dateName: dateName, message: 'From Date must be earlier than To Date' });
            }
        }
        setFieldTouched(dateName, true);
        setFieldValue(dateName, value);
        if (value !== '') {
            setFieldValue('po', '');
        }
    };

    const handlePoChange = (event: React.ChangeEvent<any>) => {
        const { value } = event.target;
        setStatus({});
        if (value.toString().length > 6) {
            setStatus({ dateName: 'po', message: 'Foreign PO# must be maximum of 6 digits' });
        }
        setFieldValue('po', value);
        if (value !== '') {
            clearDate();
        }
    };

    const clearSelectionFilter = (isSection?: boolean) => {
        setFieldValue('po', '');
        if (!isSection && !clearFilter) {
            setFieldValue('section', 'Select Section');
        }
        setStatus({});
        setClearComponent(true);
    };

    const onClearClick = (isSection?: boolean) => {
        clearSelectionFilter(isSection);
        clearDate();
    };

    const clearDate = () => {
        setFieldValue('fromDate', null);
        setFieldValue('toDate', null);
    };

    const handleSectionChange = (event: React.ChangeEvent<any>) => {
        handleChange(event);
        onClearClick(true);
    };

    return (
        <Form className={classes.form}>
            <Grid container>
                <Grid item xs={12} sm={12} md={9} className={classes.rowContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormComponent
                                disabled={false}
                                component="select"
                                required={true}
                                id="section"
                                selectOptions={dropDownValues}
                                handleChange={(e) => handleSectionChange(e)}
                                value={values.section || 'Select Section'}
                                name="section"
                                onBlur={handleBlur}
                                placeholder="Select Section"
                                className={classes.selectField}
                                touched={touched.section}
                                errors={errors.section}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.qaInspectionGridField}>
                            <FormLabel className={classes.qaInspectionListField}>
                                Enter one of the following selection choices. Press Go to start search
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className={classes.align}>
                        <Grid item xs={12} sm={12} md={3}>
                            <FormComponent
                                autoFocus
                                disabled={values.section === '' || values.section === 'Select Section'}
                                component="input"
                                onBlur={handleBlur}
                                id="po"
                                name="po"
                                label="PO Number"
                                value={values.po}
                                handleChange={handlePoChange}
                                touched={touched.po}
                                errors={status?.dateName === 'po' ? status.message : ''}
                                className={classes.inputField}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1}>
                            <Typography className={classes.or}>OR</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                label="PO From Date"
                                disabled={values.section === '' || values.section === 'Select Section'}
                                placeholder="MM/DD/YYYY"
                                component="date"
                                id="fromDate"
                                handleChange={(e) => handleDateChange(e, 'fromDate')}
                                name="fromDate"
                                touched={touched.fromDate}
                                errors={status?.dateName === 'fromDate' ? status.message : ''}
                                value={values.fromDate}
                                inputVariant="outlined"
                                autoComplete="new-password"
                                className={classes.textareaField}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                label="PO To Date"
                                disabled={values.section === '' || values.section === 'Select Section'}
                                placeholder="MM/DD/YYYY"
                                component="date"
                                id="toDate"
                                handleChange={(e) => handleDateChange(e, 'toDate')}
                                name="toDate"
                                touched={touched.toDate}
                                errors={status?.dateName === 'toDate' ? status.message : ''}
                                value={values.toDate}
                                inputVariant="outlined"
                                autoComplete="new-password"
                                className={classes.textareaField}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormComponent
                                disabled={values.section === '' || values.section === 'Select Section'}
                                component="checkbox"
                                id="foreignPo"
                                name="foreignPo"
                                onBlur={handleBlur}
                                touched={touched.foreignPo}
                                value={values.foreignPo}
                                handleChange={handleChange}
                                checkBoxOptions={poNumberCheckbox}
                                errors={errors.foreignPo?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} className={classes.buttonItem}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disableRipple
                                        className={classes.gobutton}
                                        color="primary"
                                        disabled={
                                            status?.message === undefined
                                                ? values.po.toString().trim() === '' &&
                                                  (values.fromDate === '' ||
                                                      values.toDate === '' ||
                                                      values.fromDate === null ||
                                                      values.toDate === null)
                                                : true
                                        }
                                    >
                                        Go
                                    </Button>
                                    <Button
                                        disableRipple
                                        className={classes.button}
                                        color="primary"
                                        variant="outlined"
                                        onClick={() => onClearClick()}
                                        disabled={values.section === ''}
                                    >
                                        Clear
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
};

export default withFormik<IAddFormProps, IQaInspectionValues>({
    mapPropsToValues: (props: IAddFormProps) => ({
        po: props?.formValues?.po || '',
        fromDate: props?.formValues?.fromDate || null,
        toDate: props?.formValues?.toDate || null,
        section: props.formValues?.section || '',
        foreignPo: props.formValues?.foreignPo ? '' : 'Foreign PO',
    }),
    validationSchema: Yup.object({
        po: Yup.string().trim(),
    }),
    enableReinitialize: true,
    validateOnChange: true,
    handleSubmit: (values, { props }) => {
        const data = {
            ...values,
            foreignPo: values.foreignPo?.length === 0 ? false : true,
        };
        if (values.po === '') {
            props.getPurchaseOrderList(data);
        } else {
            props.getPurchaseOrder(data);
        }
        props.setClearComponent(false);
    },
})(NewQaInspectionRecordForm);
