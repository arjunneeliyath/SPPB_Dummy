import React, { useState } from 'react';
import { Box, Button, FormLabel } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import EditableTable from '../../../components/editable-table/editable-table';
import { IUpdateDefectCategoryRequest } from '../../../interfaces/admin/defect-category/edit-defect-category';
import { useEffect } from 'react';
import { IGetDefectCategory } from '../../../interfaces/admin/defect-category/get-defect-category';
import { IDefect } from '../../../interfaces/admin/defect-category/defect';
import { Form, FormikProps, withFormik } from 'formik';
import FormComponent from '../../../components/form-field/form-field';
import * as Yup from 'yup';
import _ from 'lodash';
import ConfirmModal from '../../../components/modal/confirm-modal';
import { IDeleteDefectValues } from '../../../interfaces/admin/defect-category/delete-defect';
import CircularIndeterminate from '../../../components/busy-indicator/busy-indicator';

interface IUpdateFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    updateModal: boolean;
    onUpdateClick: (defectCategory: IUpdateDefectCategoryRequest) => void;
    getDefectCategoryDetails: () => void;
    defectCategoryDetails: IGetDefectCategory;
    onEditCancelClick: () => void;
    deleteDefect: (data: IDeleteDefectValues) => void;
}

interface ITitles {
    prop: string;
    name: string;
    isRequired?: boolean;
    checkDuplicate?: boolean;
}

export interface IDefectCategoryValues {
    name: string;
    description: string;
}

const titles: ITitles[] = [
    { prop: 'name', name: 'Defect Name', isRequired: true, checkDuplicate: true },
    { prop: 'description', name: 'Defect Description', isRequired: true },
    { prop: 'delete', name: 'Delete' },
];
const UpdateNewDefectCategory = (props: IUpdateFormProps & FormikProps<IDefectCategoryValues>) => {
    const {
        handleChange,
        values,
        touched,
        errors,
        onUpdateClick,
        dirty,
        isValid,
        defectCategoryDetails,
        getDefectCategoryDetails,
        updateModal,
        onEditCancelClick,
        handleBlur,
        deleteDefect,
    } = props;

    const [defects, setDefects] = useState<IDefect[]>([]);
    const [isModified, setIsModified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<number>(0);
    const [isDeleted, setIsDeleted] = useState(false);
    const [renderOn, setRenderOn] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        if (updateModal) {
            getDefectCategoryDetails();
            setIsLoading(true);
        }
    }, [updateModal]);

    useEffect(() => {
        if (isDeleted) {
            setIsLoading(true);
        }
    }, [isDeleted]);

    useEffect(() => {
        if (isLoading && defectCategoryDetails?.id) {
            setDefects(defectCategoryDetails.defects);
            setIsLoading(false);
            setIsDeleted(false);
        }
    }, [defectCategoryDetails]);

    useEffect(() => {
        if (defects?.length > 0) {
            setDuplicateName('name');
        }
    }, [renderOn]);

    useEffect(() => {
        // Compare the 'old defects' array and the 'new defects' array,
        // (If any changes are made in the table cells and
        // the length of both arrays are equal) and if the arrays are
        // not equal, return the distinct array object.
        if (_.differenceWith(defectCategoryDetails?.defects, defects, _.isEqual)?.length > 0) {
            setIsModified(true);
            // If the length of both arrays are not equal, find the distinct array
            // object and check whether the distict objects are not empty.
        } else if (defectCategoryDetails?.defects?.length !== defects.length) {
            const results = defectCategoryDetails?.defects?.filter(
                ({ id: id1 }) => !defects.some(({ id: id2 }) => id2 === id1)
            );
            setIsModified(!results?.some((row) => row.name === '' || row.description === ''));
        } else {
            setIsModified(false);
        }
    }, [defects]);

    const onUpdateDefCatClick = () => {
        const modifiedDefects = defects.filter((defect) => defect.isModified);
        const defectCategoryAddValues: IUpdateDefectCategoryRequest = {
            id: defectCategoryDetails?.id,
            name: values.name,
            description: values.description,
            defects: [...modifiedDefects],
        };

        onUpdateClick(defectCategoryAddValues);
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

    const handleRemove = (index: number, id: number) => {
        if (id !== undefined || id > 0) {
            setSelectedRowId(id);
            setDeleteModalStatus(true);
        } else {
            setDefects(defects.filter((row, j) => j !== index));
        }
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        defects?.forEach((defect, rowIndex) => {
            if (index === rowIndex) {
                defect.isModified = true;
            }
        });
        reRenderDefectsList(index, name, value);
        setRenderOn(Date.now());
    };

    const resetTable = () => {
        setDefects(defectCategoryDetails.defects);
    };

    const reRenderDefectsList = (index: number, name: string, value: any) => {
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
                                {isLoading ? (
                                    <CircularIndeterminate />
                                ) : (
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
                                                        className={classes.buttonSubmit}
                                                        disabled={
                                                            !((dirty || isModified) && isValid) ||
                                                            defects?.some(
                                                                (row) =>
                                                                    row.name === '' ||
                                                                    row.description === '' ||
                                                                    row.isNameDuplicate
                                                            )
                                                        }
                                                        onClick={() => onUpdateDefCatClick()}
                                                    >
                                                        Update
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
                                                        onClick={onEditCancelClick}
                                                        color="primary"
                                                        variant="outlined"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Form>
                </Box>
            </Grid>
            <ConfirmModal
                title="Confirm"
                message="Are you sure you want to delete the item?"
                buttonVariant="text"
                onSuccess={() => {
                    const deleteParam: IDeleteDefectValues = {
                        categoryId: defectCategoryDetails.id,
                        selectedRowId: selectedRowId,
                    };
                    deleteDefect(deleteParam);
                    setDeleteModalStatus(false);
                    setIsDeleted(true);
                }}
                onCancel={() => {
                    setDeleteModalStatus(false);
                }}
                confirmModalStatus={deleteModalStatus}
            />
        </Grid>
    );
};

export default withFormik<IUpdateFormProps, IDefectCategoryValues>({
    mapPropsToValues: (props: IUpdateFormProps) => ({
        name: props?.defectCategoryDetails?.name || '',
        description: props?.defectCategoryDetails?.description || '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        description: Yup.string().trim().required('Required').max(255, 'Max number of characters allowed is 255'),
    }),
    enableReinitialize: true,
    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(UpdateNewDefectCategory);
