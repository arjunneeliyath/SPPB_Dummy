import { ISuccessResponse } from '../../../interfaces/success-response';
import { IError } from '../../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    getAllCcMailAddressResponseAPI,
    updateCcMailAddressAPI,
} from '../../../end-points/email-groups/cc-list-maintenance/cc-list-maintenance';
import { getAllCcMailAddressListSuccessAction } from '../../../modules/email-groups/cc-list-maintenance/cc-list-maintenance';
import { AnyAction } from 'redux';
import { ICcListMailMaintenance } from '../../../interfaces/email-groups/cc-list-maintenance/cc-list-maintenance';

export function* getAllCcMailAddressMaintenanceSaga() {
    try {
        const getCcMailAddressMaintenanceList: ISuccessResponse<ICcListMailMaintenance[]> = yield call(
            getAllCcMailAddressResponseAPI
        );
        getCcMailAddressMaintenanceList.data.forEach((mail) => {
            (mail.doValidate = false), (mail.doRemove = false), (mail.isValidMail = true);
        });
        yield put(getAllCcMailAddressListSuccessAction(getCcMailAddressMaintenanceList.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* updateCcMailAddressSaga(action: AnyAction) {
    try {
        yield call(updateCcMailAddressAPI, action.value);
        const getCcMailAddressList: ISuccessResponse<ICcListMailMaintenance[]> = yield call(
            getAllCcMailAddressResponseAPI
        );
        getCcMailAddressList.data.forEach((mail) => {
            (mail.doValidate = false), (mail.doRemove = false), (mail.isValidMail = true);
        });
        yield put(getAllCcMailAddressListSuccessAction(getCcMailAddressList.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
