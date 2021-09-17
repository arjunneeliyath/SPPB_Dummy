import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../../components/table/table';
import {
    IDynamicCic,
    IErrorDisplay,
} from '../../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
interface IDoneWithSelectionProps {
    cicUpdatedRows: IDynamicCic[];
    errorDisplay: boolean;
    handleCicTextFieldChange: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
        column: string
    ) => void;
    setErrorFocus: (data: IErrorDisplay) => void;
    errorFocus?: IErrorDisplay;
}

interface ITitles {
    value: string;
    label: string;
    dataTypeName?: string;
    width?: string;
    required?: boolean;
}

const CicTable = (props: IDoneWithSelectionProps) => {
    const { handleCicTextFieldChange, cicUpdatedRows, errorDisplay, errorFocus, setErrorFocus } = props;

    const classes = useStyles();
    const staticColumns = [
        { value: 'corpItemCode', label: 'CIC' },
        { value: 'itemDesc', label: 'Description' },
        { value: 'packSize', label: 'Pack Size' },
        { value: 'qtyOrderd', label: 'Qty Ordered' },
        { value: 'shippedQty', label: 'Qty Shipped from Vendor', dataTypeName: 'Text', required: true },
        { value: 'rejectedQty', label: 'Qty Rejected', dataTypeName: 'Text', required: true },
        { value: 'label', label: 'Label/Farm', dataTypeName: 'Text', required: true },
    ];

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const irrationalValues = ['e', '+', '-', '.'];
        const { key } = event;
        if (irrationalValues.includes(key)) {
            event.preventDefault();
        }
    };

    const setFocus = (input: any, index: number, column: ITitles) => {
        index === errorFocus?.rowIndex && column.value === errorFocus.columnName && input?.focus();
    };

    const clearFocus = () => {
        if (errorFocus && errorFocus?.rowIndex > -1) {
            setErrorFocus({ columnName: '', errorMsg: '', rowIndex: -1 });
        }
    };

    const columns: ITitles[] = [...staticColumns];

    const addRows = (rows: IDynamicCic[], titles: ITitles[]) => {
        rows?.map((row, index) => {
            columns?.map((column) => {
                const error = errorDisplay
                    ? (column.value === 'shippedQty' && Number(row[`${column.value}Value`]) > row.qtyOrderd) ||
                      (column.value === 'shippedQty' && Number(row[`${column.value}Value`]) === 0)
                    : false;

                if (column.dataTypeName === 'Text')
                    row[column.value] = (
                        <TextField
                            autoFocus={index === 0 && column.value === 'shippedQty'}
                            inputRef={(input) => setFocus(input, index, column)}
                            key={`entry-${column.value}-${index}`}
                            name={'entry'}
                            onChange={(event) => handleCicTextFieldChange(event, index, column.value)}
                            value={row[`${column.value}Value`]}
                            variant="outlined"
                            size="small"
                            required
                            className={classes.nameTextField}
                            title="Please enter a value"
                            id={`${column.value}-${index}`}
                            type={column.value === 'label' ? 'string' : 'number'}
                            onKeyDown={onKeyDown}
                            inputProps={{ min: 0, step: 1 }}
                            disabled={column.value === 'rejectedQty'}
                            error={
                                row[`${column.value}Value`]?.trim() === '' ||
                                row[`${column.value}Value`] === undefined ||
                                error
                            }
                            onBlur={clearFocus}
                        />
                    );
            });
        });
        return rows?.map((row) => [
            ...titles.map((title, index) => {
                return (
                    <div
                        key={`${title.value}-${index}`}
                        title={(row as any)[title.value]}
                        className={classes.tableCell}
                    >
                        {(row as any)[title.value]}
                    </div>
                );
            }),
        ]);
    };

    const getTitles = (titles: ITitles[]) => [
        ...titles.map((title, i) => (
            <div key={`key-${i}`} style={{ minWidth: title.width }}>
                {title.label}
                {title.required ? <span className={classes.astrisk}> *</span> : null}
            </div>
        )),
    ];

    return (
        <div>
            <Grid container>
                <TableComponent rows={addRows(cicUpdatedRows, columns)} titles={getTitles(columns)} hidePagination />
            </Grid>
        </div>
    );
};

export default CicTable;
