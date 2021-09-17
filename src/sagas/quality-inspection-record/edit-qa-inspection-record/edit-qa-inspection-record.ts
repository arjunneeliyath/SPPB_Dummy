import { ISuccessResponse } from '../../../interfaces/success-response';
import { IError } from '../../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    getSearchResultListSuccess,
    getAllDropdownSuccessAction,
    getAllSearchResultSuccessAction,
} from '../../../modules/quality-inspection-record/edit-qa-inspection-record/edit-qa-inspection-record';
import {
    getSearchResultListAPI,
    getDropdownOptionsAPI,
    deleteSearchResultRowAPI,
    getSearchResultAPI,
} from '../../../end-points/quality-inspection-record/edit-qa-inspection-record/edit-qa-inspection-record';
import { AnyAction } from 'redux';
import { ISearchResultTable } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/search-result-table';

export function* getSearchResultListSaga(action: AnyAction) {
    try {
        const getSearchResult: ISuccessResponse<any> = yield call(getSearchResultListAPI, action.value);
        yield put(getSearchResultListSuccess(getSearchResult.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getAllDropdownOptionsSaga() {
    try {
        const getDropdownOptions: ISuccessResponse<string[]> = yield call(getDropdownOptionsAPI);
        yield put(getAllDropdownSuccessAction(getDropdownOptions.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteSearchResultRowSaga(action: AnyAction) {
    try {
        const data = action.value;
        const result = data.formValues;
        const recordId = data.id;
        yield call(deleteSearchResultRowAPI, recordId);
        const getSearchResultResponse: ISuccessResponse<ISearchResultTable[]> = yield call(getSearchResultAPI);
        yield put(getAllSearchResultSuccessAction(getSearchResultResponse.data));
        toast.success('Item deleted successfully');
        const getSearchResult: ISuccessResponse<any> = yield call(getSearchResultListAPI, result);
        yield put(getSearchResultListSuccess(getSearchResult.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
