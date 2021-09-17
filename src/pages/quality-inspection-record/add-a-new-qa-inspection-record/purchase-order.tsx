import React, { useEffect, useState } from 'react';
import { withFormik, Form, FormikProps } from 'formik';
import FormComponent from '../../../components/form-field/form-field';
import { Grid, Box, FormLabel, Checkbox, Button } from '@material-ui/core';
import { useStyles } from './styles';
import qualityInspectionTypes from '../../../constants/quality-inspection-record/quality-inspection-type';
import { IPurchaseOrder } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order';
import { ICorpItemCode } from '../../../interfaces/quality-inspection-record/qa-inspection-record/corp-item-code';
import TableComponent from '../../../components/table/table';
import { IDynamicCic } from '../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import PurchaseOrderHeader from './purchase-order-header';

interface IAddFormProps {
    purchaseOrder: IPurchaseOrder;
    inspectionType: string;
    renderDoneWithSelectionPage: (cic: IDynamicCic[], name: string) => void;
    handlePurchaseOrder: any;
    currentPage: string;
}

interface IAddFormValues {
    purchaseOrder: IPurchaseOrder;
    inspectionType: string;
}

const titles = [
    { value: 'corpItemCode', label: 'CIC' },
    { value: 'itemCode', label: 'Item Code' },
    { value: 'itemDesc', label: 'Item Description' },
    { value: 'packSize', label: 'Pack Size' },
];
interface ITitles {
    value: string;
    label: string;
}

const PurchaseOrder = (props: IAddFormProps & FormikProps<IAddFormValues>) => {
    const { handleChange, values, errors, purchaseOrder, renderDoneWithSelectionPage, currentPage } = props;
    const [corpItemCodeList, setCorpItemCodeList] = useState<ICorpItemCode[]>([]);
    const classes = useStyles();

    useEffect(() => {
        if (purchaseOrder?.cicList?.length > 0) {
            setCorpItemCodeList(purchaseOrder?.cicList);
        }
    }, [purchaseOrder]);

    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = event.target;
        setCorpItemCodeList((state) =>
            state.map((row, j) =>
                j === index ? { ...row, ['isSelected']: checked, ['entryValue']: checked ? '1' : '' } : row
            )
        );
    };

    const handleRadioChange = (event: React.ChangeEvent<any>) => {
        setCorpItemCodeList((state) => state.map((row) => ({ ...row, ['isSelected']: true, ['entryValue']: '' })));
        handleChange(event);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setCorpItemCodeList((state) =>
            state.map((row) => ({ ...row, ['isSelected']: checked, ['entryValue']: checked ? '1' : '' }))
        );
    };

    const addRows = (rows: ICorpItemCode[], titles: ITitles[]) => {
        return rows?.map((row, i) => [
            <Checkbox
                key={`checkbox-${row.id}`}
                value={row.id}
                checked={Boolean(row.isSelected)}
                onChange={(e) => handleCheckbox(e, i)}
                color="primary"
                className={classes.checkboxField}
                title="checkbox"
                disabled={values.inspectionType === '2'}
            />,
            ...titles.map((title, index) => (
                <div key={`${title.value}-${index}`} title={(row as any)[title.value]} className={classes.tableCell}>
                    {(row as any)[title.value]}
                </div>
            )),
        ]);
    };

    const getTitles = (titles: ITitles[]) => {
        const numSelected = corpItemCodeList.filter((row) => row.isSelected).length;
        const rowCount = corpItemCodeList.length;
        return [
            <Checkbox
                key="checkbox"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={(e) => handleSelectAllClick(e)}
                inputProps={{ 'aria-label': 'Select all' }}
                color="primary"
                disabled={values.inspectionType === '2'}
            />,
            ...titles.map((title) => <div key={title.value}>{title.label}</div>),
        ];
    };

    const onDoneWithSelectionClick = () => {
        if (values.inspectionType === '1' && corpItemCodeList?.some((row) => row.isSelected)) {
            renderDoneWithSelectionPage(
                corpItemCodeList.filter((item) => item.isSelected),
                'multipleInspection'
            );
        } else {
            renderDoneWithSelectionPage(corpItemCodeList, 'singleInspection');
        }
    };

    return (
        <Form className={classes.form}>
            <PurchaseOrderHeader purchaseOrder={purchaseOrder} currentPage={currentPage} />
            <Box m={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.topLabel}>
                        <FormLabel className={classes.labelField}>
                            Enter Type of Inspection and select Items to be Inspected
                        </FormLabel>
                    </Grid>
                    <Grid item xs={12} className={classes.radioButton}>
                        <FormComponent
                            label="Inspection Type"
                            required
                            value={values.inspectionType}
                            name="inspectionType"
                            component="radio"
                            id="inspectionType"
                            handleChange={(e) => handleRadioChange(e)}
                            radioOptions={qualityInspectionTypes}
                            errors={errors.inspectionType}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormLabel className={classes.labelField}>
                            Select one or more items to enter inspection values on
                        </FormLabel>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <TableComponent
                            rows={addRows(corpItemCodeList, titles)}
                            titles={getTitles(titles)}
                            hidePagination
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.buttonItem}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.buttonSubmit}
                        disabled={!corpItemCodeList?.some((row) => row.isSelected) && values.inspectionType !== '2'}
                        onClick={onDoneWithSelectionClick}
                    >
                        Done with Selection
                    </Button>
                </Grid>
            </Box>
        </Form>
    );
};

export default withFormik<any, IAddFormValues>({
    mapPropsToValues: (props: IAddFormProps) => ({
        purchaseOrder: props.purchaseOrder,
        inspectionType: '1',
    }),

    handleSubmit: (values, { props }) => {
        props.setModalStatus(false);
    },
})(PurchaseOrder);
