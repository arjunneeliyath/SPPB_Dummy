import { ISuccessResponse } from '../../interfaces/success-response';
import { IDefectList } from '../../interfaces/admin/defect-category/get-all-defect-category';
import { IError } from '../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    getDefectCategoryAPI,
    getDefectCategoryDetailsAPI,
    editDefectCategoryDetailsAPI,
    deleteDefectCategoryAPI,
    deleteDefectAPI,
    createDefectCategoryAPI,
} from '../../end-points/admin/defect-category';
import {
    getAllDefectListSuccessAction,
    getDefectCatergoryDetailsSuccessAction,
} from '../../modules/admin/defect-category';
import { IGetDefectCategory } from '../../interfaces/admin/defect-category/get-defect-category';
import { AnyAction } from 'redux';

export function* getDefectCategorySaga() {
    try {
        const getDefectList: ISuccessResponse<IDefectList[]> = yield call(getDefectCategoryAPI);
        yield put(getAllDefectListSuccessAction(getDefectList.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getDefectCategoryDetailsSaga(action: AnyAction) {
    try {
        const getDefectCategoryDetails: ISuccessResponse<IGetDefectCategory> = yield call(
            getDefectCategoryDetailsAPI,
            action.value
        );
        yield put(getDefectCatergoryDetailsSuccessAction(getDefectCategoryDetails.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editDefectCategoryDetailsSaga(action: AnyAction) {
    try {
        yield call(editDefectCategoryDetailsAPI, action.value);
        const getDefectList: ISuccessResponse<IDefectList[]> = yield call(getDefectCategoryAPI);
        yield put(getAllDefectListSuccessAction(getDefectList.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteDefectCategorySaga(action: AnyAction) {
    try {
        yield call(deleteDefectCategoryAPI, action.value);
        const getDefect: ISuccessResponse<IDefectList[]> = yield call(getDefectCategoryAPI);
        yield put(getAllDefectListSuccessAction(getDefect.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteDefectSaga(action: AnyAction) {
    try {
        yield call(deleteDefectAPI, action.value);
        const getDefectCategoryDetails: ISuccessResponse<IGetDefectCategory> = yield call(
            getDefectCategoryDetailsAPI,
            action.value?.categoryId
        );
        yield put(getDefectCatergoryDetailsSuccessAction(getDefectCategoryDetails.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* createDefectCategorySaga(action: AnyAction) {
    try {
        yield call(createDefectCategoryAPI, action.value);
        const getDefectList: ISuccessResponse<IDefectList[]> = yield call(getDefectCategoryAPI);
        yield put(getAllDefectListSuccessAction(getDefectList.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
