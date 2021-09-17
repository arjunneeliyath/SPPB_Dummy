import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFormik, Form, FormikProps } from 'formik';
import { Grid, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import MultiCheckboxList from '../../../components/multi-checkbox-list/multi-checkbox-list';
import FormComponent from '../../../components/form-field/form-field';
import { IParameterValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/parameter-values';
import { IErrorDisplay } from '../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import { useState } from 'react';
import { IEditFormFields } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';

interface IUpdateRecordsProps {
    doneWithSelection: IEditFormFields;
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxClick: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleCcListSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCcListCheckboxClick: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    emailGroups: IParameterValues[];
    ccList: IParameterValues[];
    onValuesChange: (values: IUpdateRecordsValues) => void;
    errorDisplay?: boolean;
    setErrorFocus?: (data: IErrorDisplay) => void;
    errorFocus?: IErrorDisplay;
}

export interface IUpdateRecordsValues {
    ccListDescription: string;
    comments: string;
}

const UpdateRecordsForm = (props: IUpdateRecordsProps & FormikProps<IUpdateRecordsValues>) => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        handleSelectAllClick,
        handleCheckboxClick,
        handleCcListSelectAllClick,
        handleCcListCheckboxClick,
        emailGroups,
        ccList,
        onValuesChange,
        errorDisplay,
        errorFocus,
        setErrorFocus,
    } = props;

    const classes = useStyles();
    const [inputRef, setInputRef] = useState<any>();

    useEffect(() => {
        onValuesChange(values);
    }, [values]);

    useEffect(() => {
        if (errorFocus?.rowIndex === -2) {
            inputRef?.focus();
        }
    }, [errorFocus]);

    const clearFocus = () => {
        if (errorFocus && errorFocus?.rowIndex === -2 && setErrorFocus) {
            setErrorFocus({ columnName: '', errorMsg: '', rowIndex: -1 });
        }
        handleBlur;
    };

    const setRef = (ref: React.Ref<any>) => {
        setInputRef(ref);
    };

    return (
        <Grid className={classes.padding}>
            <Form className={classes.form}>
                <Grid container spacing={4} className={classes.gridContainer}>
                    <Grid item md={3}>
                        <FormLabel className={classes.urlabelField}>User Mail Groups</FormLabel>
                        <MultiCheckboxList
                            items={emailGroups}
                            handleToggleAll={handleSelectAllClick}
                            handleToggle={handleCheckboxClick}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <FormLabel className={classes.urlabelField}>Select CC List</FormLabel>
                        <MultiCheckboxList
                            items={ccList}
                            handleToggleAll={handleCcListSelectAllClick}
                            handleToggle={handleCcListCheckboxClick}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <FormComponent
                            autoFocus
                            disabled={false}
                            rows={3}
                            component="textarea"
                            id="ccListDescription"
                            name="ccListDescription"
                            label="Enter CC List"
                            value={values.ccListDescription}
                            onBlur={clearFocus}
                            handleChange={handleChange}
                            touched={touched.ccListDescription}
                            errors={errors.ccListDescription}
                            className={classes.urftextareaField}
                            inValid={errorDisplay}
                            setRef={setRef}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <FormComponent
                            autoFocus
                            disabled={false}
                            rows={3}
                            component="textarea"
                            id="comments"
                            name="comments"
                            label="Additional Inspector Comments"
                            value={values.comments}
                            onBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.comments}
                            errors={errors.comments}
                            className={classes.urftextareaField}
                        />
                    </Grid>
                </Grid>
            </Form>
        </Grid>
    );
};

const MultiCheckbox = withFormik<IUpdateRecordsProps, IUpdateRecordsValues>({
    mapPropsToValues: (props: IUpdateRecordsProps) => ({
        ccListDescription: props.doneWithSelection.inspData.emailAddresses.toString(),
        comments: props.doneWithSelection.inspData.poComments || '',
    }),
    enableReinitialize: true,
    handleSubmit: () => {
        //handleSubmit
    },
})(UpdateRecordsForm);
export default connect()(MultiCheckbox);
