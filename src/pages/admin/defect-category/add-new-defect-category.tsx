import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { ISaveDefectCategoryRequest } from '../../../interfaces/admin/defect-category/save-defect-category';
import { IDefect } from '../../../interfaces/admin/defect-category/defect';
import EditableTable from '../../../components/editable-table/editable-table';

interface IAddFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onSaveClick: (defectCategory: ISaveDefectCategoryRequest) => void;
}

export interface IDefectCategoryValues {
    name: string;
    description: string;
}
interface ITitles {
    prop: string;
    name: string;
    isRequired?: boolean;
    checkDuplicate?: boolean;
}
const titles: ITitles[] = [
    { prop: 'name', name: 'Defect Name', isRequired: true, checkDuplicate: true },
    { prop: 'description', name: 'Defect Description', isRequired: true },
    { prop: 'delete', name: 'Delete' },
];
const AddNewDefectCategory = (props: IAddFormProps & FormikProps<IDefectCategoryValues>) => {
    const { handleChange, handleBlur, values, touched, errors, setModalStatus, onSaveClick, dirty, isValid } = props;
    const [defects, setDefects] = useState<IDefect[]>([]);
    const [renderOn, setRenderOn] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        if (defects?.length > 0) {
            setDuplicateName('name');
        }
    }, [renderOn]);

    const onCreateClick = () => {
        const defectCategoryAddValues: ISaveDefectCategoryRequest = {
            name: values.name?.trim(),
            description: values.description?.trim(),
            defects: [...defects],
        };
        onSaveClick(defectCategoryAddValues);
        setModalStatus(false);
    };

    const addRows = () => {
        const row: IDefect = {
            name: '',
            description: '',
            itemTypeInd: 'unassigned',
        };
        const rows = [...defects, row];
        setDefects(rows);
    };

    const handleRemove = (i: number) => {
        setDefects(defects.filter((row, j) => j !== i));
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        reRenderDefectList(index, name, value);
        setRenderOn(Date.now());
    };

    const resetTable = () => {
        defects.forEach((row) => {
            return (row.name = ''), (row.description = ''), (row.isNameDuplicate = false);
        });
        setDefects([...defects]);
    };

    const reRenderDefectList = (index: number, name: string, value: any) => {
        setDefects((state) => state.map((row, j) => (j === index ? { ...row, [name]: value } : row)));
    };

    const setDuplicateName = (name: string) => {
        const defectArr = defects.map((item: any, i: number) => {
            return { [name]: item[name], index: i };
        });
        setDefects((state) =>
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
                                            label="Defect Category Name"
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
                                            id="description"
                                            name="description"
                                            label="Defect Category Description"
                                            value={values.description}
                                            handleChange={handleChange}
                                            touched={touched.description}
                                            errors={errors.description}
                                            className={classes.textareaField}
                                        />
                                    </Grid>
                                    <Grid item className={classes.defectGridField}>
                                        <FormLabel className={classes.defectListField}>Defects List</FormLabel>
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
                                                    Add Defect
                                                </Button>
                                            }
                                            renderBackButton={false}
                                            handleChange={handleRowInputChange}
                                            handleRemove={handleRemove}
                                            data={defects}
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
                                                        defects?.some(
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

export default withFormik<IAddFormProps, IDefectCategoryValues>({
    mapPropsToValues: () => ({
        name: '',
        description: '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        description: Yup.string().trim().required('Required').max(255, 'Max number of characters allowed is 255'),
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(AddNewDefectCategory);
