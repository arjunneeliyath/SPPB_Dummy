import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Link } from '@material-ui/core';
import { useStyles } from './styles';
import PurchaseOrderHeader from '../purchase-order-header';
import ResultTable from './multi-inspection-result-table';
import { IErrorDisplay } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import EmailCClistForm, { IUpdateRecordsValues } from '../email-cclist-form';
import { IRejectionReason } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/rejection-reason';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IParameterValues } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/parameter-values';
import TableComponent from '../../../../components/table/table';
import _ from 'lodash';
import moment from 'moment';
import serialize from '../../../../utils/formdata-serialize';
import { IEditPurchaseOrder } from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-purchase-order';
import { IEditFormFields } from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';
import { IEditDynamicCic } from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-dynamic-cic';
import {
    IEditInspRecord,
    IEditQaMultiUpdateRequest,
    IRejReason,
    IDynamicValues,
} from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-a-new-qa-multi-inspection';

interface IMultiInspectionUpdateRecordsProps {
    purchaseOrder: IEditPurchaseOrder;
    doneWithSelection: IEditFormFields;
    currentPage: string;
    handleReturnSelectionClick: () => void;
    dynamicCic: IEditDynamicCic[];
    renderMultipleInspectionPage: (dynamicCic: IEditDynamicCic[]) => void;
    handleTruckCarrierChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    truckCarrier: string;
    saveQaInspectionRecord: (data: FormData) => void;
    setIsLoading: (data: boolean) => void;
    resetMultiData: (data: IEditDynamicCic[]) => void;
    inspectionSaved: string;
    recordId: number;
}

const titles = [
    { value: 'resultsValue', label: 'Result' },
    { value: 'corpItemCode', label: 'CIC' },
    { value: 'itemDesc', label: 'Description' },
    { value: 'packSize', label: 'Pack SIze' },
    { value: 'labelValue', label: 'Label/Farm' },
];

interface ITitlesTables {
    value: string;
    label: string;
}

interface ITitles {
    value: string;
    label: string;
    fixed?: boolean;
    dataTypeName?: string;
    attributeValues?: string[];
    wordWrap?: boolean;
    required?: boolean;
    attributeId?: number;
    type?: string;
    color?: boolean;
}

const MultiInspectionUpdateRecords = (props: IMultiInspectionUpdateRecordsProps) => {
    const {
        purchaseOrder,
        currentPage,
        doneWithSelection,
        dynamicCic,
        renderMultipleInspectionPage,
        handleReturnSelectionClick,
        handleTruckCarrierChange,
        truckCarrier,
        saveQaInspectionRecord,
        setIsLoading,
        resetMultiData,
        inspectionSaved,
        recordId,
    } = props;
    const [recordDate, setRecordDate] = useState<MaterialUiPickersDate | null>();
    const [ccList, setCcList] = useState<IParameterValues[]>([]);
    const [emailGroups, setEmailGroups] = useState<IParameterValues[]>([]);
    const [userValues, setUserValues] = useState<IUpdateRecordsValues>({ ccListDescription: '', comments: '' });
    const [dynamicCicRows, setDynamicCicRows] = useState<IEditDynamicCic[]>([]);
    const [disableUpdate, setDisableUpdate] = useState(false);
    const [errorDisp, setErrorDisp] = useState<IErrorDisplay[]>([]);
    const [enableError, setEnableError] = useState(false);
    const [enableEmailError, setEnableEmailError] = useState(false);
    const [errorFocus, setErrorFocus] = useState<IErrorDisplay>();
    const [rejRsnErrors, setRejRsnErrors] = useState<IErrorDisplay[]>([]);

    const classes = useStyles();

    const staticColumns = [
        {
            value: 'resultsValue',
            label: 'Result',
            fixed: true,
        },
        {
            value: 'corpItemCode',
            label: 'CIC',
            fixed: true,
            dataTypeName: 'Label',
            color: true,
        },
        { value: 'itemDesc', label: 'Description', dataTypeName: 'Label', color: true },
        { value: 'packSize', label: 'Pack Size' },
        { value: 'labelValue', label: 'Label/Farm' },
        {
            value: 'currentLocation',
            label: 'Current Location',
            dataTypeName: 'SelectDropDownCurrentLocation',
            required: true,
        },
        { value: 'startTime', label: 'Start Time', dataTypeName: 'TimePicker', required: true },
        { value: 'timeZone', label: 'Time Zone', dataTypeName: 'SelectTimeZone', required: true },
        { value: 'recReading', label: 'Rec Reading', dataTypeName: 'Text' },
        { value: 'rec', label: 'Rec #', dataTypeName: 'Text' },
        { value: 'recBrand', label: 'Rec Brand', dataTypeName: 'SelectRecBrand' },
        { value: 'recFile', label: 'Rec File', dataTypeName: 'InsertFile' },
        { value: 'pulpTemp', label: 'Pulp Temp', dataTypeName: 'Text', required: true, type: 'string' },
        {
            value: 'basicRejReason',
            label: 'Basic Reason for Rejection',
            dataTypeName: 'SelectDropDownRejectionReason',
            required: true,
        },
        { value: 'qtyOrderd', label: 'Qty Ord' },
        { value: 'shippedQty', label: 'Qty Shipped from Vendor', dataTypeName: 'Text' },
        { value: 'rejectedQty', label: 'Qty Rejected', dataTypeName: 'Text' },
        { value: 'passedQty', label: 'Qty Passed', dataTypeName: 'Text' },
        { value: 'qtySamp', label: 'Qty Samp', dataTypeName: 'Text', type: 'string' },
        { value: 'sampSize', label: 'Samp Size', dataTypeName: 'Text', type: 'string' },
    ];

    useEffect(() => {
        if (inspectionSaved !== 'Success' && dynamicCic?.length) {
            setDynamicCicRows(dynamicCic);
        }
    }, [inspectionSaved, dynamicCic]);

    useEffect(() => {
        setDynamicCicRows(dynamicCic.map((row, j) => ({ ...row, ['rowIndex']: j })));
    }, [dynamicCic]);
    useEffect(() => {
        setRecordDate(moment(purchaseOrder?.recordDate, 'MM/DD/YYYY 00:00').toDate());
    }, [purchaseOrder]);
    useEffect(() => {
        if (errorDisp?.length && document?.body && document?.documentElement) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }, [errorDisp]);

    const dynamicCicFailData = dynamicCicRows.filter(
        (data) => !(data.resultsValue === 'Pass' && data.resultsChangeValue === 'Pass')
    );
    const dynamicCicPassData = dynamicCicRows.filter(
        (data) => data.resultsValue === 'Pass' && data.resultsChangeValue === 'Pass'
    );

    const getTitles = (titles: ITitlesTables[]) => [
        ...titles.map((title) => <div key={title.value}>{title.label}</div>),
    ];

    const addTableRows = (rows: IEditDynamicCic[], titles: ITitlesTables[]) => {
        return rows?.map((row: any) => [
            ...titles.map((title, index) => (
                <div
                    key={`${title.value}-${index}`}
                    title={(row as any)[title.value]}
                    className={
                        title.value === 'corpItemCode' || title.value === 'itemDesc'
                            ? classes.passColor
                            : classes.tableCell
                    }
                >
                    {(row as any)[title.value]}
                </div>
            )),
        ]);
    };

    const onReturnClick = () => {
        renderMultipleInspectionPage(dynamicCic);
    };

    const updateRejectionReasons = (rejectionReasons: IRejectionReason[], index?: number) => {
        setDynamicCicRows((state) =>
            state.map((row, j) => (j === index ? { ...row, ['rejectionReasons']: rejectionReasons } : row))
        );
    };

    const handleRecordDateChange = (date: MaterialUiPickersDate) => {
        setRecordDate(date);
    };

    /////////////////////////////** User Email form **/////////////////////////////
    useEffect(() => {
        const ccTempList: IParameterValues[] = [];
        doneWithSelection.formFields.ccList.forEach((item) => {
            ccTempList.push({ name: item });
        });
        for (let i = 0; i < ccTempList.length; i++) {
            for (let j = 0; j < doneWithSelection.inspData.selectedCCList.length; j++) {
                ccTempList[i].name === doneWithSelection.inspData.selectedCCList[j]
                    ? (ccTempList[i].isSelected = true)
                    : null;
            }
        }
        setCcList(ccTempList);
    }, [doneWithSelection.formFields.ccList]);

    useEffect(() => {
        for (let i = 0; i < doneWithSelection.formFields.emailGroups.length; i++) {
            for (let j = 0; j < doneWithSelection.inspData.emailGroups.length; j++) {
                doneWithSelection.formFields.emailGroups[i].id === doneWithSelection.inspData.emailGroups[j].id
                    ? (doneWithSelection.formFields.emailGroups[i].isSelected = true)
                    : null;
            }
        }
        setEmailGroups(doneWithSelection.formFields.emailGroups);
    }, [doneWithSelection.formFields.emailGroups]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        const selectAll = emailGroups.map((row) => ({
            ...row,
            ['isSelected']: checked,
        }));
        setEmailGroups([...selectAll]);
    };

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = event.target;
        setEmailGroups((state) => state.map((row, j) => (j === index ? { ...row, ['isSelected']: checked } : row)));
    };

    const handleCcListSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        const selectAll = ccList.map((row) => ({
            ...row,
            ['isSelected']: checked,
        }));
        setCcList([...selectAll]);
    };

    const handleCcListCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = event.target;
        setCcList((state) => state.map((row, j) => (j === index ? { ...row, ['isSelected']: checked } : row)));
    };

    const onValuesChange = (values: IUpdateRecordsValues) => {
        setUserValues(values);
    };

    /////////////////////////////** End of User Email form **/////////////////////////////

    ////////////////////////////******* Result Table ******///////////////////////////////

    const handleSelectionChange = (
        event: React.ChangeEvent<any>,
        column: string,
        index?: number,
        attributeId?: number
    ) => {
        const { value } = event.target;
        const { id } = event.currentTarget;
        if (attributeId !== undefined) {
            setDynamicCicRows((state) =>
                state.map((row, j) => (j === index ? { ...row, [`Value${column}`]: { value, id: Number(id) } } : row))
            );
        } else {
            setDynamicCicRows((state) =>
                state.map((row, j) => (j === index ? { ...row, [`${column}Value`]: value } : row))
            );
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        column: string,
        index?: number,
        attributeId?: number
    ) => {
        const { value } = event.target;
        if (attributeId === 2 && Number(value) > 99.99999) {
            event.preventDefault();
            return;
        }
        setDynamicCicRows((state) =>
            state.map((row, j) =>
                j === index
                    ? {
                          ...row,
                          [`${column}Value`]: value,
                      }
                    : row
            )
        );
    };

    const handleDateChange = (date: MaterialUiPickersDate, index?: number) => {
        setDynamicCicRows((state) => state.map((row, j) => (j === index ? { ...row, ['startTimeValue']: date } : row)));
    };

    const onUploadFileClick = (addedFiles: File[], deletedFiles: string[], index?: number) => {
        setDynamicCicRows((state) =>
            state.map((row, j) =>
                j === index ? { ...row, ['addedFiles']: addedFiles, ['delRecFileNames']: deletedFiles } : row
            )
        );
    };
    const columns: ITitles[] = [...staticColumns];

    useEffect(() => {
        const requiredColumns = columns.filter((column) => column.required);
        let filledColumnCount = 0;
        let filled = [];
        if (requiredColumns.length > 0) {
            filled = requiredColumns?.map((column) => {
                return dynamicCicRows?.some((row) => {
                    return (
                        column.required &&
                        column.value !== 'startTime' &&
                        row.resultsValue !== 'Pass' &&
                        (row[`${column.value}Value`] === '' || row[`${column.value}Value`] === undefined) &&
                        (row[`Value${column.value}`]?.value === '' || row[`Value${column.value}`] === undefined)
                    );
                });
            });
            filledColumnCount = filled.filter((x) => !x).length;
        }
        const resultColumns = requiredColumns.length !== 0 ? !(requiredColumns.length === filledColumnCount) : true;
        const truckCarrierField = truckCarrier === undefined || truckCarrier.trim() === '';
        const rejectionReasonField = dynamicCicRows?.some((row) => {
            return row?.rejectionReasons?.some(
                (rej) => rej.category === '' || rej.defect === '' || rej.avg === '' || rej.low === '' || rej.high === ''
            );
        });

        const disable = resultColumns || truckCarrierField || rejectionReasonField;
        setDisableUpdate(disable);
    }, [dynamicCicRows, truckCarrier]);

    /////////////////////////////**  Result Table **/////////////////////////////////////
    const onUpdateRecordClick = () => {
        let setError = false;
        let setEmailError = false;
        setErrorDisp([]);
        setRejRsnErrors([]);
        _.sortBy(dynamicCicRows, ['resultsValue', 'Pass'], ['resultsValue', 'Fail']).map((row, index) => {
            const rowCount = index + 1;
            if (
                row.resultsId === '3' &&
                Number(row.rejectedQtyValue) + Number(row.passedQtyValue) !== Number(row.shippedQtyValue)
            ) {
                const error = {
                    rowIndex: row.rowIndex || 0,
                    columnName: 'rejectedQty',
                    errorMsg:
                        'Sum of Quantity Rejected and Quantity Passed should be equal to Quantity Shipped at row ' +
                        rowCount,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            if (row.resultsId === '3' && (row.rejectedQtyValue === '' || Number(row.rejectedQtyValue) === 0)) {
                const error = {
                    rowIndex: row.rowIndex || 0,
                    columnName: 'rejectedQty',
                    errorMsg: 'Quantity Rejected should not be 0 or empty at row ' + rowCount,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            row?.rejectionReasons?.map((rej, i) => {
                const count = i + 1;
                if (Number(rej.low) > Number(rej.avg)) {
                    const error = {
                        itemIndex: index,
                        rowIndex: i,
                        columnName: 'low',
                        errorMsg: 'Low% must not be greater than Avg% at row ' + count,
                    };
                    setError = true;
                    setRejRsnErrors((prev) => [...prev, error]);
                } else if (Number(rej.low) > Number(rej.high)) {
                    const error = {
                        itemIndex: index,
                        rowIndex: i,
                        columnName: 'low',
                        errorMsg: 'Low% must not be greater than High% at row ' + count,
                    };
                    setError = true;
                    setRejRsnErrors((prev) => [...prev, error]);
                } else if (Number(rej.avg) > Number(rej.high)) {
                    const error = {
                        itemIndex: index,
                        rowIndex: i,
                        columnName: 'avg',
                        errorMsg: 'Avg% must not be greater than High% at row ' + count,
                    };
                    setError = true;
                    setRejRsnErrors((prev) => [...prev, error]);
                }
            });
        });
        const emailIsValid =
            userValues?.ccListDescription?.trim()?.split(',')[0] === ''
                ? []
                : userValues?.ccListDescription
                      ?.trim()
                      ?.split(',')
                      ?.every(function (email) {
                          let domain = '';
                          domain =
                              email.indexOf('@') !== -1
                                  ? email.substring(email.indexOf('@') + 1, email.length).trim()
                                  : '';
                          return domain.includes('safeway.com');
                      });
        if (!emailIsValid) {
            setEmailError = true;
            setErrorDisp((prevErrors) => [
                ...prevErrors,
                {
                    rowIndex: -2,
                    columnName: 'safewayEmailCheck',
                    errorMsg: 'Email entered is not in safeway format',
                },
            ]);
        }
        if (!setError && !setEmailError) {
            const emailGroupList: number[] = [];
            const ccMailList: string[] = [];
            const sharedInspectionRecords: IEditInspRecord[] = [];
            dynamicCicRows.forEach((item) => {
                const dynamicAttr = Object.entries(item);
                const dynamicAttrValues: IDynamicValues[] = [];
                for (const key in dynamicAttr) {
                    const attribute: IDynamicValues = dynamicAttr[key][1];
                    if (dynamicAttr[key][0]?.startsWith('Value') === true) {
                        if (attribute?.id === 2 || attribute?.id === 12) {
                            attribute.value = Number(attribute.value).toFixed(1);
                        }
                        if (attribute?.id?.toString() !== '') {
                            dynamicAttrValues.push(attribute);
                        }
                    }
                }
                const nonRejIds: number[] = [];
                doneWithSelection.formFields.nonRejReasons.forEach((nonRej) =>
                    item.nonRejValue?.forEach((val) => {
                        if (nonRej.name === val) {
                            nonRejIds.push(Number(nonRej.id));
                        }
                    })
                );
                const time = item?.startTimeValue?.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                });
                const hour = item?.startTimeValue?.getHours() ? item?.startTimeValue?.getHours() % 12 : 0;
                const rejTimeAMPM = time?.match(/[a-zA-Z]+/g)?.[0];
                const inspResult = item.resultsId === '1' ? 'PASS' : item.resultsId === '2' ? 'FAIL' : 'PASS_FAIL';
                const rejectionRns: IRejReason[] = [];
                item.rejectionReasons?.forEach((rej) => {
                    rejectionRns.push({
                        comments: rej.comments,
                        defectCatId: Number(rej.category),
                        defectId: Number(rej.defect),
                        levelAvg: Number(rej.avg).toFixed(2),
                        levelHigh: Number(rej.high).toFixed(2),
                        levelLow: Number(rej.low).toFixed(2),
                    });
                });
                sharedInspectionRecords.push({
                    id: recordId,
                    cic: item.corpItemCode,
                    dynamicAttributes: dynamicAttrValues,
                    whseWeight: item.whseWeight,
                    labelFarm: item.labelValue,
                    locationId: item.currentLocationValue,
                    pictures: item.addedImages,
                    delRecImgNames: item.delRecImgNames,
                    pulpTemp: item.pulpTempValue,
                    qtyOrdered: item.qtyOrderd,
                    qtyRej: Number(item.rejectedQtyValue) || 0,
                    qtyPassed: Number(item.passedQtyValue) || 0,
                    qtyShipped: Number(item.shippedQtyValue) || 0,
                    recorderBrand: item.recBrandValue,
                    recorderFiles: item.addedFiles,
                    delRecFileNames: item.delRecFileNames,
                    recorderNo: item.recValue,
                    recorderReading: item.recReadingValue,
                    nonRejReasonIds: nonRejIds,
                    rejReasons: rejectionRns,
                    rejTimeAMPM: rejTimeAMPM,
                    rejTimeHH: hour || 12,
                    rejTimeMM: item?.startTimeValue?.getMinutes(),
                    rejTimeZoneCd: item?.timeZoneValue,
                    rejReasonId: Number(item.basicRejReasonValue) || 0,
                    inspResult: inspResult,
                });
            });

            emailGroups.forEach((email) => {
                if (email.isSelected && email?.id) {
                    emailGroupList.push(email.id);
                }
            });
            ccList.forEach((cc) => {
                if (cc.isSelected && cc?.name) {
                    ccMailList.push(cc.name);
                }
            });
            const emailAddresses =
                userValues?.ccListDescription?.split(',')[0] === ''
                    ? []
                    : userValues?.ccListDescription?.trim()?.split(/[\n,]+/);
            const newInspectionRecord: IEditQaMultiUpdateRequest = {
                inspType: 'MULTI',
                emailAddresses: emailAddresses,
                inspRecords: sharedInspectionRecords,
                inspectorComments: userValues.comments,
                recordDateTxt: moment(recordDate)?.format('MM/DD/YYYY'),
                selectedCCList: ccMailList || [],
                truckCarrier: truckCarrier,
                itemTypeTxt: 'PRODUCE',
                growRegionCode: purchaseOrder?.growingRegion,
                poNum: purchaseOrder?.foreignPO?.toString(),
                vendorName: purchaseOrder?.vendor,
                vendorNo: purchaseOrder?.vendorNum,
            };
            setIsLoading(true);
            const formData: FormData = serialize(newInspectionRecord);
            resetMultiData(dynamicCicRows);
            saveQaInspectionRecord(formData);
        }
        setEnableError(setError);
        setEnableEmailError(setEmailError);
    };

    const sortedData = _.sortBy(dynamicCicFailData, ['resultsValue', 'Fail']);

    return (
        <div>
            {disableUpdate ? (
                <h4 className={classes.required}> * An entry is required for all mandatory fields</h4>
            ) : (
                <></>
            )}
            <Box>
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
                <Grid className={classes.gridContainer}>
                    {dynamicCicPassData.length > 0 ? (
                        <Grid>
                            <TableComponent
                                rows={addTableRows(dynamicCicPassData, titles)}
                                titles={getTitles(titles)}
                                hidePagination={true}
                                title={<h3>Pass</h3>}
                            />
                        </Grid>
                    ) : null}
                    <div>
                        {sortedData.map((dynamicItem, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    {index === 0 ||
                                    sortedData.findIndex((x) => x.resultsValue === 'Pass/Fail') === index ? (
                                        <h3 className={classes.padLeft}>{dynamicItem.resultsValue}</h3>
                                    ) : null}
                                    <ResultTable
                                        key={`key-${index}`}
                                        doneWithSelection={doneWithSelection}
                                        updateRejectionReasons={updateRejectionReasons}
                                        handleSelectionChange={handleSelectionChange}
                                        handleChange={handleChange}
                                        handleDateChange={handleDateChange}
                                        columns={columns}
                                        onUploadFileClick={onUploadFileClick}
                                        dynamicCicRow={{ ...dynamicItem }}
                                        errorDisplay={enableError}
                                        setErrorFocus={setErrorFocus}
                                        errorFocus={errorFocus}
                                        rowIndex={dynamicItem.rowIndex}
                                        rejRsnErrors={rejRsnErrors}
                                        inspectionSaved={inspectionSaved}
                                    />
                                </Grid>
                            );
                        })}
                    </div>
                    <Grid item xs={12}>
                        <EmailCClistForm
                            doneWithSelection={doneWithSelection}
                            handleSelectAllClick={handleSelectAllClick}
                            handleCheckboxClick={handleCheckboxClick}
                            handleCcListSelectAllClick={handleCcListSelectAllClick}
                            handleCcListCheckboxClick={handleCcListCheckboxClick}
                            emailGroups={emailGroups}
                            ccList={ccList}
                            onValuesChange={onValuesChange}
                            errorDisplay={enableEmailError}
                            setErrorFocus={setErrorFocus}
                            errorFocus={errorFocus}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.buttonSubmit}
                            disabled={disableUpdate}
                            onClick={onUpdateRecordClick}
                        >
                            Update Record
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleReturnSelectionClick}
                            variant="outlined"
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                        <Button onClick={onReturnClick} color="primary" variant="outlined" className={classes.button}>
                            Return to Previous Page
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default MultiInspectionUpdateRecords;
