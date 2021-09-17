import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { IEmailAddress } from '../../../interfaces/email-groups/email-group-maintenance/email-address';
import MultiCheckboxTable from '../../../components/muti-checkbox-table/multi-checkbox-table';
import _ from 'lodash';
import { ICopyEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/copy-email-group';
import { emptyFunction } from '../../../utils/helper';

interface ICopyFormProps {
    setCopyModalStatus: (modalStatus: boolean) => void;
    copyModalStatus: boolean;
    onUpdateClick: (data: ICopyEmailGroup) => void;
    copiedEmailAddresses: IEmailAddress[];
}

export interface ICopyEmailGroupValues {
    name: string;
    description: string;
}

export interface ISelectedNum {
    numSelected: number;
    prop: string;
}

interface ITitles {
    prop: string;
    name: string;
    isRequired?: boolean;
    type?: string;
    checkDuplicate?: boolean;
}

const titles: ITitles[] = [
    { prop: 'name', name: 'Name', isRequired: true, checkDuplicate: true },
    { prop: 'emailAddress', name: 'Email Address', isRequired: true, type: 'email', checkDuplicate: true },
];

const CopyEmailGroup = (props: ICopyFormProps & FormikProps<ICopyEmailGroupValues>) => {
    const {
        handleChange,
        values,
        touched,
        errors,
        dirty,
        isValid,
        onUpdateClick,
        setCopyModalStatus,
        copiedEmailAddresses,
        copyModalStatus,
        handleBlur,
    } = props;
    const [emailAddresses, setEmailAddresses] = useState<IEmailAddress[]>([]);
    const classes = useStyles();

    useEffect(() => {
        if (copyModalStatus && copiedEmailAddresses?.length > 0) {
            const idStrippedArray = _.map(copiedEmailAddresses, (row) => {
                return _.omit(row, ['id']);
            });
            setEmailAddresses(idStrippedArray.filter((email) => !email.doRemove));
        }
    }, [copyModalStatus, copiedEmailAddresses]);

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        reRenderEmailAddress(index, name, value);
    };

    const reRenderEmailAddress = (index: number, name: string, value: any) => {
        setEmailAddresses((state) => state.map((row, j) => (j === index ? { ...row, [name]: value } : row)));
    };

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
        const { checked } = event.target;
        reRenderEmailAddress(index, name, checked);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, name: any) => {
        const { checked } = event.target;
        const selectAll = emailAddresses.map((row) => ({
            ...row,
            [name.prop]: checked,
            ['isSafewayMail']: (row.emailAddress.indexOf('@') !== -1
                ? row.emailAddress.substring(row.emailAddress.indexOf('@') + 1, row.emailAddress.length).trim()
                : ''
            ).includes('safeway.com'),
        }));
        setEmailAddresses([...selectAll]);
    };

    const onUpdateEmailGrpClick = () => {
        const emailGroupValues: ICopyEmailGroup = {
            name: values.name?.trim(),
            description: values.description?.trim(),
            emailAddresses: [...emailAddresses],
        };

        onUpdateClick(emailGroupValues);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.boxStyle}>
                    <Form>
                        <Grid container>
                            <Grid item xs={12} className={classes.rowContainer}>
                                <Grid container direction="column">
                                    <Grid item className={classes.nameField}>
                                        <FormComponent
                                            autoFocus
                                            disabled={false}
                                            required={true}
                                            component="input"
                                            id="name"
                                            name="name"
                                            label="Group Name"
                                            value={values.name}
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            touched={touched.name}
                                            errors={errors.name}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid item className={classes.textField}>
                                        <FormComponent
                                            autoFocus
                                            disabled={false}
                                            required={true}
                                            rows={3}
                                            component="textarea"
                                            id="description"
                                            name="description"
                                            label="Group Description"
                                            value={values.description}
                                            onBlur={handleBlur}
                                            handleChange={handleChange}
                                            touched={touched.description}
                                            errors={errors.description}
                                            className={classes.textareaField}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormLabel className={classes.defectListField}>Email Addresses</FormLabel>
                                    </Grid>
                                    <Grid className={classes.gridContainer}>
                                        <MultiCheckboxTable
                                            renderBackButton={false}
                                            handleChange={handleRowInputChange}
                                            data={emailAddresses}
                                            header={titles}
                                            handleSelectAllClick={handleSelectAllClick}
                                            handleCheckboxClick={handleCheckboxClick}
                                            disable
                                            onBlur={() => emptyFunction()}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} className={classes.buttonItem}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.buttonSubmit}
                                                    disabled={!(dirty && isValid)}
                                                    onClick={() => onUpdateEmailGrpClick()}
                                                >
                                                    Create Copy
                                                </Button>
                                                <Button
                                                    type="reset"
                                                    disableRipple
                                                    className={classes.button}
                                                    color="primary"
                                                    variant="outlined"
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    disableRipple
                                                    className={classes.button}
                                                    onClick={() => {
                                                        setCopyModalStatus(false);
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

export default withFormik<ICopyFormProps, ICopyEmailGroupValues>({
    mapPropsToValues: () => ({
        name: '',
        description: '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required').max(255, 'Max number of characters allowed is 255'),
    }),
    enableReinitialize: true,
    handleSubmit: (values, { props }) => {
        props.setCopyModalStatus(false);
    },
})(CopyEmailGroup);
