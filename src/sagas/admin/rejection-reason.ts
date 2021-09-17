import { call, put } from 'redux-saga/effects';
import {
    getRejectionReasonAPI,
    addRejectionReasonAPI,
    editRejectionReasonAPI,
    deleteRejectionReasonAPI,
    getRejectionReasonsAPI,
} from '../../end-points/admin/rejection-reason';
import { toast } from 'react-toastify';
import { IRejectionReasonGetResponse } from '../../interfaces/admin/rejection-reason/get-rejection-reason';
import { ISuccessResponse } from '../../interfaces/success-response';
import { getRejectionListSuccessAction, getAllRejectionListSuccessAction } from '../../modules/admin/rejection-reason';
import { AnyAction } from 'redux';
import { IRejectionReason } from '../../interfaces/admin/rejection-reason/get-all-rejection-reason';
import { IError } from '../../interfaces/error-response';

export function* getRejectionReasonSaga(action: AnyAction) {
    try {
        const RejectionReason: ISuccessResponse<IRejectionReasonGetResponse> = yield call(
            getRejectionReasonAPI,
            action.value
        );
        yield put(getRejectionListSuccessAction(RejectionReason.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getAllRejectionReasonSaga() {
    try {
        const getRejectionReasonsResponse: ISuccessResponse<IRejectionReason[]> = yield call(getRejectionReasonsAPI);
        yield put(getAllRejectionListSuccessAction(getRejectionReasonsResponse.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* addRejectionReasonSaga(action: AnyAction) {
    try {
        yield call(addRejectionReasonAPI, action.value);
        const getRejectionReasonsResponse: ISuccessResponse<IRejectionReason[]> = yield call(getRejectionReasonsAPI);
        yield put(getAllRejectionListSuccessAction(getRejectionReasonsResponse.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editRejectionReasonSaga(action: AnyAction) {
    try {
        yield call(editRejectionReasonAPI, action.value);
        const getRejectionReasonsResponse: ISuccessResponse<IRejectionReason[]> = yield call(getRejectionReasonsAPI);
        yield put(getAllRejectionListSuccessAction(getRejectionReasonsResponse.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteRejectionReasonSaga(action: AnyAction) {
    try {
        yield call(deleteRejectionReasonAPI, action.value);
        const getRejectionReasonsResponse: ISuccessResponse<IRejectionReason[]> = yield call(getRejectionReasonsAPI);
        yield put(getAllRejectionListSuccessAction(getRejectionReasonsResponse.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
