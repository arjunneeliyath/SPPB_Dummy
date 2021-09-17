import { call, put } from 'redux-saga/effects';
import {
    getDispositionAPI,
    addDispositionAPI,
    editDispositionAPI,
    deleteDispositionAPI,
    getDispositionsAPI,
} from '../../end-points/admin/disposition';
import { toast } from 'react-toastify';
import { IDispositionGetResponse } from '../../interfaces/admin/disposition/get-disposition';
import { ISuccessResponse } from '../../interfaces/success-response';
import { getAllDispositionListSuccessAction, getDispositionSuccessAction } from '../../modules/admin/disposition';
import { AnyAction } from 'redux';
import { IDispositionList } from '../../interfaces/admin/disposition/get-all-disposition';
import { IError } from '../../interfaces/error-response';

export function* getDispositionSaga(action: AnyAction) {
    try {
        const disposition: ISuccessResponse<IDispositionGetResponse> = yield call(getDispositionAPI, action.value);
        yield put(getDispositionSuccessAction(disposition.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getAllDispositionSaga() {
    try {
        const getDisposition: ISuccessResponse<IDispositionList[]> = yield call(getDispositionsAPI);
        yield put(getAllDispositionListSuccessAction(getDisposition.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* addDispositionSaga(action: AnyAction) {
    try {
        yield call(addDispositionAPI, action.value);
        const getDisposition: ISuccessResponse<IDispositionList[]> = yield call(getDispositionsAPI);
        yield put(getAllDispositionListSuccessAction(getDisposition.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editDispositionSaga(action: AnyAction) {
    try {
        yield call(editDispositionAPI, action.value);
        const getDisposition: ISuccessResponse<IDispositionList[]> = yield call(getDispositionsAPI);
        yield put(getAllDispositionListSuccessAction(getDisposition.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteDispositionSaga(action: AnyAction) {
    try {
        yield call(deleteDispositionAPI, action.value);
        const getDisposition: ISuccessResponse<IDispositionList[]> = yield call(getDispositionsAPI);
        yield put(getAllDispositionListSuccessAction(getDisposition.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
