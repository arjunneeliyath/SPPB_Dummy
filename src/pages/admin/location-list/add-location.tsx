import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import { ILocationAddRequest } from '../../../interfaces/admin/location/add-location';
interface IAddFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onSaveClick: (addLocation: ILocationAddRequest) => void;
}

const AddLocation = (props: IAddFormProps & FormikProps<ILocationAddRequest>) => {
    const { handleChange, values, handleBlur, touched, errors, setModalStatus, onSaveClick, dirty, isValid } = props;
    const classes = useStyles();

    const onAddLocationClick = () => {
        const locationAddRequest: ILocationAddRequest = {
            locationName: values.locationName?.trim(),
            locationDesc: values.locationDesc?.trim(),
        };
        onSaveClick(locationAddRequest);
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
                                            onBlur={handleBlur}
                                            required={true}
                                            component="input"
                                            id="locationName"
                                            name="locationName"
                                            label="Location"
                                            value={values.locationName}
                                            handleChange={handleChange}
                                            touched={touched.locationName}
                                            errors={errors.locationName}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormComponent
                                            autoFocus
                                            disabled={false}
                                            required={true}
                                            rows={7}
                                            component="textarea"
                                            id="locationDesc"
                                            name="locationDesc"
                                            label="Description"
                                            onBlur={handleBlur}
                                            value={values.locationDesc}
                                            handleChange={handleChange}
                                            touched={touched.locationDesc}
                                            errors={errors.locationDesc}
                                            className={classes.textareaField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Grid container className={classes.buttonContainer}>
                                            <Grid item xs={3} className={classes.buttonItem}>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                    className={classes.buttonSubmit}
                                                    disabled={!(dirty && isValid)}
                                                    onClick={() => {
                                                        onAddLocationClick();
                                                    }}
                                                    role="submit-btn"
                                                >
                                                    save
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    variant="outlined"
                                                    className={classes.button}
                                                    onClick={() => {
                                                        setModalStatus(false);
                                                    }}
                                                    role="cancel-role"
                                                >
                                                    cancel
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

export default withFormik<any, ILocationAddRequest>({
    mapPropsToValues: () => ({
        locationName: '',
        locationDesc: '',
    }),
    validationSchema: Yup.object({
        locationName: Yup.string().trim().required('Required'),
        locationDesc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(AddLocation);
