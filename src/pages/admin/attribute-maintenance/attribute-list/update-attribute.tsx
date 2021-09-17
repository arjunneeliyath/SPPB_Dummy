import React, { Dispatch, useState } from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { withFormik, Form, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import FormComponent from '../../../../components/form-field/form-field';
import { Grid, Box, FormLabel } from '@material-ui/core';
import { useStyles } from './styles';
import checkboxItemTypeValues from '../../../../constants/admin/attribute-maintenance/checkbox-item-type-values';
import checkboxRecordType1Values from '../../../../constants/admin/attribute-maintenance/checkbox-record-type1-values';
import checkboxRecordType2Values from '../../../../constants/admin/attribute-maintenance/checkbox-record-type2-values';
import { IAttributeMaintenanceEditRequest } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/edit-attribute';
import { IAttribute } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/get-all-attribute';
import Link from '@material-ui/core/Link';
import Modal from '../../../../components/modal/modal';
import DataTypeViewForm from './view-datatype';
import { IDataType } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/get-datatype';
import { AnyAction } from 'redux';
import { getDataType } from '../../../../modules/admin/attribute-maintenance/datatype-view';
import { IReduxState } from '../../../../modules/store';
import _ from 'lodash';

interface IUpdateFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    onUpdateClick: (editAttributeMaintenance: IAttributeMaintenanceEditRequest) => void;
    attributeItem: IAttribute;
    dataTypeView: IDataType;
    getDataTypeView: (data: number) => void;
}

const UpdateAttributeMaintenaceForm = (props: IUpdateFormProps & FormikProps<IAttributeMaintenanceEditRequest>) => {
    const [dataTypeViewModal, setDataTypeViewModal] = useState(false);
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        setModalStatus,
        onUpdateClick,
        isValid,
        attributeItem,
        dataTypeView,
        getDataTypeView,
        initialValues,
    } = props;
    const classes = useStyles();
    const onAttributeMaintenanceUpdateClick = () => {
        const attributeMaintenanceUpdateValues: IAttributeMaintenanceEditRequest = {
            id: attributeItem.id,
            name: values.name,
            description: values.description,
            dataType: values.dataType,
            dataTypeId: attributeItem.dataTypeId,
            attrType: values.attrType,
            attrRecordType: values.attrRecordType,
            itemType: values.itemType,
            attrRecTypeForDC: values.attrRecTypeForDC,
            attrWeight: values.attrWeight,
            attrFailureLimit: values.attrFailureLimit,
            itemMock: values.itemMock,
            user: attributeItem.user,
        };
        onUpdateClick(attributeMaintenanceUpdateValues);
        setModalStatus(false);
    };
    const onDataTypeClick = () => {
        setDataTypeViewModal(true);
    };

    const checkDisabled = () => {
        const checkArrayValues = (arrayValues: string[] = [], arrayInitialValues: string[] = []) => {
            if (arrayValues?.length === arrayInitialValues.length) {
                let flag = 0;
                const array1 = _.sortBy(arrayValues);
                const array1Initial = _.sortBy(arrayInitialValues);
                if (_.isEqual(array1, array1Initial)) {
                    flag = 1;
                }
                if (flag === 0) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        };

        if (
            isValid &&
            (values.name !== initialValues.name ||
                values.description !== initialValues.description ||
                checkArrayValues(values?.itemMock, initialValues?.itemMock) ||
                checkArrayValues(values.attrRecordType, initialValues.attrRecordType) ||
                values.attrFailureLimit !== initialValues.attrFailureLimit ||
                values.attrWeight !== initialValues.attrWeight)
        ) {
            return false;
        }
        return true;
    };

    return (
        <Box>
            <Form>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                                <FormComponent
                                    autoFocus
                                    disabled={false}
                                    required={true}
                                    onBlur={handleBlur}
                                    component="input"
                                    id="name"
                                    name="name"
                                    label="Attribute Name"
                                    value={values.name}
                                    handleChange={handleChange}
                                    touched={touched.name}
                                    errors={errors.name}
                                    className={classes.inputField}
                                />
                                <FormComponent
                                    disabled={false}
                                    required={true}
                                    component="textarea"
                                    rows={2}
                                    id="description"
                                    name="attributeDesc"
                                    label="Attribute Description"
                                    value={values.description}
                                    handleChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.description}
                                    errors={errors.description}
                                    className={classes.textareaField}
                                />
                                <Grid container className={classes.linkField}>
                                    <Grid item xs={6}>
                                        <FormLabel className={classes.labelField}>Attribute Data Type:</FormLabel>
                                    </Grid>
                                    <Grid item xs={6} className={classes.linkText}>
                                        <Link href="#" onClick={() => onDataTypeClick()}>
                                            {values.dataType}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.linkField}>
                                    <Grid item xs={6}>
                                        <FormLabel className={classes.labelField}>Attribute Type:</FormLabel>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormLabel className={classes.labelField}>{values.attrType}</FormLabel>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FormComponent
                                    required={true}
                                    component="checkbox"
                                    onBlur={handleBlur}
                                    id="itemMock"
                                    name="itemMock"
                                    label="Item Type"
                                    touched={touched.itemMock}
                                    value={values.itemMock?.toString()}
                                    handleChange={handleChange}
                                    checkBoxOptions={checkboxItemTypeValues}
                                    errors={errors.itemMock?.toString()}
                                />
                                {values.attrRecTypeForDC ? (
                                    <Grid item>
                                        <FormComponent
                                            component="checkbox"
                                            onBlur={handleBlur}
                                            id="attrRecordType"
                                            name="attrRecordType"
                                            label="Attribute Record Type"
                                            touched={touched.attrRecordType}
                                            value={values.attrRecordType.toString()}
                                            handleChange={handleChange}
                                            checkBoxOptions={checkboxRecordType2Values}
                                            errors={errors.attrRecordType?.toString()}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item>
                                        <FormComponent
                                            component="checkbox"
                                            id="attrRecordType"
                                            name="attrRecordType"
                                            onBlur={handleBlur}
                                            touched={touched.attrRecordType}
                                            label="Attribute Record Type"
                                            value={values.attrRecordType.toString()}
                                            handleChange={handleChange}
                                            checkBoxOptions={checkboxRecordType1Values}
                                            errors={errors.attrRecordType?.toString()}
                                        />
                                    </Grid>
                                )}
                                {values.dataType === 'LevelGrade(5)' ? (
                                    <Grid>
                                        <FormComponent
                                            component="input"
                                            required={true}
                                            id="attrWeight"
                                            type="number"
                                            name="attrWeight"
                                            label="Weighted %"
                                            onBlur={handleBlur}
                                            value={values.attrWeight?.toString()}
                                            handleChange={handleChange}
                                            touched={touched.attrWeight}
                                            errors={errors.attrWeight}
                                            className={classes.inputField}
                                        />
                                        <FormComponent
                                            component="input"
                                            id="attrFailureLimit"
                                            name="attrFailureLimit"
                                            required={true}
                                            type="number"
                                            label="Failure Limit %"
                                            onBlur={handleBlur}
                                            value={values.attrFailureLimit?.toString()}
                                            handleChange={handleChange}
                                            touched={touched.attrFailureLimit}
                                            errors={errors.attrFailureLimit}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                ) : null}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12} className={classes.buttonItem}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            className={classes.buttonSubmit}
                                            disabled={checkDisabled()}
                                            onClick={() => {
                                                onAttributeMaintenanceUpdateClick();
                                            }}
                                        >
                                            Update
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
            <Modal
                maxWidth={'xs'}
                title="Data Type View"
                content={
                    <DataTypeViewForm
                        setDataTypeViewModal={setDataTypeViewModal}
                        getDataTypeView={getDataTypeView}
                        dataTypeView={dataTypeView}
                        dataTypeViewModal={dataTypeViewModal}
                        dataTypeId={attributeItem.dataTypeId}
                    />
                }
                modalStatus={dataTypeViewModal}
                setModalStatus={setDataTypeViewModal}
            />
        </Box>
    );
};
const UpdateAttributeForm = withFormik<any, IAttributeMaintenanceEditRequest>({
    mapPropsToValues: (props: IUpdateFormProps) => ({
        id: props.attributeItem.id,
        name: props.attributeItem.name,
        description: props.attributeItem.description,
        dataType: props.attributeItem.dataType,
        dataTypeId: props.attributeItem.dataTypeId,
        attrType: props.attributeItem.attrType,
        attrWeight: props.attributeItem.attrWeight,
        attrFailureLimit: props.attributeItem.attrFailureLimit,
        attrRecordType: props.attributeItem.attrRecTypeForDC
            ? checkboxRecordType2Values
                  .filter((array) => props.attributeItem.attrRecordType.some((filter) => filter === array.name))
                  .map((a) => a.name)
            : checkboxRecordType1Values
                  .filter((array) => props.attributeItem.attrRecordType.some((filter) => filter === array.name))
                  .map((a) => a.name),
        itemType: props.attributeItem.itemType,
        attrRecTypeForDC: props.attributeItem.attrRecTypeForDC,
        itemMock: checkboxItemTypeValues
            .filter((array) => props.attributeItem.itemMock?.some((filter) => filter === array.name))
            .map((a) => a.name),
    }),
    validationSchema: (props: IUpdateFormProps) =>
        Yup.object({
            name: Yup.string().trim().required('Required'),
            description: Yup.string().trim().required('Required').max(250, 'Max number of characters allowed is 250'),
            attrType: Yup.string().trim().required('Required'),
            itemMock: Yup.array().min(1, 'Required').required('Required'),
            attrWeight:
                props.attributeItem.dataType === 'LevelGrade(5)'
                    ? Yup.string()
                          .typeError('You must specify a number')
                          .matches(/^(100|([0-9][0-9]?(\.[0-9]+)?))$/, 'Weighted% value must be in between 0 and 100')
                          .required('Required')
                    : Yup.string(),
            attrFailureLimit:
                props.attributeItem.dataType === 'LevelGrade(5)'
                    ? Yup.string()
                          .typeError('You must specify a number')
                          .matches(/^(5|([0-4]?(\.[0-9]+)?))$/, 'Failure Limit value must be in between 0 and 5')
                          .required('Required')
                    : Yup.string(),
        }),
    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(UpdateAttributeMaintenaceForm);

const mapStateToProps = (state: IReduxState) => ({
    dataTypeView: state.dataType.dataTypeData,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getDataTypeView: (data: number) => dispatch(getDataType(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateAttributeForm);
