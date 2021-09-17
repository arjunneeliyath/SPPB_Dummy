import { ISuccessResponse } from '../../../interfaces/success-response';
import { IError } from '../../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    getDoneWithSelectionDataSuccessAction,
    getMultiInspectionEditSuccessAction,
    getPurchaseOrderListSuccessAction,
    getPurchaseOrderSuccessAction,
    saveQaInspectionSuccessRecord,
} from '../../../modules/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import {
    getPurchaseOrderResponseAPI,
    getPurchaseOrderListAPI,
    getDoneWithSelectionListAPI,
    saveQaInspectionRecordAPI,
    getMultiInspectionEditAPI,
} from '../../../end-points/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import { AnyAction } from 'redux';
import { IPoItemsObj } from '../../../interfaces/quality-inspection-record/qa-inspection-record/po-items-object';
import { IPoListObj } from '../../../interfaces/quality-inspection-record/qa-inspection-record/po-list-object';
import { IDoneWithSelection } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import { IEditFormFields } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';

export function* getPurchaseOrderSaga(action: AnyAction) {
    try {
        const getPurchaseOrder: ISuccessResponse<IPoItemsObj> = yield call(getPurchaseOrderResponseAPI, action.value);
        let foreignPo;
        if (Object.keys(getPurchaseOrder?.data?.poItemsObj).length > 0) {
            foreignPo = action.value.po;
        } else {
            toast.error(`No records found against Foreign PO# : ${action.value.po}`);
        }
        yield put(getPurchaseOrderSuccessAction({ ...getPurchaseOrder.data.poItemsObj, foreignPO: foreignPo }));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getPurchaseOrderListSaga(action: AnyAction) {
    try {
        const getNewInspectionRecordResponse: ISuccessResponse<IPoListObj> = yield call(
            getPurchaseOrderListAPI,
            action.value
        );
        if (getNewInspectionRecordResponse?.data?.poList?.length === 0 && action?.value?.section !== 'BOTH') {
            toast.error('No records found against the given date range');
        }
        yield put(getPurchaseOrderListSuccessAction(getNewInspectionRecordResponse.data.poList));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getDoneWithSelectionSaga(action: AnyAction) {
    try {
        const getDoneWithSelectionListResponse: ISuccessResponse<IDoneWithSelection> = yield call(
            getDoneWithSelectionListAPI,
            action.value
        );
        yield put(getDoneWithSelectionDataSuccessAction(getDoneWithSelectionListResponse.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* saveQaInspectionSaga(action: AnyAction) {
    try {
        yield call(saveQaInspectionRecordAPI, action.value);
        toast.success('Inspection record saved successfully');
        yield put(saveQaInspectionSuccessRecord('Success'));
    } catch (error) {
        error.errors[0].fieldErrors.forEach((error: string) => {
            toast.error(error);
        });
        yield put(saveQaInspectionSuccessRecord('Fail'));
    }
}

export function* getMultiInspectionEditSaga(action: AnyAction) {
    try {
        const getMultiInspectionEditResponse: ISuccessResponse<IEditFormFields> = yield call(
            getMultiInspectionEditAPI,
            action.value
        );
        yield put(getMultiInspectionEditSuccessAction(getMultiInspectionEditResponse.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
