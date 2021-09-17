import { call, put } from 'redux-saga/effects';
import {
    getLocationAPI,
    getLocationsAPI,
    addLocationAPI,
    editLocationAPI,
    deleteLocationAPI,
} from '../../end-points/admin/location';
import { toast } from 'react-toastify';
import { ILocationGetResponse } from '../../interfaces/admin/location/get-location';
import { ISuccessResponse } from '../../interfaces/success-response';
import { getLocationSuccessAction, getAllLocationListSuccessAction } from '../../modules/admin/location';
import { AnyAction } from 'redux';
import { ILocationList } from '../../interfaces/admin/location/get-all-location';
import { IError } from '../../interfaces/error-response';

export function* getLocationSaga(action: AnyAction) {
    try {
        const location: ISuccessResponse<ILocationGetResponse> = yield call(getLocationAPI, action.value);
        yield put(getLocationSuccessAction(location.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getAllLocationSaga() {
    try {
        const getLocation: ISuccessResponse<ILocationList[]> = yield call(getLocationsAPI);
        yield put(getAllLocationListSuccessAction(getLocation.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* addLocationSaga(action: AnyAction) {
    try {
        yield call(addLocationAPI, action.value);
        const getLocation: ISuccessResponse<ILocationList[]> = yield call(getLocationsAPI);
        yield put(getAllLocationListSuccessAction(getLocation.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editLocationSaga(action: AnyAction) {
    try {
        yield call(editLocationAPI, action.value);
        const getLocation: ISuccessResponse<ILocationList[]> = yield call(getLocationsAPI);
        yield put(getAllLocationListSuccessAction(getLocation.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteLocationSaga(action: AnyAction) {
    try {
        yield call(deleteLocationAPI, action.value);
        const getLocation: ISuccessResponse<ILocationList[]> = yield call(getLocationsAPI);
        yield put(getAllLocationListSuccessAction(getLocation.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
