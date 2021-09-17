import { ISuccessResponse } from '../../../interfaces/success-response';
import { IDataTypeList } from '../../../interfaces/admin/attribute-maintenance/data-type-list/data-type-list';
import { IError } from '../../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    getAllDataTypeAPI,
    createDataTypeAPI,
    editDataTypeAPI,
    deleteDataTypeAPI,
} from '../../../end-points/admin/attribute-maintenance/data-type-list';
import { getAllDataTypeSuccessAction } from '../../../modules/admin/attribute-maintenance/data-type-list/data-type-list';
import { AnyAction } from 'redux';

export function* getAllDataTypeSaga() {
    try {
        const getDataType: ISuccessResponse<IDataTypeList[]> = yield call(getAllDataTypeAPI);
        yield put(getAllDataTypeSuccessAction(getDataType.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* createDataTypeSaga(action: AnyAction) {
    try {
        yield call(createDataTypeAPI, action.value);
        const getDataType: ISuccessResponse<IDataTypeList[]> = yield call(getAllDataTypeAPI);
        yield put(getAllDataTypeSuccessAction(getDataType.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editDataTypeSaga(action: AnyAction) {
    try {
        yield call(editDataTypeAPI, action.value);
        const getDataType: ISuccessResponse<IDataTypeList[]> = yield call(getAllDataTypeAPI);
        yield put(getAllDataTypeSuccessAction(getDataType.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteDataTypeSaga(action: AnyAction) {
    try {
        yield call(deleteDataTypeAPI, action.value);
        const getDataType: ISuccessResponse<IDataTypeList[]> = yield call(getAllDataTypeAPI);
        yield put(getAllDataTypeSuccessAction(getDataType.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
