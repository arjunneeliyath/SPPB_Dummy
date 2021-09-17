import React, { Dispatch, ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyles } from './styles';
import { IReduxState } from '../../../modules/store';
import { AnyAction } from 'redux';
import {
    getSearchResultList,
    getAllDropdownList,
    deleteSearchResultRow,
} from '../../../modules/quality-inspection-record/edit-qa-inspection-record/edit-qa-inspection-record';
import EditQaInspectionRecordForm from './edit-qa-inspection-record-form';
import { Grid } from '@material-ui/core';
import CircularIndeterminate from '../../../components/busy-indicator/busy-indicator';
import { IEditInspectionFormValues } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-inspection-values';
import SearchResultTable from './search-result-table';
import { ISearchResultTable } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/search-result-table';
import { IMultiInspectionEdit } from '../../../interfaces/quality-inspection-record/qa-inspection-record/form-field-values';
import { IEditFormFields } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';
import {
    getMultiInspectionEdit,
    resetInspectionStatus,
    saveQaInspectionRecord,
} from '../../../modules/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import MultiInspectionRecord from './multi-inspection-record/multi-inspection-continue';
import { IEditDynamicCic } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-dynamic-cic';
import { IEditPurchaseOrder } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-purchase-order';
// eslint-disable-next-line max-len
import { IDeleteSearchResultTableRow } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/delete-search-result-table';
import MultiInspectionUpdateRecords from './multi-inspection-record/multi-inspection-update-records';
import { IRejectionReason } from '../../../interfaces/quality-inspection-record/qa-inspection-record/rejection-reason';
import moment from 'moment';

interface IQaInspectionRecordProps {
    location?: History;
    getSearchResultList: (data: IEditInspectionFormValues) => void;
    searchResultList: ISearchResultTable[];
    getMultiInspectionEdit: (data: IMultiInspectionEdit) => void;
    qaMultiInspectionEdit: IEditFormFields;
    getAllDropdown: () => void;
    dropDownOptions: string[];
    deleteSearchResultRow: (data: IDeleteSearchResultTableRow) => void;
    saveQaInspectionRecord: (data: FormData) => void;
    inspectionSaved: string;
}

const AddNewQaInspectionRecord = (props: IQaInspectionRecordProps) => {
    type pageStatusEnum = 'searchResultTable' | 'homePage' | 'multipleInspection' | 'continueInspection';
    const [currentPage, setCurrentPage] = useState<pageStatusEnum>('homePage');
    const [isLoading, setIsLoading] = useState(false);
    const [groupCode, setGroupCode] = useState('');
    const [formData, setFormData] = useState<IEditInspectionFormValues>();
    const [searchResultState, setSearchResultState] = useState<ISearchResultTable[]>([]);
    const [cicList, setCicList] = useState<IEditDynamicCic[]>([]);
    const [dynamicCic, setDynamicCic] = useState<IEditDynamicCic[]>([]);
    const [truckCarrier, setTruckCarrier] = useState('');
    const [recordId, setRecordId] = useState(0);

    const classes = useStyles();
    const {
        getSearchResultList,
        searchResultList,
        getMultiInspectionEdit,
        getAllDropdown,
        dropDownOptions,
        qaMultiInspectionEdit,
        deleteSearchResultRow,
        saveQaInspectionRecord,
        inspectionSaved,
    } = props;

    const _export = React.useRef<ExcelExport | null>(null);

    useEffect(() => {
        if (searchResultList?.length > 0) {
            setIsLoading(false);
        }
    }, [searchResultList]);

    const nonRejIdtoValue = (item: number[]) => {
        const nonRejValues: string[] = [];
        qaMultiInspectionEdit.formFields.nonRejReasons.forEach((nonRej) =>
            item.forEach((val) => {
                if (nonRej.id === val) {
                    nonRejValues.push(String(nonRej.value));
                }
            })
        );
        return nonRejValues;
    };
    const resultValue = (result: string) => {
        switch (result) {
            case 'PASS':
                return 'Pass';
            case 'FAIL':
                return 'Fail';
            case 'PASS_FAIL':
                return 'Pass/Fail';
        }
    };
    useEffect(() => {
        if (dropDownOptions.length > 0) {
            setIsLoading(false);
        }
    }, [dropDownOptions]);

    useEffect(() => {
        setSearchResultState(searchResultList);
    }, [searchResultList]);

    useEffect(() => {
        setTruckCarrier(qaMultiInspectionEdit?.inspData?.truckCarrier);
        const data: IEditDynamicCic[] = [];
        if (qaMultiInspectionEdit.inspData?.inspRecords?.length > 0) {
            let inspRecords1: IEditDynamicCic;
            qaMultiInspectionEdit?.inspData?.inspRecords.map((row) => {
                const rejectionRns: IRejectionReason[] = [];
                row.rejReasons?.forEach((rej) => {
                    rejectionRns.push({
                        comments: rej.comments,
                        defect: String(rej.defectId),
                        category: String(rej.defectCatId),
                        avg: String(rej.levelAvg),
                        high: String(rej.levelHigh),
                        low: String(rej.levelLow),
                        categoryList: qaMultiInspectionEdit.formFields.defectCategories,
                    });
                });
                const date = qaMultiInspectionEdit.inspData?.recordDateTxt,
                    time = row.rejTimeHH + ':' + row.rejTimeMM + ':' + '00' + ' ' + row.rejTimeAMPM;
                inspRecords1 = {
                    resultsId: row.inspResult === 'PASS' ? '1' : row.inspResult === 'FAIL' ? '2' : '3',
                    resultsValue: resultValue(row.inspResult),
                    resultsChangeValue: resultValue(row.inspResult),
                    color: row.inspResult === 'PASS' ? classes.passColor : classes.failColor,
                    id: row.id,
                    qtyOrderd: row.qtyOrdered,
                    corpItemCode: row.cic,
                    itemDesc: row.itemDsc,
                    packSize: row.packSize,
                    shippedQtyValue: String(row.qtyShipped),
                    passedQtyValue: String(row.qtyPassed),
                    rejectedQtyValue: String(row.qtyRej),
                    labelValue: row.labelFarm,
                    startTimeValue: new Date(moment(date + ' ' + time).format('YYYY-MM-DD HH:mm:ss')),
                    nonRejValue: nonRejIdtoValue(row.nonRejReasonIds),
                    picList: row.pictures,
                    rejectionReasons: rejectionRns,
                    pulpTempValue: row.pulpTemp,
                    recFiles: row.recorderFiles,
                    recBrandValue: row.recorderBrand,
                    recValue: row.recorderNo,
                    recReadingValue: row.recorderReading,
                    timeZoneValue: row.rejTimeZoneCd,
                    basicRejReasonValue: String(row.rejReasonId),
                    currentLocationValue: row.locationId,
                    whseWeight: row.whseWeight,
                };

                row.dynamicAttributes?.map((x) => {
                    Object.assign(inspRecords1, {
                        [`Value${x.id}`]: { value: String(x.value), id: x.id, attrName: x.value },
                    });
                });
                data.push(inspRecords1);
            });
        }
        setCicList(data);
    }, [qaMultiInspectionEdit]);
    useEffect(() => {
        setSearchResultState([]);
        getAllDropdown();
        setIsLoading(true);
        setCurrentPage('homePage');
    }, []);

    const handleExportChanges = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    const getSearchResultListData = (data: IEditInspectionFormValues) => {
        getSearchResultList(data);
        setFormData(data);
        setGroupCode(data.section);
    };

    const renderMultipleInspectionPage = () => {
        setCurrentPage('multipleInspection');
    };
    const handleReturnSelectionClick = () => {
        setCurrentPage('homePage');
    };

    const onClearClick = () => {
        setSearchResultState([]);
    };

    const renderContinuePage = (dynamicCic: IEditDynamicCic[]) => {
        setCurrentPage('continueInspection');
        setDynamicCic(dynamicCic);
    };
    const resetMultiData = (data1: IEditDynamicCic[]) => {
        setDynamicCic(data1);
    };
    const handleTruckCarrierChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target;
        setTruckCarrier(value);
    };

    const deleteTableRow = (rowId: number) => {
        deleteSearchResultRow({ id: rowId, formValues: formData });
    };

    const getRecordId = (id: number) => {
        setRecordId(id);
    };

    const purchaseOrder: IEditPurchaseOrder = {
        foreignPO: Number(qaMultiInspectionEdit.inspData?.foreignPoNum),
        recordDate: qaMultiInspectionEdit.inspData?.recordDateTxt,
        vendor: qaMultiInspectionEdit.inspData?.vendorName,
        vendorNum: String(qaMultiInspectionEdit.inspData?.vendorNo),
        truckCarrier: qaMultiInspectionEdit.inspData?.truckCarrier,
        growingRegion: qaMultiInspectionEdit.inspData?.growRegionCode,
        buyer: qaMultiInspectionEdit.inspData?.buyer,
        divisionFacility: qaMultiInspectionEdit.inspData?.divisionFacility,
        dueDate: qaMultiInspectionEdit.inspData?.dueDateTxt,
        poComments: qaMultiInspectionEdit.inspData?.poComments,
    };
    const renderComponent = (): ReactElement => {
        let component: ReactElement = <></>;
        switch (currentPage) {
            case 'homePage':
                component = (
                    <div>
                        <Grid>
                            <EditQaInspectionRecordForm
                                getSearchResultList={getSearchResultListData}
                                dropDownOptions={dropDownOptions}
                                onClearClick={onClearClick}
                                handleExportChanges={handleExportChanges}
                                searchResultList={searchResultState}
                            />
                        </Grid>
                        <Grid container className={classes.seperator}></Grid>
                        {searchResultState?.length > 0 ? (
                            <SearchResultTable
                                searchResultList={searchResultState}
                                groupCode={groupCode}
                                getMultiInspectionEdit={getMultiInspectionEdit}
                                exportRef={_export}
                                deleteSearchResultRow={deleteTableRow}
                                renderMultipleInspectionPage={renderMultipleInspectionPage}
                                getRecordId={getRecordId}
                            />
                        ) : null}
                    </div>
                );
                break;
            case 'multipleInspection':
                component = (
                    <MultiInspectionRecord
                        cicList={cicList}
                        purchaseOrder={purchaseOrder}
                        handleReturnSelectionClick={handleReturnSelectionClick}
                        renderContinuePage={renderContinuePage}
                        doneWithSelection={qaMultiInspectionEdit}
                        currentPage={currentPage}
                        handleTruckCarrierChange={handleTruckCarrierChange}
                        truckCarrier={truckCarrier}
                    />
                );
                break;
            case 'continueInspection':
                component = (
                    <MultiInspectionUpdateRecords
                        purchaseOrder={purchaseOrder}
                        currentPage={currentPage}
                        doneWithSelection={qaMultiInspectionEdit}
                        dynamicCic={dynamicCic}
                        renderMultipleInspectionPage={renderMultipleInspectionPage}
                        handleReturnSelectionClick={handleReturnSelectionClick}
                        handleTruckCarrierChange={handleTruckCarrierChange}
                        truckCarrier={truckCarrier}
                        saveQaInspectionRecord={saveQaInspectionRecord}
                        setIsLoading={setIsLoading}
                        resetMultiData={resetMultiData}
                        inspectionSaved={inspectionSaved}
                        recordId={recordId}
                    />
                );
                break;
        }
        return component;
    };

    return isLoading ? <CircularIndeterminate /> : renderComponent();
};

const mapStateToProps = (state: IReduxState) => ({
    searchResultList: state.searchResultData.searchResultList,
    qaMultiInspectionEdit: state.purchaseOrderData.qaMultiInspectionEdit,
    dropDownOptions: state.searchResultData.dropDownOptions,
    inspectionSaved: state.purchaseOrderData.inspectionSaved,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getSearchResultList: (data: IEditInspectionFormValues) => dispatch(getSearchResultList(data)),
    getMultiInspectionEdit: (data: IMultiInspectionEdit) => dispatch(getMultiInspectionEdit(data)),
    getAllDropdown: () => dispatch(getAllDropdownList()),
    deleteSearchResultRow: (data: IDeleteSearchResultTableRow) => dispatch(deleteSearchResultRow(data)),
    saveQaInspectionRecord: (data: FormData) => dispatch(saveQaInspectionRecord(data)),
    resetInspectionStatus: (data: string) => dispatch(resetInspectionStatus(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewQaInspectionRecord);
