import { call, put } from 'redux-saga/effects';
import {
    getNonRejectionReasonAPI,
    addNonRejectionReasonAPI,
    editNonRejectionReasonAPI,
    deleteNonRejectionReasonAPI,
    getNonRejectionReasonsAPI,
} from '../../end-points/admin/non-rejection-reason';
import { toast } from 'react-toastify';
import { INonRejectionReasonGetResponse } from '../../interfaces/admin/non-rejection-reason/get-non-rejection-reason';
import { ISuccessResponse } from '../../interfaces/success-response';
import {
    getNonRejectionListSuccessAction,
    getAllNonRejectionListSuccessAction,
} from '../../modules/admin/non-rejection-reason';
import { AnyAction } from 'redux';
import { INonRejectionReasonList } from '../../interfaces/admin/non-rejection-reason/get-all-non-rejection-reason';
import { IError } from '../../interfaces/error-response';

export function* getNonRejectionReasonSaga(action: AnyAction) {
    try {
        const nonRejectionReason: ISuccessResponse<INonRejectionReasonGetResponse> = yield call(
            getNonRejectionReasonAPI,
            action.value
        );
        yield put(getNonRejectionListSuccessAction(nonRejectionReason.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getAllNonRejectionReasonSaga() {
    try {
        const getNonRejectionReasonsResponse: ISuccessResponse<INonRejectionReasonList[]> = yield call(
            getNonRejectionReasonsAPI
        );
        yield put(getAllNonRejectionListSuccessAction(getNonRejectionReasonsResponse.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* addNonRejectionReasonSaga(action: AnyAction) {
    try {
        yield call(addNonRejectionReasonAPI, action.value);
        const getNonRejectionReasonsResponse: ISuccessResponse<INonRejectionReasonList[]> = yield call(
            getNonRejectionReasonsAPI
        );
        yield put(getAllNonRejectionListSuccessAction(getNonRejectionReasonsResponse.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editNonRejectionReasonSaga(action: AnyAction) {
    try {
        yield call(editNonRejectionReasonAPI, action.value);
        const getNonRejectionReasonsResponse: ISuccessResponse<INonRejectionReasonList[]> = yield call(
            getNonRejectionReasonsAPI
        );
        yield put(getAllNonRejectionListSuccessAction(getNonRejectionReasonsResponse.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteNonRejectionReasonSaga(action: AnyAction) {
    try {
        yield call(deleteNonRejectionReasonAPI, action.value);
        const getNonRejectionReasonsResponse: ISuccessResponse<INonRejectionReasonList[]> = yield call(
            getNonRejectionReasonsAPI
        );
        yield put(getAllNonRejectionListSuccessAction(getNonRejectionReasonsResponse.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
