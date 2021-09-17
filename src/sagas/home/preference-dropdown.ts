import { ISuccessResponse } from '../../interfaces/success-response';
import { IError } from '../../interfaces/error-response';
import { IPreferenceDropdown } from '../../interfaces/home/preference-dropdown';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    applyPreferenceDropdownListSuccess,
    getAllPreferenceDropdownSuccess,
} from '../../modules/home/preference-dropdown';
import { getPreferenceDropdownOptionsAPI, addPreferenceApplyAPI } from '../../end-points/home/preference-dropdown';
import { AnyAction } from 'redux';

export function* getAllPreferenceDropdownOptionsSaga() {
    try {
        const getDropdownOptions: ISuccessResponse<IPreferenceDropdown[]> = yield call(getPreferenceDropdownOptionsAPI);
        yield put(getAllPreferenceDropdownSuccess(getDropdownOptions.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* addApplyPreferenceDropdownOptionsSaga(action: AnyAction) {
    try {
        yield call(addPreferenceApplyAPI, action.value);
        yield put(applyPreferenceDropdownListSuccess(true));
        toast.success('Preference applied successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
