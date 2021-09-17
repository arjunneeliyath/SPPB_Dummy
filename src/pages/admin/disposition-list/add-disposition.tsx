import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import { IDispositionAddRequest } from '../../../interfaces/admin/disposition/add-disposition';

interface IAddFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onSaveClick: (addDisposition: IDispositionAddRequest) => void;
}

const AddDisposition = (props: IAddFormProps & FormikProps<IDispositionAddRequest>) => {
    const { handleChange, values, touched, handleBlur, errors, setModalStatus, onSaveClick, dirty, isValid } = props;
    const classes = useStyles();

    const onAddDispositionClick = () => {
        const dispositionAddRequest: IDispositionAddRequest = {
            name: values.name?.trim(),
            desc: values.desc?.trim(),
        };
        onSaveClick(dispositionAddRequest);
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
                                            id="name"
                                            name="name"
                                            label="Disposition"
                                            value={values.name}
                                            handleChange={handleChange}
                                            touched={touched.name}
                                            errors={errors.name}
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
                                            onBlur={handleBlur}
                                            id="desc"
                                            name="desc"
                                            label="Description"
                                            value={values.desc}
                                            handleChange={handleChange}
                                            touched={touched.desc}
                                            errors={errors.desc}
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
                                                        onAddDispositionClick();
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
                                                    onClick={() => setModalStatus(false)}
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

export default withFormik<any, IDispositionAddRequest>({
    mapPropsToValues: () => ({
        name: '',
        desc: '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        desc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(AddDisposition);
