import React, { useEffect, useState } from 'react';
import PurchaseOrderHeader from '../purchase-order-header';
import DoneWithSelection from './multiple-inspection-table';
import {
    IDynamicCic,
    IErrorDisplay,
} from '../../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import { IPurchaseOrder } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order';
import { Button, Grid, Link } from '@material-ui/core';
import { useStyles } from './styles';
import { IDoneWithSelection } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IMultiInspectionContinueProps {
    cicList: IDynamicCic[];
    purchaseOrder: IPurchaseOrder;
    handleReturnSelectionClick: () => void;
    renderContinuePage: (dynamicCicRows: IDynamicCic[]) => void;
    doneWithSelection: IDoneWithSelection;
    currentPage: string;
    handleTruckCarrierChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    truckCarrier: string;
}

interface ITitles {
    value: string;
    label: string;
    fixed?: boolean;
    dataTypeName?: string;
    attributeValues?: string[];
    wordWrap?: boolean;
    applyColor?: boolean;
    required?: boolean;
    attributeId?: number;
    type?: string;
}
const MultiInspectionContinue = (props: IMultiInspectionContinueProps) => {
    const {
        cicList,
        purchaseOrder,
        handleReturnSelectionClick,
        doneWithSelection,
        currentPage,
        renderContinuePage,
        handleTruckCarrierChange,
        truckCarrier,
    } = props;
    const [dynamicCicRows, setDynamicCicRows] = useState<IDynamicCic[]>([]);
    const [errorDisp, setErrorDisp] = useState<IErrorDisplay[]>([]);
    const [recordDate, setRecordDate] = useState<MaterialUiPickersDate | null>();
    const [disableUpdate, setDisableUpdate] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [dynamicColumns, setDynamicColumns] = useState<ITitles[]>([]);
    const [enableError, setEnableError] = useState(false);
    const [errorFocus, setErrorFocus] = useState<IErrorDisplay>();
    const classes = useStyles();

    useEffect(() => {
        if (cicList?.length > 0) {
            setDynamicCicRows(cicList);
        }
    }, [cicList]);
    const staticColumns = [
        { value: 'corpItemCode', label: 'CIC', fixed: true, applyColor: true },
        { value: 'itemDesc', label: 'Description', fixed: true, wordWrap: true, applyColor: true },
        { value: 'packSize', label: 'Pack Size', fixed: true },
        { value: 'results', label: 'Results', fixed: true, dataTypeName: 'Radio', required: true },
        { value: 'qtyOrderd', label: 'Quantity Ordered' },
        { value: 'shippedQty', label: 'Quantity Shipped from Vendor', dataTypeName: 'StaticText', required: true },
        { value: 'passedQty', label: 'Quantity Passed', dataTypeName: 'StaticText' },
        { value: 'label', label: 'Label/Farm', dataTypeName: 'StaticText', required: true, type: 'string' },
    ];

    const staticColumnsExtended = [
        { value: 'pictures', label: 'Pictures', dataTypeName: 'CameraIcon' },
        { value: 'nonRej', label: 'Non Rejectable Reasons', dataTypeName: 'MultiSelect' },
    ];

    useEffect(() => {
        const tempDynamicColumns: ITitles[] = [];
        doneWithSelection?.dynamicAttributes?.forEach((column) => {
            tempDynamicColumns.push({
                value: column?.id?.toString(),
                label: column.name,
                dataTypeName: column.dataTypeName,
                attributeValues: column.values,
                attributeId: column.id,
                required: column.required,
            });
        });
        setDynamicColumns(tempDynamicColumns);
    }, [doneWithSelection]);

    useEffect(() => {
        if (
            dynamicCicRows?.some(
                (rows) =>
                    rows?.Value6?.value !== '' ||
                    rows?.Value7?.value !== '' ||
                    rows?.Value8?.value !== '' ||
                    rows?.Value9?.value !== '' ||
                    rows?.Value10?.value !== ''
            ) &&
            dynamicCicRows?.some(
                (rows) =>
                    rows?.Value6?.value !== undefined ||
                    rows?.Value7?.value !== undefined ||
                    rows?.Value8?.value !== undefined ||
                    rows?.Value9?.value !== undefined ||
                    rows?.Value10?.value !== undefined
            )
        ) {
            let count = 0;
            const colorValue = checkIsNaN(dynamicCicRows[currentIndex]?.Value6?.value);
            if (colorValue !== 0) {
                count = count + 1;
            }
            const appValue = checkIsNaN(dynamicCicRows[currentIndex]?.Value7?.value);
            if (appValue !== 0) {
                count = count + 1;
            }
            const condValue = checkIsNaN(dynamicCicRows[currentIndex]?.Value8?.value);
            if (condValue !== 0) {
                count = count + 1;
            }
            const wtValue = checkIsNaN(dynamicCicRows[currentIndex]?.Value9?.value);
            if (wtValue !== 0) {
                count = count + 1;
            }
            const qualValue = checkIsNaN(dynamicCicRows[currentIndex]?.Value10?.value);
            if (qualValue !== 0) {
                count = count + 1;
            }
            const overAllGradeValue = (appValue + colorValue + condValue + qualValue + wtValue) / count;
            setDynamicCicRows((state) =>
                state.map((row, j) =>
                    j === currentIndex ? { ...row, ['Value11']: { value: overAllGradeValue.toString(), id: 11 } } : row
                )
            );
        }
    }, [
        Number(dynamicCicRows[currentIndex]?.Value6?.value), //Color
        Number(dynamicCicRows[currentIndex]?.Value7?.value), //App
        Number(dynamicCicRows[currentIndex]?.Value8?.value), //Cond
        Number(dynamicCicRows[currentIndex]?.Value9?.value), //Wt
        Number(dynamicCicRows[currentIndex]?.Value10?.value), //Qual
    ]);

    const checkIsNaN = (value: string): number => {
        return isNaN(Number(value)) ? 0 : Number(value);
    };

    const columns: ITitles[] = [...staticColumns, ...dynamicColumns, ...staticColumnsExtended];

    useEffect(() => {
        const requiredColumns = columns.filter((column) => column.required);
        let filledColumnCount = 0;
        if (requiredColumns.length > 0) {
            filledColumnCount = requiredColumns
                ?.map((column) => {
                    return dynamicCicRows?.some((row) => {
                        return (
                            column.required &&
                            (row[`${column.value}Value`] === '' || row[`${column.value}Value`] === undefined) &&
                            (row[`Value${column.value}`]?.value === '' || row[`Value${column.value}`] === undefined)
                        );
                    });
                })
                .filter((x) => !x).length;
        }
        const truckCarrierField = truckCarrier === undefined || truckCarrier.trim() === '';
        const table = requiredColumns.length !== 0 ? !(requiredColumns.length === filledColumnCount) : true;
        const disable = table || truckCarrierField;
        setDisableUpdate(disable);
    }, [dynamicCicRows, truckCarrier]);

    const handleRecordDateChange = (date: MaterialUiPickersDate) => {
        setRecordDate(date);
    };
    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
        column: string,
        attributeId?: number,
        label?: string
    ) => {
        const { value, id } = event.target;
        if (attributeId === 2 && Number(value) > 99.99999) {
            event.preventDefault();
            return;
        }
        if (attributeId !== undefined) {
            setDynamicCicRows((state) =>
                state.map((row, j) =>
                    j === index
                        ? {
                              ...row,
                              [`Value${column}`]: {
                                  value,
                                  id: Number(id),
                                  attrName: label,
                              },
                          }
                        : row
                )
            );
        } else {
            setDynamicCicRows((state) =>
                state.map((row, j) =>
                    j === index
                        ? {
                              ...row,
                              [`${column}Value`]: value,
                              ['passedQtyValue']:
                                  column === 'shippedQty' && row?.resultsValue === 'Pass'
                                      ? value
                                      : column === 'passedQty' && row?.resultsValue === 'Pass/Fail'
                                      ? value
                                      : row.passedQtyValue,
                              ['rejectedQtyValue']:
                                  column === 'shippedQty' && row?.resultsValue === 'Fail'
                                      ? value
                                      : column === 'shippedQty' && row?.resultsValue === 'Pass/Fail'
                                      ? ''
                                      : row.rejectedQtyValue,
                          }
                        : row
                )
            );
        }
    };

    const handleRadioChange = (index: number, column: string, id: string, name: string) => {
        const className = id === '1' ? classes.passColor : classes.failColor;

        setDynamicCicRows((state) =>
            state.map((row, j) =>
                j === index
                    ? {
                          ...row,
                          [`${column}Value`]: name,
                          [`${column}Id`]: id,
                          ['color']: className,
                          ['passedQtyValue']:
                              id === '2'
                                  ? '0'
                                  : id === '1' && row?.shippedQtyValue !== ''
                                  ? row?.shippedQtyValue || ''
                                  : '',
                          ['rejectedQtyValue']:
                              id === '2' ? row?.shippedQtyValue : id === '3' ? '' : row.rejectedQtyValue,
                      }
                    : row
            )
        );
    };

    const handleSelectionChange = (
        event: React.ChangeEvent<any>,
        index: number,
        column: string,
        attributeId?: number,
        label?: string
    ) => {
        const { value } = event.target;
        const { id } = event.currentTarget;
        setCurrentIndex(index);
        if (attributeId !== undefined) {
            setDynamicCicRows((state) =>
                state.map((row, j) =>
                    j === index ? { ...row, [`Value${column}`]: { value, id: Number(id), attrName: label } } : row
                )
            );
        } else {
            setDynamicCicRows((state) =>
                state.map((row, j) => (j === index ? { ...row, [`${column}Value`]: value } : row))
            );
        }
    };

    const onUploadImagesClick = (values: File[], index: number) => {
        setDynamicCicRows((state) => state.map((row, j) => (j === index ? { ...row, ['picList']: values } : row)));
    };

    const onContinueClick = async () => {
        let setError = false;
        await setErrorDisp([]);
        await dynamicCicRows.map(function (row, index) {
            const num = index + 1;
            if (Number(row.shippedQtyValue) > Number(row.qtyOrderd)) {
                const error = {
                    rowIndex: index,
                    columnName: 'shippedQty',
                    errorMsg: 'Quantity Shipped should be less than or equal to Quantity Ordered at row ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            if (Number(row.passedQtyValue) > Number(row.shippedQtyValue)) {
                const error = {
                    rowIndex: index,
                    columnName: 'passedQty',
                    errorMsg: 'Quantity Passed should be less than Quantity Shipped at row ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            if (row.passedQtyValue === '') {
                const error = {
                    rowIndex: index,
                    columnName: 'passedQty',
                    errorMsg: 'Quantity Passed should not be empty at row  ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            if (Number(row.shippedQtyValue) === 0) {
                const error = {
                    rowIndex: index,
                    columnName: 'shippedQty',
                    errorMsg: 'Quantity Shipped should not be 0 or empty at row ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            if (
                row.resultsValue === 'Pass/Fail' &&
                row.passedQtyValue !== '' &&
                Number(row.passedQtyValue) === Number(row.shippedQtyValue)
            ) {
                const error = {
                    rowIndex: index,
                    columnName: 'passedQty',
                    errorMsg: 'Quantity Passed should be less than Quantity Shipped at row ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
        });
        if (!setError) {
            renderContinuePage(dynamicCicRows);
        }
        setEnableError(setError);
    };
    return (
        <div>
            {disableUpdate ? (
                <h4 className={classes.required}> * An entry is required for all mandatory fields</h4>
            ) : (
                <></>
            )}
            <Grid container className={classes.boxStyle}>
                <Grid item xs={12}>
                    <Button
                        onClick={handleReturnSelectionClick}
                        className={classes.button}
                        color="primary"
                        variant="outlined"
                    >
                        Return to Selection Form
                    </Button>
                    <PurchaseOrderHeader
                        purchaseOrder={purchaseOrder}
                        currentPage={currentPage}
                        handleDateChange={handleRecordDateChange}
                        handleTruckCarrierChange={handleTruckCarrierChange}
                        recordDate={recordDate}
                        truckCarrier={truckCarrier}
                    />
                    {errorDisp.length !== 0 ? (
                        errorDisp.map((error) => (
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
                    ) : (
                        <></>
                    )}
                    <DoneWithSelection
                        doneWithSelection={doneWithSelection}
                        handleInputChange={handleInputChange}
                        handleSelectionChange={handleSelectionChange}
                        handleRadioChange={handleRadioChange}
                        onUploadImagesClick={onUploadImagesClick}
                        dynamicCicRows={dynamicCicRows}
                        columns={columns}
                        errorDisplay={enableError}
                        setErrorFocus={setErrorFocus}
                        errorFocus={errorFocus}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.buttonSubmit}
                        onClick={onContinueClick}
                        disabled={disableUpdate}
                    >
                        Continue
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleReturnSelectionClick}
                        className={classes.buttonSubmit}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default MultiInspectionContinue;
