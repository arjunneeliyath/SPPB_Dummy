import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import { IDispositionEditRequest } from '../../../interfaces/admin/disposition/edit-dispostion';
import { IDispositionList } from '../../../interfaces/admin/disposition/get-all-disposition';
interface IEditDispositionFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    dispositionData: IDispositionList;
    onUpdateClick: (data: IDispositionEditRequest) => void;
}

const EditDispositionForm = (props: IEditDispositionFormProps & FormikProps<IDispositionEditRequest>) => {
    const {
        handleChange,
        values,
        touched,
        handleBlur,
        errors,
        setModalStatus,
        onUpdateClick,
        dispositionData,
        dirty,
        isValid,
    } = props;
    const classes = useStyles();

    const onDispositionEditClick = () => {
        const dispositonEditValues: IDispositionEditRequest = {
            id: dispositionData.id,
            name: values.name?.trim(),
            desc: values.desc?.trim(),
        };
        onUpdateClick(dispositonEditValues);
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
                                            onBlur={handleBlur}
                                            rows={7}
                                            component="textarea"
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
                                                        onDispositionEditClick();
                                                    }}
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

export default withFormik<any, IDispositionEditRequest>({
    mapPropsToValues: (props: IEditDispositionFormProps) => ({
        id: props.dispositionData.id,
        name: props.dispositionData.name,
        desc: props.dispositionData.desc,
    }),
    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        desc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),
})(EditDispositionForm);
