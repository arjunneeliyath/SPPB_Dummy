import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import radioValues from '../../../constants/radio-values';
import { IRejectionReason } from '../../../interfaces/admin/rejection-reason/get-all-rejection-reason';
import { IRejectionReasonEditRequest } from '../../../interfaces/admin/rejection-reason/edit-rejection-reason';

interface IEditFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    rejectionData: IRejectionReason;
    onUpdateClick: (data: IRejectionReasonEditRequest) => void;
}

const EditRejectableReasonForm = (props: IEditFormProps & FormikProps<IRejectionReasonEditRequest>) => {
    const {
        handleChange,
        values,
        touched,
        handleBlur,
        errors,
        setModalStatus,
        onUpdateClick,
        rejectionData,
        dirty,
        isValid,
    } = props;
    const classes = useStyles();

    const onRejectionReasonEditClick = () => {
        const rejectionEditValues: IRejectionReasonEditRequest = {
            id: rejectionData.id,
            reasonName: values.reasonName?.trim(),
            reasonDesc: values.reasonDesc?.trim(),
            itemTypeInd: radioValues.find((x) => x.id === values.itemTypeInd)?.name.toLowerCase() || '',
        };
        onUpdateClick(rejectionEditValues);
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
                                            component="input"
                                            id="reasonName"
                                            onBlur={handleBlur}
                                            name="reasonName"
                                            label=" Rejectable Reason"
                                            value={values.reasonName}
                                            handleChange={handleChange}
                                            touched={touched.reasonName}
                                            errors={errors.reasonName}
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
                                            onBlur={handleBlur}
                                            component="textarea"
                                            id="reasonDesc"
                                            name="reasonDesc"
                                            label="Description"
                                            value={values.reasonDesc}
                                            handleChange={handleChange}
                                            touched={touched.reasonDesc}
                                            errors={errors.reasonDesc}
                                            className={classes.textareaField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} className={classes.buttonItem}>
                                                <Button
                                                    disableRipple
                                                    type="submit"
                                                    variant="contained"
                                                    className={classes.buttonSubmit}
                                                    disabled={!(dirty && isValid)}
                                                    onClick={() => {
                                                        onRejectionReasonEditClick();
                                                    }}
                                                >
                                                    Update
                                                </Button>
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

export default withFormik<any, IRejectionReasonEditRequest>({
    mapPropsToValues: (props: IEditFormProps) => ({
        id: props.rejectionData.id,
        reasonName: props.rejectionData.reasonName,
        itemTypeInd:
            radioValues?.find((x) => x.name.toLowerCase() === props.rejectionData.itemTypeInd.toLowerCase())?.id || '',
        reasonDesc: props.rejectionData.reasonDesc,
    }),
    validationSchema: Yup.object({
        reasonName: Yup.string().trim().required('Required'),
        reasonDesc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(EditRejectableReasonForm);
