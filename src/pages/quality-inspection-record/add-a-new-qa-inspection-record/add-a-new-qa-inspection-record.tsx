import React, { Dispatch, ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useStyles } from './styles';
import { IReduxState } from '../../../modules/store';
import { AnyAction } from 'redux';
import { IPurchaseOrder } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order';
import PurchaseOrder from './purchase-order';
import PurchaseOrderList from './purchase-order-list';
import PurchaseOrderContinue from './multi-inspection-record/multi-inspection-update-records';
import {
    getDoneWithSelectionData,
    getPurchaseOrder,
    getPurchaseOrderList,
    resetInspectionStatus,
    saveQaInspectionRecord,
} from '../../../modules/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import NewQaInspectionRecordForm from './new-qa-inspection-record-form';
import { Grid } from '@material-ui/core';
import { IQaInspectionFormValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/qa-inspection-form-values';
import checkboxItemTypeValues from '../../../constants/admin/attribute-maintenance/checkbox-item-type-values';
import { setFormattedDate } from '../../../utils/date-formater';
import { IPurchaseOrderDetails } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order-details';
import { IDynamicCic } from '../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import MultiInspectionRecord from './multi-inspection-record/multi-inspection-continue';
import { IDoneWithSelectionRequest } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection-request';
import { IDoneWithSelection } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import CircularIndeterminate from '../../../components/busy-indicator/busy-indicator';
import { useHistory } from 'react-router-dom';
import { routePath } from '../../../constants/routes';
import SingleSelect from './single-select/single-select';
import { ISingleSelectCic } from '../../../interfaces/quality-inspection-record/qa-inspection-record/single-select-cic';
import { IRejectionReason } from '../../../interfaces/quality-inspection-record/qa-inspection-record/rejection-reason';

interface IQaInspectionRecordProps {
    purchaseOrder: IPurchaseOrder;
    getPurchaseOrder: (data: IQaInspectionFormValues) => void;
    purchaseOrderList: IPurchaseOrderDetails[];
    getPurchaseOrderList: (data: IQaInspectionFormValues) => void;
    getDoneWithSelectionList: (data: IDoneWithSelectionRequest) => void;
    saveQaInspectionRecord: (data: FormData) => void;
    doneWithSelection: IDoneWithSelection;
    location?: History;
    inspectionSaved: string;
    resetInspectionStatus: (data: string) => void;
}

const AddNewQaInspectionRecord = (props: IQaInspectionRecordProps) => {
    type pageStatusEnum = 'singleInspection' | 'multipleInspection' | 'continueInspection' | 'homePage';
    const [inspectionFormValues, setInspectionFormValues] = useState<IQaInspectionFormValues>({
        fromDate: null,
        toDate: null,
    });
    const [clearComponent, setClearComponent] = useState(false);
    const [clearFilter, setClearFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState<pageStatusEnum>('homePage');
    const [pageName, setPageName] = useState<pageStatusEnum>('multipleInspection');
    const [cicList, setCicList] = useState<IDynamicCic[]>([]);
    const [poList, setPoList] = useState<IPurchaseOrderDetails[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dynamicCic, setDynamicCic] = useState<IDynamicCic[]>([]);
    const [truckCarrier, setTruckCarrier] = useState('');
    const [singleSelectCic, setSingleSelectCic] = useState<ISingleSelectCic[]>([]);
    const [rejectionReasons, setRejectionReasons] = useState<IRejectionReason[]>([]);
    const classes = useStyles();
    const history = useHistory();
    const {
        purchaseOrder,
        getPurchaseOrder,
        purchaseOrderList,
        getPurchaseOrderList,
        getDoneWithSelectionList,
        saveQaInspectionRecord,
        doneWithSelection,
        location,
        inspectionSaved,
        resetInspectionStatus,
    } = props;

    useEffect(() => {
        if (doneWithSelection?.dynamicAttributes) {
            setCurrentPage(pageName);
        }
    }, [doneWithSelection]);

    useEffect(() => {
        setCurrentPage('homePage');
        setPoList([]);
        if (location?.state?.length > 0) {
            history.replace(routePath.viewAll.index, {});
        }
    }, []);

    useEffect(() => {
        if (isLoading) {
            setTruckCarrier(purchaseOrder?.truckCarrier);
            setIsLoading(false);
        }
    }, [purchaseOrder]);

    useEffect(() => {
        if (purchaseOrderList?.length > 0 || poList?.length > 0 || (purchaseOrder?.foreignPO && isLoading)) {
            setIsLoading(false);
        }
    }, [purchaseOrderList]);

    useEffect(() => {
        setIsLoading(false);
        resetInspectionStatus('None');
        if (inspectionSaved === 'Success' && isLoading) {
            setClearFilter(true);
            setSingleSelectCic([]);
            setDynamicCic([]);
            setCurrentPage('homePage');
        }
    }, [inspectionSaved]);

    useEffect(() => {
        if (location?.state?.length > 0) {
            setPoList(location?.state);
        }
    }, [location?.state]);

    const sectionName = (section?: string) => checkboxItemTypeValues.find((item) => item.id === section)?.name;

    const getPurchaseOrderData = (inspectionFormValues: IQaInspectionFormValues) => {
        if (inspectionFormValues.po !== '' && inspectionFormValues.po !== undefined) {
            setIsLoading(true);
            getPurchaseOrder({
                ...inspectionFormValues,
                section: sectionName(inspectionFormValues.section)?.toLocaleUpperCase(),
            });
        }
        setInspectionFormValues({
            section: inspectionFormValues.section,
            po: inspectionFormValues.po,
            fromDate: null,
            toDate: null,
        });
    };

    const getPurchaseOrderListData = (inspectionFormValues: IQaInspectionFormValues) => {
        if (inspectionFormValues.toDate !== null && inspectionFormValues.fromDate !== null) {
            setIsLoading(true);
            getPurchaseOrderList({
                ...inspectionFormValues,
                fromDate: setFormattedDate(new Date(inspectionFormValues.fromDate)),
                toDate: setFormattedDate(new Date(inspectionFormValues.toDate)),
                section: sectionName(inspectionFormValues.section)?.toLocaleUpperCase(),
            });
        }
        setInspectionFormValues({
            section: inspectionFormValues.section,
            po: '',
            fromDate: inspectionFormValues.fromDate,
            toDate: inspectionFormValues.toDate,
        });
    };

    const getPurchaseOrderDataFromView = (po: string, sectionId: string) => {
        const sectionIdValue = inspectionFormValues.section || sectionId;
        setIsLoading(true);
        if (po !== undefined && po !== '') {
            getPurchaseOrder({
                ...inspectionFormValues,
                po: po,
                section: sectionName(sectionIdValue)?.toLocaleUpperCase(),
            });
        }
        setPoList([]);
        setClearFilter(false);
        setInspectionFormValues({ section: sectionIdValue, po: po, fromDate: null, toDate: null });
    };

    const renderDoneWithSelectionPage = (cic: IDynamicCic[], val: pageStatusEnum) => {
        const inspectionType = val === 'singleInspection' ? 'SINGLE' : 'MULTI';
        const itemType = inspectionFormValues.section === '1' ? 'PRODUCE' : 'FLORAL';
        getDoneWithSelectionList({ itemType, inspectionType });
        val === 'singleInspection'
            ? setCicList(cic)
            : setCicList(
                  cic.map((row) => ({
                      ...row,
                      ['color']: classes.passColor,
                      ['resultsId']: '1',
                      ['resultsValue']: 'Pass',
                      ['startTimeValue']: new Date(),
                  }))
              );
        setPageName(val);
    };

    const handleReturnSelectionClick = () => {
        setCurrentPage('homePage');
        setClearFilter(false);
        setSingleSelectCic([]);
        setDynamicCic([]);
    };

    const renderContinuePage = (dynamicCic: IDynamicCic[]) => {
        setCurrentPage('continueInspection');
        setDynamicCic(dynamicCic);
    };

    const renderMultipleInspectionPage = (dynamicCic: IDynamicCic[]) => {
        setCurrentPage('multipleInspection');
        setClearFilter(false);
        setCicList(dynamicCic);
    };
    const handleTruckCarrierChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target;
        setTruckCarrier(value);
    };

    const resetData = (data1: ISingleSelectCic[], data2: IDynamicCic[], data3: IRejectionReason[]) => {
        setSingleSelectCic(data1);
        setCicList(data2);
        setRejectionReasons(data3);
    };

    const resetMultiData = (data1: IDynamicCic[]) => {
        setDynamicCic(data1);
    };

    const renderComponent = (): ReactElement => {
        let component: ReactElement = <></>;
        switch (currentPage) {
            case 'homePage':
                if (poList?.length > 0) {
                    component = (
                        <div className={classes.gridContainer}>
                            <Grid container>
                                <PurchaseOrderList
                                    purchaseOrderList={poList}
                                    viewData={getPurchaseOrderDataFromView}
                                    fromHomePage={true}
                                />
                            </Grid>
                        </div>
                    );
                } else {
                    component = (
                        <div className={classes.gridContainer}>
                            {
                                <Grid container>
                                    <NewQaInspectionRecordForm
                                        getPurchaseOrderList={getPurchaseOrderListData}
                                        getPurchaseOrder={getPurchaseOrderData}
                                        formValues={inspectionFormValues}
                                        setClearComponent={setClearComponent}
                                        clearFilter={clearFilter}
                                        setClearFilter={setClearFilter}
                                    />
                                </Grid>
                            }
                            <Grid container className={classes.seperator}></Grid>
                            {inspectionFormValues?.po &&
                            purchaseOrder?.foreignPO &&
                            inspectionFormValues.po !== '' &&
                            !clearComponent ? (
                                <Grid container>
                                    <PurchaseOrder
                                        purchaseOrder={purchaseOrder}
                                        renderDoneWithSelectionPage={renderDoneWithSelectionPage}
                                        currentPage={currentPage}
                                    />
                                </Grid>
                            ) : null}
                            {inspectionFormValues?.fromDate !== null &&
                            purchaseOrderList.length > 0 &&
                            !clearComponent ? (
                                <Grid container>
                                    <PurchaseOrderList
                                        purchaseOrderList={purchaseOrderList}
                                        viewData={getPurchaseOrderDataFromView}
                                        inspectionFormValues={inspectionFormValues}
                                    />
                                </Grid>
                            ) : null}
                        </div>
                    );
                }
                break;
            case 'multipleInspection':
                component = (
                    <MultiInspectionRecord
                        cicList={cicList}
                        purchaseOrder={purchaseOrder}
                        handleReturnSelectionClick={handleReturnSelectionClick}
                        renderContinuePage={renderContinuePage}
                        doneWithSelection={doneWithSelection}
                        currentPage={currentPage}
                        handleTruckCarrierChange={handleTruckCarrierChange}
                        truckCarrier={truckCarrier}
                    />
                );
                break;
            case 'singleInspection':
                component = (
                    <SingleSelect
                        cicList={cicList}
                        purchaseOrder={purchaseOrder}
                        handleReturnSelectionClick={handleReturnSelectionClick}
                        doneWithSelection={doneWithSelection}
                        currentPage={currentPage}
                        saveSingleQaInspectionRecord={saveQaInspectionRecord}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        section={inspectionFormValues.section}
                        handleTruckCarrierChange={handleTruckCarrierChange}
                        truckCarrier={truckCarrier}
                        resetData={resetData}
                        singleSelectCic={singleSelectCic}
                        inspectionSaved={inspectionSaved}
                        savedRejectionReasons={rejectionReasons}
                    />
                );
                break;
            case 'continueInspection':
                component = (
                    <PurchaseOrderContinue
                        purchaseOrder={purchaseOrder}
                        currentPage={currentPage}
                        doneWithSelection={doneWithSelection}
                        dynamicCic={dynamicCic}
                        renderMultipleInspectionPage={renderMultipleInspectionPage}
                        handleReturnSelectionClick={handleReturnSelectionClick}
                        handleTruckCarrierChange={handleTruckCarrierChange}
                        truckCarrier={truckCarrier}
                        saveQaInspectionRecord={saveQaInspectionRecord}
                        section={inspectionFormValues.section}
                        setIsLoading={setIsLoading}
                        resetMultiData={resetMultiData}
                        inspectionSaved={inspectionSaved}
                    />
                );
        }
        return component;
    };

    return isLoading ? <CircularIndeterminate /> : renderComponent();
};

const mapStateToProps = (state: IReduxState) => ({
    purchaseOrder: state.purchaseOrderData.purchaseOrderData,
    purchaseOrderList: state.purchaseOrderData.purchaseOrderList,
    doneWithSelection: state.purchaseOrderData.doneWithSelection,
    inspectionSaved: state.purchaseOrderData.inspectionSaved,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getPurchaseOrder: (data: IQaInspectionFormValues) => dispatch(getPurchaseOrder(data)),
    getPurchaseOrderList: (data: IQaInspectionFormValues) => dispatch(getPurchaseOrderList(data)),
    getDoneWithSelectionList: (data: IDoneWithSelectionRequest) => dispatch(getDoneWithSelectionData(data)),
    saveQaInspectionRecord: (data: FormData) => dispatch(saveQaInspectionRecord(data)),
    resetInspectionStatus: (data: string) => dispatch(resetInspectionStatus(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewQaInspectionRecord);
