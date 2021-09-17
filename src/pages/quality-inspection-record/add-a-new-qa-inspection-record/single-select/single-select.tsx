import React, { useEffect, useState } from 'react';
import SharedRejectionDetails from './shared-rejection-details';
import {
    IDynamicCic,
    IErrorDisplay,
} from '../../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import CicTable from './cic-table';
import PurchaseOrderHeader from '../purchase-order-header';
import { IPurchaseOrder } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order';
import { IDoneWithSelection } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import { Button, Link } from '@material-ui/core';
import { useStyles } from './styles';
import RejectionReasonTable from '../rejection-reason-table';
import EmailCClistForm from '../email-cclist-form';
import { Grid } from '@material-ui/core';
import { IRejectionReason } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/rejection-reason';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ISingleSelectCic } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/single-select-cic';
import {
    IAddNewQaSingleUpdateRequest,
    IDynamicValues,
    IInspRecord,
    IRejReason,
} from '../../../../interfaces/quality-inspection-record/qa-inspection-record/add-a-new-qa-single-inspection';
import { IParameterValues } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/parameter-values';
import moment from 'moment';
import serialize from '../../../../utils/formdata-serialize';
import CircularIndeterminate from '../../../../components/busy-indicator/busy-indicator';

interface ISingleSelectProps {
    cicList: IDynamicCic[];
    purchaseOrder: IPurchaseOrder;
    currentPage: string;
    doneWithSelection: IDoneWithSelection;
    handleReturnSelectionClick: () => void;
    saveSingleQaInspectionRecord: (data: FormData) => void;
    isLoading: boolean;
    setIsLoading: (data: boolean) => void;
    section?: string;
    handleTruckCarrierChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    truckCarrier: string;
    resetData: (data1: ISingleSelectCic[], data2: IDynamicCic[], data3: IRejectionReason[]) => void;
    singleSelectCic: ISingleSelectCic[];
    inspectionSaved?: string;
    savedRejectionReasons: IRejectionReason[];
}

export interface IUpdateRecordsValues {
    ccListDescription: string;
    comments: string;
}

const SingleSelect = (props: ISingleSelectProps) => {
    const initialValues: ISingleSelectCic[] = [
        {
            labelValue: '',
            picList: [],
            RejValue: '',
            currentLocationValue: '',
            timeZoneValue: '',
            recReadingValue: '',
            recValue: '',
            recBrandValue: '',
            recFiles: [],
            pulpTempValue: '',
            startTimeValue: new Date(),
        },
    ];

    const {
        cicList,
        purchaseOrder,
        currentPage,
        handleReturnSelectionClick,
        doneWithSelection,
        saveSingleQaInspectionRecord,
        isLoading,
        setIsLoading,
        handleTruckCarrierChange,
        truckCarrier,
        section,
        resetData,
        singleSelectCic,
        inspectionSaved,
        savedRejectionReasons,
    } = props;
    const [rejectionReasons, setRejectionReasons] = useState<IRejectionReason[]>([]);
    const [dynamicCicRows, setDynamicCicRows] = useState<ISingleSelectCic[]>(initialValues);
    const [cicUpdatedRows, setCicUpdatedRows] = useState<IDynamicCic[]>([]);
    const [emailGroups, setEmailGroups] = useState<IParameterValues[]>([]);
    const [userValues, setUserValues] = useState<IUpdateRecordsValues>({ ccListDescription: '', comments: '' });
    const [ccList, setCcList] = useState<IParameterValues[]>([]);
    const [recordDate, setRecordDate] = useState<MaterialUiPickersDate | null>(new Date());
    const [columns, setColumns] = useState<ITitles[]>([]);
    const [disableUpdate, setDisableUpdate] = useState(false);
    const [enableError, setEnableError] = useState(false);
    const [errorDisp, setErrorDisp] = useState<IErrorDisplay[]>([]);
    const [errorFocus, setErrorFocus] = useState<IErrorDisplay>();
    const [rejRsnErrors, setRejRsnErrors] = useState<IErrorDisplay[]>([]);
    const classes = useStyles();

    /////////////////////////////** Shared Rejection Details **///////////////////////////////

    interface ITitles {
        value: string;
        label: string;
        fixed?: boolean;
        dataTypeName?: string;
        attributeValues?: string[];
        wordWrap?: boolean;
        required?: boolean;
        attributeId?: number;
    }

    const staticColumns = [
        {
            value: 'Rej',
            label: 'Basic Reason for Rejection',
            dataTypeName: 'SelectDropDownRejectionReason',
            fixed: true,
            required: true,
        },
        {
            value: 'currentLocation',
            label: 'Current Location',
            dataTypeName: 'SelectDropDownCurrentLocation',
            required: true,
        },
        { value: 'startTime', label: 'Start Time', dataTypeName: 'TimePicker', required: true },
        { value: 'timeZone', label: 'Time Zone', dataTypeName: 'SelectTimeZone', required: true },
        { value: 'label', label: 'Label/Farm', dataTypeName: 'TextField', required: true },
    ];

    const staticColumnsExtended = [
        { value: 'recReading', label: 'Rec Reading', dataTypeName: 'TextField' },
        { value: 'rec', label: 'Rec #', dataTypeName: 'TextField' },
        { value: 'recBrand', label: 'Rec Brand', dataTypeName: 'SelectRecBrand' },
        { value: 'recFile', label: 'Rec File', dataTypeName: 'InsertFile' },
        { value: 'pulpTemp', label: 'Pulp Temp', dataTypeName: 'TextField', required: true },
        { value: 'pictures', label: 'Pictures', dataTypeName: 'CameraIcon' },
    ];

    useEffect(() => {
        if (errorDisp?.length && document?.body && document?.documentElement) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }, [errorDisp]);

    useEffect(() => {
        if (inspectionSaved !== 'Success' && singleSelectCic?.length) {
            setDynamicCicRows(singleSelectCic);
        }
    }, [inspectionSaved, singleSelectCic]);

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
        setColumns([...staticColumns, ...tempDynamicColumns, ...staticColumnsExtended]);
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
            const colorValue = checkIsNaN(dynamicCicRows[0]?.Value6?.value);
            if (colorValue !== 0) {
                count = count + 1;
            }
            const appValue = checkIsNaN(dynamicCicRows[0]?.Value7?.value);
            if (appValue !== 0) {
                count = count + 1;
            }
            const condValue = checkIsNaN(dynamicCicRows[0]?.Value8?.value);
            if (condValue !== 0) {
                count = count + 1;
            }
            const wtValue = checkIsNaN(dynamicCicRows[0]?.Value9?.value);
            if (wtValue !== 0) {
                count = count + 1;
            }
            const qualValue = checkIsNaN(dynamicCicRows[0]?.Value10?.value);
            if (qualValue !== 0) {
                count = count + 1;
            }
            const overAllGradeValue = (appValue + colorValue + condValue + qualValue + wtValue) / count;
            setDynamicCicRows((state) =>
                state.map((row) => ({ ...row, ['Value11']: { value: overAllGradeValue.toString(), id: 11 } }))
            );
        }
    }, [
        Number(dynamicCicRows[0]?.Value6?.value), //Color
        Number(dynamicCicRows[0]?.Value7?.value), //App
        Number(dynamicCicRows[0]?.Value8?.value), //Cond
        Number(dynamicCicRows[0]?.Value9?.value), //Wt
        Number(dynamicCicRows[0]?.Value10?.value), //Qual
    ]);

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
        const sharedRejColumns = requiredColumns.length !== 0 ? !(requiredColumns.length === filledColumnCount) : true;
        const truckCarrierField = truckCarrier === undefined || truckCarrier.trim() === '';
        const cicFields = cicUpdatedRows.some(
            (field) =>
                field.rejectedQtyValue === undefined ||
                field.shippedQtyValue === undefined ||
                field.labelValue === undefined
        )
            ? true
            : cicUpdatedRows.some(
                  (field) => field.rejectedQtyValue === '' || field.shippedQtyValue === '' || field.labelValue === ''
              );
        let rejectionReasonField = false;
        if (rejectionReasons.length) {
            rejectionReasonField = rejectionReasons.some(
                (rej) => rej.category === '' || rej.defect === '' || rej.avg === '' || rej.low === '' || rej.high === ''
            );
        }
        const disable = sharedRejColumns || truckCarrierField || cicFields || rejectionReasonField;
        setDisableUpdate(disable);
    }, [dynamicCicRows, truckCarrier, cicUpdatedRows, rejectionReasons]);

    const checkIsNaN = (value: string): number => {
        return isNaN(Number(value)) ? 0 : Number(value);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
        column: string,
        attributeId?: number
    ) => {
        const { value, id } = event.target;
        if (attributeId === 2 && Number(value) > 99.99999) {
            event.preventDefault();
            return;
        }
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

    const handleSelectionChange = (
        event: React.ChangeEvent<any>,
        index: number,
        column: string,
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

    const onUploadImageClick = (values: File[], index: number) => {
        setDynamicCicRows((state) => state.map((row, j) => (j === index ? { ...row, ['picList']: values } : row)));
    };

    const onUploadFileClick = (files: File[], index: number) => {
        setDynamicCicRows((state) => state.map((row, j) => (j === index ? { ...row, ['recFiles']: files } : row)));
    };

    const handleDateChange = (date: MaterialUiPickersDate, index: number) => {
        setDynamicCicRows((state) => state.map((row, j) => (j === index ? { ...row, ['startTimeValue']: date } : row)));
    };

    //////////////////////////** End of Shared Rejection Details **//////////////////////////////

    //////////////////////////////** Rejection reason table**/////////////////////////////////

    useEffect(() => {
        if (cicList?.length > 0) {
            setCicUpdatedRows(cicList);
            // eslint-disable-next-line no-console
            console.log({ cicUpdatedRows });
            // eslint-disable-next-line no-console
            console.log({ cicList });
        }
    }, [cicList]);

    const updateRejectionReasons = (rejectionReasons: IRejectionReason[]) => {
        setRejectionReasons(rejectionReasons);
    };

    const handleCicTableTextFieldChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
        column: string
    ) => {
        const { value } = event.target;
        setCicUpdatedRows((state) =>
            state.map((row, j) =>
                j === index
                    ? {
                          ...row,
                          [`${column}Value`]: value,
                          ['rejectedQtyValue']: column === 'shippedQty' ? value : row.rejectedQtyValue,
                      }
                    : row
            )
        );
    };

    /////////////////////////////** End of Rejection reason table **/////////////////////////////

    /////////////////////////////** User Email form **/////////////////////////////
    useEffect(() => {
        const ccTempList: IParameterValues[] = [];
        doneWithSelection.ccList.forEach((item) => {
            ccTempList.push({ name: item });
        });
        setCcList(ccTempList);
    }, [doneWithSelection.ccList]);

    useEffect(() => {
        setEmailGroups(doneWithSelection.emailGroups);
    }, [doneWithSelection.emailGroups]);

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

    /////////////////////////////** Date and Truck/Carrier **/////////////////////////////

    const handleRecordDateChange = (date: MaterialUiPickersDate) => {
        setRecordDate(date);
    };

    /////////////////////////////** End of Date and Truck/Carrier **/////////////////////////////

    const onUploadClick = () => {
        let setError = false;
        setErrorDisp([]);
        cicUpdatedRows.map(function (row, index) {
            const num = index + 1;
            if (Number(row.shippedQtyValue) > Number(row.qtyOrderd)) {
                const error = {
                    rowIndex: index,
                    columnName: 'shippedQty',
                    errorMsg: 'Quantity Shipped should be less than Quantity Ordered at row ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
            if (Number(row.shippedQtyValue) === 0) {
                const error = {
                    rowIndex: index,
                    columnName: 'shippedQty',
                    errorMsg: 'Quantity Shipped should be greater than 0 at row ' + num,
                };
                setError = true;
                setErrorDisp((prevErrors) => [...prevErrors, error]);
            }
        });
        rejectionReasons?.map((rej, i) => {
            const count = i + 1;
            if (Number(rej.low) > Number(rej.avg)) {
                const error = {
                    rowIndex: i,
                    columnName: 'low',
                    errorMsg: 'Low% must not be greater than Avg% at row ' + count,
                };
                setError = true;
                setRejRsnErrors((prev) => [...prev, error]);
            } else if (Number(rej.low) > Number(rej.high)) {
                const error = {
                    rowIndex: i,
                    columnName: 'low',
                    errorMsg: 'Low% must not be greater than High% at row ' + count,
                };
                setError = true;
                setRejRsnErrors((prev) => [...prev, error]);
            } else if (Number(rej.avg) > Number(rej.high)) {
                const error = {
                    rowIndex: i,
                    columnName: 'avg',
                    errorMsg: 'Avg% must not be greater than High% at row ' + count,
                };
                setError = true;
                setRejRsnErrors((prev) => [...prev, error]);
            }
        });
        if (!setError) {
            const dynamicAttr = Object.entries(dynamicCicRows[0]);
            const dynamicAttrValues: IDynamicValues[] = [];
            const rejectionRns: IRejReason[] = [];
            rejectionReasons.forEach((rej) => {
                rejectionRns.push({
                    comments: rej.comments,
                    defectCatId: Number(rej.category),
                    defectId: Number(rej.defect),
                    levelAvg: Number(rej.avg).toFixed(2),
                    levelHigh: Number(rej.high).toFixed(2),
                    levelLow: Number(rej.low).toFixed(2),
                });
            });
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
            const sharedInspectionRecords: IInspRecord[] = [];
            const time = dynamicCicRows[0]?.startTimeValue?.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            const hour = dynamicCicRows[0]?.startTimeValue?.getHours()
                ? dynamicCicRows[0]?.startTimeValue?.getHours() % 12
                : 0;
            const rejTimeAMPM = time?.match(/[a-zA-Z]+/g)?.[0];
            cicUpdatedRows.forEach((item) => {
                sharedInspectionRecords.push({
                    cic: item.corpItemCode,
                    dynamicAttributes: dynamicAttrValues,
                    whseWeight: purchaseOrder?.whseWeight,
                    itemDsc: item.itemDesc,
                    labelFarm: item.labelValue,
                    locationId: Number(dynamicCicRows[0].currentLocationValue),
                    packSize: item.packSize,
                    pulpTemp: dynamicCicRows[0].pulpTempValue,
                    qtyOrdered: item.qtyOrderd,
                    qtyRej: Number(item.rejectedQtyValue),
                    qtyShipped: Number(item.shippedQtyValue),
                    recorderBrand: dynamicCicRows[0].recBrandValue,
                    recorderNo: dynamicCicRows[0].recValue,
                    recorderReading: dynamicCicRows[0].recReadingValue,
                    rejReasonId: Number(dynamicCicRows[0].RejValue),
                    rejReasons: rejectionRns,
                    rejTimeAMPM: rejTimeAMPM,
                    rejTimeHH: hour || 12,
                    rejTimeMM: dynamicCicRows[0]?.startTimeValue?.getMinutes(),
                    rejTimeZoneCd: dynamicCicRows[0].timeZoneValue,
                });
            });
            const emailGroupList: number[] = [];
            const ccMailList: string[] = [];
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
            const newInspectionRecord: IAddNewQaSingleUpdateRequest = {
                inspType: 'SINGLE',
                emailAddresses: emailAddresses,
                emailGroupIds: emailGroupList || [],
                growRegionCode: purchaseOrder.growingRegion,
                inspRecords: sharedInspectionRecords,
                inspectorComments: userValues.comments,
                poNum: purchaseOrder.foreignPO.toString(),
                recordDateTxt: moment(recordDate).format('MM/DD/YYYY'),
                selectedCCList: ccMailList || [],
                truckCarrier: truckCarrier,
                vendorName: purchaseOrder.vendor,
                vendorNo: purchaseOrder?.vendorNum,
                pictures: dynamicCicRows[0].picList || [],
                recorderFiles: dynamicCicRows[0].recFiles || [],
                itemTypeTxt: section === '1' ? 'PRODUCE' : 'FLORAL',
            };
            const formData = serialize(newInspectionRecord);
            setIsLoading(true);
            saveSingleQaInspectionRecord(formData);
            resetData(dynamicCicRows, cicUpdatedRows, rejectionReasons);
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
            {isLoading ? (
                <CircularIndeterminate />
            ) : (
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
                            handleTruckCarrierChange={handleTruckCarrierChange}
                            handleDateChange={handleRecordDateChange}
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
                        <CicTable
                            cicUpdatedRows={cicUpdatedRows}
                            handleCicTextFieldChange={handleCicTableTextFieldChange}
                            errorDisplay={enableError}
                            errorFocus={errorFocus}
                            setErrorFocus={setErrorFocus}
                        />
                        <SharedRejectionDetails
                            handleChange={handleChange}
                            handleSelectionChange={handleSelectionChange}
                            onUploadClick={onUploadImageClick}
                            onUploadFileClick={onUploadFileClick}
                            handleDateChange={handleDateChange}
                            dynamicCicRows={dynamicCicRows}
                            doneWithSelection={doneWithSelection}
                            columns={columns}
                        />
                        <RejectionReasonTable
                            doneWithSelection={doneWithSelection}
                            updateRejectionReasons={updateRejectionReasons}
                            rejRsnErrors={rejRsnErrors}
                            rejectionReasons={savedRejectionReasons}
                            inspectionSaved={inspectionSaved}
                        />
                        <EmailCClistForm
                            doneWithSelection={doneWithSelection}
                            handleSelectAllClick={handleSelectAllClick}
                            handleCheckboxClick={handleCheckboxClick}
                            handleCcListSelectAllClick={handleCcListSelectAllClick}
                            handleCcListCheckboxClick={handleCcListCheckboxClick}
                            emailGroups={emailGroups}
                            ccList={ccList}
                            onValuesChange={onValuesChange}
                        />

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.buttonSubmit}
                            onClick={onUploadClick}
                            disabled={disableUpdate}
                        >
                            Update Record
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            className={classes.button}
                            onClick={handleReturnSelectionClick}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default SingleSelect;
