import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import radioValues from '../../../constants/radio-values';
import { INonRejectionReasonAddRequest } from '../../../interfaces/admin/non-rejection-reason/add-non-rejection-reason';

interface IAddFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onSaveClick: (rejectionReason: INonRejectionReasonAddRequest) => void;
}

const AddNonRejectableReasonForm = (props: IAddFormProps & FormikProps<INonRejectionReasonAddRequest>) => {
    const { handleChange, values, handleBlur, touched, errors, setModalStatus, onSaveClick, dirty, isValid } = props;
    const classes = useStyles();

    const onNonRejectionReasonAddClick = () => {
        const nonRejectionAddValues: INonRejectionReasonAddRequest = {
            nonRejReasonName: values.nonRejReasonName?.trim(),
            nonRejReasonDesc: values.nonRejReasonDesc?.trim(),
            itemTypeInd: radioValues.find((x) => x.id === values.itemTypeInd)?.name.toLocaleLowerCase() || '',
        };
        onSaveClick(nonRejectionAddValues);
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
                                            onBlur={handleBlur}
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
                                            onBlur={handleBlur}
                                            rows={7}
                                            component="textarea"
                                            required={true}
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
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.buttonSubmit}
                                                    disabled={!(dirty && isValid)}
                                                    onClick={() => onNonRejectionReasonAddClick()}
                                                    role="submit-btn"
                                                >
                                                    save
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
                                                    role="cancel-role"
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

export default withFormik<any, INonRejectionReasonAddRequest>({
    mapPropsToValues: () => ({
        nonRejReasonName: '',
        itemTypeInd: '1',
        nonRejReasonDesc: '',
    }),
    validationSchema: Yup.object({
        nonRejReasonName: Yup.string().trim().required('Required'),
        nonRejReasonDesc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(AddNonRejectableReasonForm);
