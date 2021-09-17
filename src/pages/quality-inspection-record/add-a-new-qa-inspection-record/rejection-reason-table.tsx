import React, { useEffect, useState } from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import { IRejectionReason } from '../../../interfaces/quality-inspection-record/qa-inspection-record/rejection-reason';
import { useStyles } from './styles';
import MultiSelectableEditableTable from '../../../components/multi-select-editable-table/multi-select-editable-table';
import { IDoneWithSelection } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import { IParameterValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/parameter-values';
import { IErrorDisplay } from '../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';

interface IRejectionReasonProps {
    doneWithSelection: IDoneWithSelection;
    updateRejectionReasons: (rejectionReasons: IRejectionReason[]) => void;
    rejRsnErrors: IErrorDisplay[];
    rejectionReasons?: IRejectionReason[];
    inspectionSaved?: string;
}
interface ITitles {
    prop: string;
    name: string;
    value: string;
    isRequired?: boolean;
    checkDuplicate?: boolean;
    componentType?: string;
    required?: boolean;
}
const titles: ITitles[] = [
    { prop: 'delete', name: 'Delete', value: 'delete', componentType: 'deleteIcon' },
    { prop: 'categoryList', name: 'Category', value: 'category', componentType: 'dropdown', required: true },
    { prop: 'defectList', name: 'Defect', value: 'defect', componentType: 'dropdown', required: true },
    { prop: 'avg', name: 'Avg %', value: 'avg', componentType: 'textField', required: true },
    { prop: 'low', name: 'Low %', value: 'low', componentType: 'textField', required: true },
    { prop: 'high', name: 'High %', value: 'high', componentType: 'textField', required: true },
    { prop: 'comments', name: 'Comments', value: 'comments', componentType: 'textArea' },
];
const RejectionReasonTable = (props: IRejectionReasonProps) => {
    const { doneWithSelection, updateRejectionReasons, rejRsnErrors, rejectionReasons, inspectionSaved } = props;
    const [rejectionReason, setRejectionReason] = useState<IRejectionReason[]>([]);
    const [errorFocus, setErrorFocus] = useState<IErrorDisplay>();
    const classes = useStyles();

    useEffect(() => {
        updateRejectionReasons(rejectionReason);
    }, [rejectionReason]);

    useEffect(() => {
        if (rejectionReasons?.length && inspectionSaved !== 'Success') {
            setRejectionReason(rejectionReasons);
        }
    }, [rejectionReasons, inspectionSaved]);

    const addRows = () => {
        const row: IRejectionReason = {
            category: '',
            defect: '',
            avg: '',
            low: '',
            high: '',
            comments: '',
            defectList: [],
            categoryList: [],
        };
        const rows = [...rejectionReason, { ...row }];
        setRejectionReason(rows);
        const categories: IParameterValues[] = doneWithSelection.defectCategories;
        setRejectionReason((state) => state.map((row) => ({ ...row, ['categoryList']: categories })));
    };

    const handleRemove = (i: number) => {
        const deleteData = [...rejectionReason.filter((row, j) => j !== i)];
        setRejectionReason(deleteData);
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        reRenderDefectList(index, name, value);
    };

    const handleRowSelectChange = (event: React.ChangeEvent<any>, name: string, index: number) => {
        const { value } = event.target;
        const { id } = event.currentTarget;
        if (name === 'categoryList') {
            const defects = doneWithSelection.defects.filter((data) => data.defectCatId === Number(id));
            setRejectionReason((state) =>
                state.map((row, j) => (j === index ? { ...row, ['defectList']: defects } : row))
            );
        }
        const property = name === 'categoryList' ? 'category' : 'defect';
        setRejectionReason((state) => state.map((row, j) => (j === index ? { ...row, [property]: value } : row)));
    };

    const reRenderDefectList = (index: number, name: string, value: string) => {
        setRejectionReason((state) => state.map((row, j) => (j === index ? { ...row, [name]: value } : row)));
    };

    const setFocus = (input: any, index: number, column: string) => {
        index === errorFocus?.rowIndex && column === errorFocus.columnName && input?.focus();
    };

    const clearFocus = () => {
        if (errorFocus && errorFocus?.rowIndex > -1) {
            setErrorFocus({ columnName: '', errorMsg: '', rowIndex: -1 });
        }
    };

    return (
        <Grid item xs={12}>
            <Button onClick={addRows} className={classes.buttonSubmit} color="primary" variant="contained">
                Add Rejection Reasons
            </Button>
            {rejRsnErrors?.length
                ? rejRsnErrors.map((error) => (
                      <h4 key={`h4-key-${error.rowIndex}`}>
                          <Link
                              className={classes.errorLink}
                              key={`link-key-${error.rowIndex}`}
                              onClick={() => setErrorFocus(error)}
                          >
                              {error.errorMsg}
                          </Link>
                      </h4>
                  ))
                : null}
            {rejectionReason.length > 0 && (
                <MultiSelectableEditableTable
                    handleTextChange={handleRowInputChange}
                    handleSelectChange={handleRowSelectChange}
                    handleRemove={handleRemove}
                    data={rejectionReason}
                    header={titles}
                    setFocus={setFocus}
                    onBlur={clearFocus}
                />
            )}
        </Grid>
    );
};

export default RejectionReasonTable;
