import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../../components/form-field/form-field';
import { Grid, Box, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { ISaveDataTypeRequest } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/add-data-type';
import { IValueSet } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/value-set';
import EditableTable from '../../../../components/editable-table/editable-table';

interface IAddFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onSaveClick: (defectCategory: ISaveDataTypeRequest) => void;
}

export interface IDataTypeValues {
    name: string;
    desc: string;
}
interface ITitles {
    prop: string;
    name: string;
    isRequired?: boolean;
    checkDuplicate?: boolean;
}
const titles: ITitles[] = [
    { prop: 'seq', name: 'Seq#' },
    { prop: 'name', name: 'Data Value', isRequired: true, checkDuplicate: true },
    { prop: 'description', name: 'Value Description', isRequired: true },
    { prop: 'delete', name: 'Delete' },
];
const AddNewDataType = (props: IAddFormProps & FormikProps<IDataTypeValues>) => {
    const { handleChange, handleBlur, values, touched, errors, setModalStatus, onSaveClick, dirty, isValid } = props;
    const [valueSetList, setValueSetList] = useState<IValueSet[]>([]);
    const [renderOn, setRenderOn] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        if (valueSetList?.length > 0) {
            setDuplicateName('name');
        }
    }, [renderOn]);

    const onCreateClick = () => {
        const dataTypeAddValues: ISaveDataTypeRequest = {
            name: values.name,
            desc: values.desc,
            code: 'User Defined Item Attribute',
            valueSetList: [...valueSetList],
            valueSetSW: valueSetList.length > 0 ? 'YES' : 'NO',
        };
        onSaveClick(dataTypeAddValues);
        setModalStatus(false);
    };

    const addRows = () => {
        const row: IValueSet = {
            name: '',
            description: '',
        };
        const rows = [...valueSetList, row];
        setValueSetList(rows);
    };

    const handleRemove = (i: number) => {
        setValueSetList(valueSetList.filter((row, j) => j !== i));
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        reRenderValueSetList(index, name, value);
        setRenderOn(Date.now());
    };

    const resetTable = () => {
        valueSetList.forEach((row) => {
            return (row.name = ''), (row.description = ''), (row.isNameDuplicate = false), (row.isModified = false);
        });
        setValueSetList([...valueSetList]);
    };
    const reRenderValueSetList = (index: number, name: string, value: any) => {
        setValueSetList((state) => state.map((row, j) => (j === index ? { ...row, [name]: value } : row)));
    };

    const setDuplicateName = (name: string) => {
        const defectArr = valueSetList.map((item: any, i: number) => {
            return { [name]: item[name], index: i };
        });
        setValueSetList((state) =>
            state.map((row) => ({
                ...row,
                ['isNameDuplicate']:
                    defectArr.filter((item) => {
                        return (
                            row.name?.trim() !== '' &&
                            item[name]?.trim()?.toLowerCase() === row.name?.trim()?.toLowerCase()
                        );
                    }).length > 1,
            }))
        );
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
                                            onBlur={handleBlur}
                                            id="name"
                                            name="name"
                                            label="Data Type Name"
                                            value={values.name}
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
                                            onBlur={handleBlur}
                                            id="desc"
                                            name="desc"
                                            label="Type Description"
                                            value={values.desc}
                                            handleChange={handleChange}
                                            touched={touched.desc}
                                            errors={errors.desc}
                                            className={classes.textareaField}
                                        />
                                    </Grid>
                                    <Grid item className={classes.valueSetGridField}>
                                        <FormLabel className={classes.valueSetField}>Value Set</FormLabel>
                                    </Grid>
                                    <Grid className={classes.gridContainer}>
                                        <EditableTable
                                            addButton={
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={addRows}
                                                    className={classes.addButton}
                                                    role="add-btn"
                                                >
                                                    Add
                                                </Button>
                                            }
                                            renderBackButton={false}
                                            handleChange={handleRowInputChange}
                                            handleRemove={handleRemove}
                                            data={valueSetList}
                                            header={titles}
                                            onBlur={() => setRenderOn(Date.now())}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} className={classes.buttonItem}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disableRipple
                                                    className={classes.buttonSubmit}
                                                    disabled={
                                                        !(dirty && isValid) ||
                                                        valueSetList?.some(
                                                            (row) =>
                                                                row.name === '' ||
                                                                row.description === '' ||
                                                                row.isNameDuplicate
                                                        )
                                                    }
                                                    onClick={() => onCreateClick()}
                                                    role="submit-btn"
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
                                                    role="reset-role"
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

export default withFormik<IAddFormProps, IDataTypeValues>({
    mapPropsToValues: () => ({
        name: '',
        desc: '',
        code: '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        desc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(AddNewDataType);
