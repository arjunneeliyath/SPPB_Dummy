import React, { useState } from 'react';
import { Box, Button, FormLabel } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import EditableTable from '../../../../components/editable-table/editable-table';
import { IEditDataTypeRequest } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/update-data-type';
import { useEffect } from 'react';
import { IDataTypeList } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/data-type-list';
import { IValueSet } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/value-set';
import { Form, FormikProps, withFormik } from 'formik';
import FormComponent from '../../../../components/form-field/form-field';
import * as Yup from 'yup';
import _ from 'lodash';
import CircularIndeterminate from '../../../../components/busy-indicator/busy-indicator';

interface IUpdateFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onUpdateClick: (defectCategory: IEditDataTypeRequest) => void;
    dataType: IDataTypeList;
}

interface ITitles {
    prop: string;
    name: string;
    isRequired?: boolean;
    checkDuplicate?: boolean;
}

export interface IDataTypeValues {
    name: string;
    desc: string;
}

const titles: ITitles[] = [
    { prop: 'seq', name: 'Seq#' },
    { prop: 'name', name: 'Data Value', isRequired: true, checkDuplicate: true },
    { prop: 'description', name: 'Value Description', isRequired: true },
    { prop: 'delete', name: 'Delete' },
];
const UpdateDataType = (props: IUpdateFormProps & FormikProps<IDataTypeValues>) => {
    const {
        handleChange,
        values,
        touched,
        errors,
        onUpdateClick,
        dirty,
        isValid,
        dataType,
        handleBlur,
        setModalStatus,
    } = props;

    const [valueSetList, setValueSetList] = useState<IValueSet[]>([]);
    const [valueSetDeletedList, setValueDeletedSetList] = useState<IValueSet[]>([]);
    const [isModified, setIsModified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [renderOn, setRenderOn] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        if (isDeleted) {
            setIsLoading(true);
        }
    }, [isDeleted]);

    useEffect(() => {
        if (dataType?.id) {
            setValueSetList(dataType.valueSetList);
            setIsLoading(false);
            setIsDeleted(false);
        }
    }, [dataType]);

    useEffect(() => {
        if (valueSetList?.length > 0) {
            setDuplicateName('name');
        }
    }, [renderOn]);

    useEffect(() => {
        if (valueSetList?.length >= 0) {
            if (_.differenceWith(dataType.valueSetList, valueSetList, _.isEqual)?.length > 0) {
                setIsModified(true);
            } else if (dataType.valueSetList.length !== valueSetList.length) {
                const results = dataType.valueSetList.filter(
                    ({ seqNbr: id1 }) => !valueSetList.some(({ seqNbr: id2 }) => id2 === id1)
                );
                setIsModified(!results.some((row) => row.name === '' || row.description === ''));
            } else {
                setIsModified(false);
            }
        }
    }, [valueSetList]);

    const onUpdateDataTypeClick = () => {
        const dataTypeAddValues: IEditDataTypeRequest = {
            id: dataType?.id,
            name: values.name,
            desc: values.desc,
            valueSetList: valueSetList,
            valueSetSW: valueSetList.length > 0 ? 'YES' : 'NO',
        };
        onUpdateClick(dataTypeAddValues);
    };

    const addRows = () => {
        const row: IValueSet = {
            name: '',
            description: '',
        };
        const rows = [...valueSetList, row];
        setValueSetList(rows);
    };

    const handleRemove = (index: number) => {
        valueSetList?.forEach((defect, rowIndex) => {
            if (index === rowIndex) {
                defect.isDeleted = true;
            }
        });
        const array1 = valueSetList.filter((valueSet) => valueSet.isDeleted);
        setValueDeletedSetList(array1);
        const array2: Array<IValueSet> = valueSetDeletedList;
        for (let j = 0; j < array1.length; j++) {
            array2.push(array1[j]);
        }
        setValueDeletedSetList(array2);
        setValueSetList(valueSetList.filter((row, j) => j !== index));
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        valueSetList?.forEach((defect, rowIndex) => {
            if (index === rowIndex) {
                defect.isModified = true;
            }
        });
        reRenderValueSetList(index, name, value);
        setRenderOn(Date.now());
    };

    const resetTable = () => {
        dataType.valueSetList.forEach((element, index) => {
            if (element.isDeleted) {
                dataType.valueSetList[index].isDeleted = false;
            }
        });

        setValueSetList(dataType.valueSetList);
        if (valueSetDeletedList.length > 0) {
            valueSetDeletedList.length = 0;
            setValueDeletedSetList(valueSetDeletedList);
        }
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
                                                        className={classes.buttonSubmit}
                                                        disabled={
                                                            !(isModified || (dirty && isValid)) ||
                                                            valueSetList?.some(
                                                                (row) =>
                                                                    row.name === '' ||
                                                                    row.description === '' ||
                                                                    row.isNameDuplicate
                                                            )
                                                        }
                                                        onClick={() => onUpdateDataTypeClick()}
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
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={() => {
                                                            setModalStatus(false);
                                                        }}
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
        </Grid>
    );
};

export default withFormik<IUpdateFormProps, IDataTypeValues>({
    mapPropsToValues: (props: IUpdateFormProps) => ({
        name: props?.dataType?.name || '',
        desc: props?.dataType?.desc || '',
    }),
    validationSchema: Yup.object({
        name: Yup.string().trim().required('Required'),
        desc: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
    }),
    enableReinitialize: true,
    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(UpdateDataType);
