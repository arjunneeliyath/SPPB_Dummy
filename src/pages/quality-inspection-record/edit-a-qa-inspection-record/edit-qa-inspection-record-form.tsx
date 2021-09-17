import React from 'react';
import { withFormik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { IEditInspectionFormValues } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-inspection-values';
import FormComponent from '../../../components/form-field/form-field';
import inspectionValues from '../../../constants/quality-inspection-record/inspectionDropdown';
import recordCheckbox from '../../../constants/quality-inspection-record/showRecordsCheckbox';
import dropDownValues from '../../../constants/quality-inspection-record/dropdown';
import { setFormattedDate } from '../../../utils/date-formater';
import { ISearchResultTable } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/search-result-table';

interface IEditFormProps {
    getSearchResultList: (data: IEditInspectionFormValues) => void;
    dropDownOptions: string[];
    onClearClick: () => void;
    searchResultList: ISearchResultTable[];
    handleExportChanges: () => void;
}
export interface IQaInspectionValues {
    section: string;
    itemCic: string;
    po: string;
    vendorNumber: string;
    vendorName: string;
    date: string | null;
    inspectionType: string;
    showRecords: string;
    showOverTurnedRecords: boolean;
    showDeletedRecords: boolean;
    poNumber: string;
}

const EditQaInspectionRecordForm = (props: IEditFormProps & FormikProps<IQaInspectionValues>) => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        setFieldValue,
        dirty,
        isValid,
        dropDownOptions,
        onClearClick,
        handleExportChanges,
        searchResultList,
    } = props;
    const classes = useStyles();

    const handleAutoCompleteChange = (event: React.ChangeEvent<any>) => {
        const { innerText } = event.target;
        setFieldValue('vendorName', innerText || '');
    };

    const handleSectionChange = (event: React.ChangeEvent<any>) => {
        handleChange(event);
        setFieldValue('date', null);
        setFieldValue('inspectionType', '');
        setFieldValue('itemCic', '');
        setFieldValue('po', '');
        setFieldValue('vendorName', '');
        setFieldValue('vendorNumber', '');
        setFieldValue('showRecords', '');
    };

    return (
        <Form className={classes.form}>
            <Grid container className={classes.boxStyle}>
                <Grid item xs={12} sm={12} md={11} className={classes.rowContainer}>
                    <Grid container spacing={2} className={classes.align}>
                        <Grid item xs={8} sm={6} md={2}>
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
                        <Grid item xs={12}>
                            <FormLabel className={classes.messageField}>
                                Enter one of the following selection choices. Press Search to start search
                            </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                autoFocus
                                component="input"
                                onBlur={handleBlur}
                                id="itemCic"
                                name="itemCic"
                                label="Item CIC"
                                value={values.itemCic}
                                handleChange={handleChange}
                                touched={touched.itemCic}
                                errors={errors.itemCic}
                                className={classes.inputField}
                                disabled={values.section === '' || values.section === 'Select Section'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                component="input"
                                onBlur={handleBlur}
                                id="poNumber"
                                name="poNumber"
                                label="PO Number"
                                value={values.poNumber}
                                handleChange={handleChange}
                                touched={touched.poNumber}
                                className={classes.inputField}
                                disabled={values.section === '' || values.section === 'Select Section'}
                                errors={errors.poNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                component="input"
                                onBlur={handleBlur}
                                id="po"
                                name="po"
                                label="Foreign PO Number"
                                value={values.po}
                                handleChange={handleChange}
                                touched={touched.po}
                                className={classes.inputField}
                                disabled={values.section === '' || values.section === 'Select Section'}
                                errors={errors.po}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                component="input"
                                onBlur={handleBlur}
                                id="vendorNumber"
                                name="vendorNumber"
                                label="Vendor Number"
                                value={values.vendorNumber}
                                handleChange={handleChange}
                                touched={touched.vendorNumber}
                                className={classes.inputField}
                                disabled={values.section === '' || values.section === 'Select Section'}
                                errors={errors.vendorNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                disabled={values.section === '' || values.section === 'Select Section'}
                                component="autocompleteselectbox"
                                id="vendorName"
                                name="vendorName"
                                options={dropDownOptions}
                                label="Vendor Name"
                                value={values.vendorName}
                                handleChange={handleAutoCompleteChange}
                                className={classes.autocompleteselectbox}
                                placeholder="Type here..."
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                label="Record Date"
                                component="date"
                                placeholder="MM-DD-YYYY"
                                id="date"
                                handleChange={handleChange}
                                name="date"
                                value={values.date}
                                inputVariant="outlined"
                                className={classes.datePicker2}
                                touched={touched.date}
                                onBlur={handleBlur}
                                readOnly={true}
                                disabled={values.section === '' || values.section === 'Select Section'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                disabled={values.section === '' || values.section === 'Select Section'}
                                component="select"
                                id="inspectionType"
                                selectOptions={inspectionValues}
                                handleChange={handleChange}
                                value={values.inspectionType || 'Select Type'}
                                name="inspectionType"
                                onBlur={handleBlur}
                                placeholder="Select Type"
                                className={classes.selectField}
                                touched={touched.inspectionType}
                                errors={errors.inspectionType}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormComponent
                                disabled={values.section === '' || values.section === 'Select Section'}
                                component="checkbox"
                                id="showRecords"
                                name="showRecords"
                                onBlur={handleBlur}
                                touched={touched.showRecords}
                                value={values.showRecords.toString()}
                                handleChange={handleChange}
                                checkBoxOptions={recordCheckbox}
                                errors={errors.showRecords?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={9} className={classes.buttonItem}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disableRipple
                                        className={classes.gobutton}
                                        color="primary"
                                        disabled={
                                            (!(dirty && isValid) && values.date === '') ||
                                            !(
                                                values.po !== '' ||
                                                values.itemCic !== '' ||
                                                values.vendorName !== '' ||
                                                values.vendorNumber !== '' ||
                                                values.date !== null ||
                                                values.inspectionType !== '' ||
                                                values.poNumber !== ''
                                            ) ||
                                            values.section === '' ||
                                            values.section === 'Select Section' ||
                                            (errors.po ? errors.po !== '' : false) ||
                                            (errors.vendorNumber ? errors.vendorNumber !== '' : false) ||
                                            (errors.itemCic ? errors.itemCic !== '' : false)
                                        }
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        disableRipple
                                        className={classes.button}
                                        color="primary"
                                        variant="outlined"
                                        type="reset"
                                        onClick={() => onClearClick()}
                                        disabled={values.section === '' || values.section === 'Select Section'}
                                    >
                                        Clear
                                    </Button>
                                </Grid>
                                <Grid item>
                                    {searchResultList.length > 0 ? (
                                        <Button
                                            onClick={handleExportChanges}
                                            color="primary"
                                            variant="contained"
                                            disableRipple
                                            className={classes.buttonExport}
                                        >
                                            Export to Excel
                                        </Button>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
};

export default withFormik<IEditFormProps, IQaInspectionValues>({
    mapPropsToValues: () => ({
        section: '',
        po: '',
        itemCic: '',
        vendorNumber: '',
        vendorName: '',
        date: null,
        inspectionType: '',
        showRecords: '',
        showOverTurnedRecords: false,
        showDeletedRecords: false,
        poNumber: '',
    }),
    validationSchema: Yup.object().shape({
        po: Yup.string().trim().max(6, 'Value must not be greater than 6 characters'),
        itemCic: Yup.string()
            .trim()
            .min(6, 'Value must have atleast 6 characters')
            .max(8, 'Value must not be greater than 8 characters'),
        vendorNumber: Yup.string().trim().max(6, 'Value must not be greater than 6 characters'),
    }),
    handleSubmit: (values: any, { props }) => {
        if (values.date !== null) {
            values.date = setFormattedDate(new Date(values.date));
        }
        if (values.section === '1') {
            values.section = 'Produce';
        } else {
            values.section = 'Floral';
        }
        if (values.showRecords.length === 1) {
            for (let i = 0; i < values.showRecords.length; i++) {
                values.showRecords[i] === 'Show overturned records only'
                    ? (values.showOverTurnedRecords = true)
                    : (values.showDeletedRecords = true);
            }
        } else if (values.showRecords.length === 2) {
            values.showOverTurnedRecords = true;
            values.showDeletedRecords = true;
        }
        props.getSearchResultList(values);
    },
})(EditQaInspectionRecordForm);
