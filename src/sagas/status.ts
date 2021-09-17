import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import { getStatusAPI, getSampleData } from '../end-points';
import { IStatusResponse, IData } from '../interfaces/statusResponse';
import { ISuccessResponse } from '../interfaces/success-response';
import { getStatusSuccessAction, postDataSuccessAction } from '../modules/status';

export function* getStatusSaga() {
    try {
        const status: ISuccessResponse<IStatusResponse> = yield call(getStatusAPI);
        yield put(getStatusSuccessAction(status.data));
    } catch (error) {
        // TODO: handle error
    }
}

export function* postDataSaga() {
    try {
        const response: ISuccessResponse<IData> = yield call(getSampleData);
        yield put(postDataSuccessAction(response.data));
    } catch (error) {
        // TODO: handle error
        toast.error('Something went wrong');
    }
}
