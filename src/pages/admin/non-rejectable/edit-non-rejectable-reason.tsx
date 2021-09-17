import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import radioValues from '../../../constants/radio-values';
import { INonRejectionReasonList } from '../../../interfaces/admin/non-rejection-reason/get-all-non-rejection-reason';
import { INonRejectionReasonEditRequest } from '../../../interfaces/admin/non-rejection-reason/edit-non-rejection-reason';

interface IEditFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    nonRejectionData: INonRejectionReasonList;
    onUpdateClick: (data: INonRejectionReasonEditRequest) => void;
}

interface IEditFormValues {
    nonRejReasonName: string;
    nonRejReasonDesc: string;
    itemTypeInd: string;
}

const EditNonRejectableReasonForm = (props: IEditFormProps & FormikProps<IEditFormValues>) => {
    const {
        handleChange,
        values,
        touched,
        handleBlur,
        errors,
        setModalStatus,
        onUpdateClick,
        nonRejectionData,
        dirty,
        isValid,
    } = props;
    const classes = useStyles();

    const onNonRejectionReasonEditClick = () => {
        const nonRejectionEditValues: INonRejectionReasonEditRequest = {
            id: nonRejectionData.id,
            nonRejReasonName: values.nonRejReasonName?.trim(),
            nonRejReasonDesc: values.nonRejReasonDesc?.trim(),
            itemTypeInd: radioValues.find((x) => x.id === values.itemTypeInd)?.name.toLowerCase() || '',
        };
        onUpdateClick(nonRejectionEditValues);
        setModalStatus(false);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.boxStyle}>
                    <Form>
                        <Grid container>
                            <Grid item xs={12} className={classes.rowContainer}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <FormComponent
                                            autoFocus
                                            disabled={false}
                                            required={true}
                                            onBlur={handleBlur}
                                            component="input"
                                            id="nonRejReasonName"
                                            name="nonRejReasonName"
                                            label="Non Rejectable Reason"
                                            value={values.nonRejReasonName}
                                            handleChange={handleChange}
                                            touched={touched.nonRejReasonName}
                                            errors={errors.nonRejReasonName}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormComponent
                                            label="Inspection Type"
                                            value={values.itemTypeInd}
                                            name="itemTypeInd"
                                            component="radio"
                                            id="itemTypeInd"
                                            handleChange={handleChange}
                                            radioOptions={radioValues}
                                            errors={errors.itemTypeInd}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormComponent
                                            autoFocus
                                            disabled={false}
                                            required={true}
                                            rows={7}
                                            component="textarea"
                                            onBlur={handleBlur}
                                            id="nonRejReasonDesc"
                                            name="nonRejReasonDesc"
                                            label="Description"
                                            value={values.nonRejReasonDesc}
                                            handleChange={handleChange}
                                            touched={touched.nonRejReasonDesc}
                                            errors={errors.nonRejReasonDesc}
                                            className={classes.textareaField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Grid container className={classes.buttonContainer}>
                                            <Grid item xs={3} className={classes.buttonItem}>
                                                <Button
                                                    disableRipple
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                    className={classes.buttonSubmit}
                                                    disabled={!(dirty && isValid)}
                                                    onClick={() => onNonRejectionReasonEditClick()}
                                                >
                                                    update
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    disableRipple
                                                    className={classes.button}
                                                    onClick={() => {
                                                        setModalStatus(false);
                                                    }}
                                                    color="primary"
                                                    variant="outlined"
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default withFormik<any, IEditFormValues>({
    mapPropsToValues: (props: IEditFormProps) => ({
        nonRejReasonName: props.nonRejectionData.nonRejReasonName,
        itemTypeInd:
            radioValues?.find((x) => x.name.toLowerCase() === props.nonRejectionData.itemTypeInd.toLowerCase())?.id ||
            '',
        nonRejReasonDesc: props.nonRejectionData.nonRejReasonDesc,
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
    validationSchema: Yup.object({
        nonRejReasonName: Yup.string().trim().required('Required'),
        nonRejReasonDesc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),
})(EditNonRejectableReasonForm);
