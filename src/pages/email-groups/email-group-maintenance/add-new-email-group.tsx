import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { IEmailAddress } from '../../../interfaces/email-groups/email-group-maintenance/email-address';
import MultiCheckboxTable from '../../../components/muti-checkbox-table/multi-checkbox-table';
import { ISaveEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/save-email-group';
interface IAddFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onCreateClick: (emailGroup: ISaveEmailGroup) => void;
}

export interface IAddEmailGroupValues {
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
    { prop: 'doRemove', name: 'Remove' },
    { prop: 'name', name: 'Name', isRequired: true, checkDuplicate: true },
    { prop: 'emailAddress', name: 'Email Address', isRequired: true, type: 'email', checkDuplicate: true },
    { prop: 'doValidate', name: 'Validate' },
];

const AddNewEmailGroup = (props: IAddFormProps & FormikProps<IAddEmailGroupValues>) => {
    const { handleChange, handleBlur, values, touched, errors, setModalStatus, dirty, isValid, onCreateClick } = props;
    const [emailAddresses, setEmailAddresses] = useState<IEmailAddress[]>([]);
    const [activeColumn, setActiveColumn] = useState('');
    const [renderOn, setRenderOn] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        if (emailAddresses?.length > 0) {
            setDuplicateName();
        }
    }, [renderOn]);

    const addRows = () => {
        const row: IEmailAddress = {
            name: '',
            emailAddress: '',
            doRemove: false,
            doValidate: false,
        };

        const rows = [...emailAddresses, row];
        setEmailAddresses(rows);
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        if (name === 'emailAddress') {
            if (emailAddresses[index].doValidate) {
                isSafewayMailId(value, index);
            } else {
                isMailId(value, index);
            }
        }
        setActiveColumn(name);
        reRenderEmailAddress(index, name, value);
        setRenderOn(Date.now());
    };

    const resetTable = () => {
        emailAddresses.forEach((row) => {
            return (
                (row.name = ''),
                (row.emailAddress = ''),
                (row.doRemove = false),
                (row.doValidate = false),
                (row.isModified = false),
                (row.isSafewayMail = false),
                (row.isMailDuplicate = false),
                (row.isNameDuplicate = false)
            );
        });
        setEmailAddresses([...emailAddresses]);
    };

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
        const { checked } = event.target;
        if (checked) {
            isSafewayMailId(emailAddresses[index].emailAddress, index);
        } else {
            isMailId(emailAddresses[index].emailAddress, index);
        }
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

    const isSafewayMailId = (email: string, index: number) => {
        let domain = '';
        if (email !== null || email !== '') {
            domain = email.indexOf('@') !== -1 ? email.substring(email.indexOf('@') + 1, email.length).trim() : '';
            reRenderEmailAddress(index, 'isSafewayMail', domain.includes('safeway.com'));
        }
    };

    const isMailId = (email: string, index: number) => {
        const atposition = email.indexOf('@');
        const dotposition = email.lastIndexOf('.');
        const isValid = !(atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length);
        if (email !== null || email !== '') {
            reRenderEmailAddress(index, 'isValidMail', isValid);
        }
    };

    const reRenderEmailAddress = (index: number, name: string, value: any) => {
        setEmailAddresses((state) => state.map((row, j) => (j === index ? { ...row, [name]: value } : row)));
    };

    const onCreateEmailGroupClick = () => {
        const unRemovedAddressess: IEmailAddress[] = emailAddresses.filter((email) => !email.doRemove);
        const emailGroup: ISaveEmailGroup = {
            name: values.name?.trim(),
            description: values.description?.trim(),
            emailAddresses: [...unRemovedAddressess],
        };
        onCreateClick(emailGroup);
    };

    const setDuplicateName = () => {
        const valueArr = emailAddresses.map((item: any, i: number) => {
            return { [activeColumn as any]: item[activeColumn as any], index: i };
        });
        setEmailAddresses((state) =>
            state.map((row: any) => ({
                ...row,
                [activeColumn === 'name' ? 'isNameDuplicate' : 'isMailDuplicate']:
                    valueArr.filter((item) => {
                        return (
                            row[activeColumn as any]?.trim() !== '' &&
                            item[activeColumn as any]?.trim()?.toLowerCase() ===
                                row[activeColumn as any]?.trim()?.toLowerCase()
                        );
                    }).length > 1,
            }))
        );
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.boxStyle}>
                    <Form noValidate>
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
                                            onBlur={handleBlur}
                                            handleChange={handleChange}
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
                                            addButton={
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={addRows}
                                                    className={classes.addButton}
                                                >
                                                    Add Email Address
                                                </Button>
                                            }
                                            renderBackButton={false}
                                            handleChange={handleRowInputChange}
                                            data={emailAddresses}
                                            header={titles}
                                            handleSelectAllClick={handleSelectAllClick}
                                            handleCheckboxClick={handleCheckboxClick}
                                            onBlur={() => setRenderOn(Date.now())}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} className={classes.buttonItem}>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                    className={classes.buttonSubmit}
                                                    disabled={
                                                        !(dirty && isValid) ||
                                                        emailAddresses?.some((row) =>
                                                            !row.doRemove
                                                                ? row.name === '' ||
                                                                  row.emailAddress === '' ||
                                                                  row.isMailDuplicate ||
                                                                  row.isNameDuplicate ||
                                                                  !row.isValidMail ||
                                                                  (row.doValidate && !row.isSafewayMail)
                                                                : false
                                                        )
                                                    }
                                                    onClick={onCreateEmailGroupClick}
                                                >
                                                    Create
                                                </Button>
                                                <Button
                                                    type="reset"
                                                    disableRipple
                                                    className={classes.button}
                                                    onClick={resetTable}
                                                    color="primary"
                                                    variant="outlined"
                                                >
                                                    Reset
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

export default withFormik<IAddFormProps, IAddEmailGroupValues>({
    mapPropsToValues: () => ({
        name: '',
        description: '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        description: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(AddNewEmailGroup);
