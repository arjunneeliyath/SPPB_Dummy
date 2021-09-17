import { ISuccessResponse } from '../../../interfaces/success-response';
import { IEmailGroupMaintenance } from '../../../interfaces/email-groups/email-group-maintenance/get-all-email-group-maintenance';
import { IError } from '../../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    copyEmailGroupAPI,
    deleteEmailGroupAPI,
    getAllEmailGroupMaintenanceResponseAPI,
    getEmailGroupAPI,
    saveEmailGroupAPI,
    updateEmailGroupAPI,
} from '../../../end-points/email-groups/email-group-maintenance/email-group-maintenance';
import {
    getAllEmailGrpMaintenanceListSuccessAction,
    getEmailGroupSuccessAction,
} from '../../../modules/email-groups/email-group-maintenance/email-group-maintenance';
import { IGetEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/get-email-group';
import { AnyAction } from 'redux';
import { IEmailAddress } from '../../../interfaces/email-groups/email-group-maintenance/email-address';

export function* getAllEmailGroupMaintenanceSaga() {
    try {
        const getEmailGroupMaintenanceList: ISuccessResponse<IEmailGroupMaintenance[]> = yield call(
            getAllEmailGroupMaintenanceResponseAPI
        );
        yield put(getAllEmailGrpMaintenanceListSuccessAction(getEmailGroupMaintenanceList.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* getEmailGroupSaga(action: AnyAction) {
    try {
        const getEmailGroup: ISuccessResponse<IGetEmailGroup> = yield call(getEmailGroupAPI, action.value);
        const modifiedEmailAddressess: IEmailAddress[] = getEmailGroup.data.emailAddresses.filter(
            (item) => (item.isValidMail = true)
        );
        const modifiedEmailGroup: IGetEmailGroup = { ...getEmailGroup.data, emailAddresses: modifiedEmailAddressess };
        yield put(getEmailGroupSuccessAction(modifiedEmailGroup));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* saveEmailGroupSaga(action: AnyAction) {
    try {
        yield call(saveEmailGroupAPI, action.value);
        const getEmailGroupMaintenanceList: ISuccessResponse<IEmailGroupMaintenance[]> = yield call(
            getAllEmailGroupMaintenanceResponseAPI
        );
        yield put(getAllEmailGrpMaintenanceListSuccessAction(getEmailGroupMaintenanceList.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* updateEmailGroupSaga(action: AnyAction) {
    try {
        yield call(updateEmailGroupAPI, action.value);
        const getEmailGroupMaintenanceList: ISuccessResponse<IEmailGroupMaintenance[]> = yield call(
            getAllEmailGroupMaintenanceResponseAPI
        );
        yield put(getAllEmailGrpMaintenanceListSuccessAction(getEmailGroupMaintenanceList.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* copyEmailGroupSaga(action: AnyAction) {
    try {
        yield call(copyEmailGroupAPI, action.value);
        const getEmailGroupMaintenanceList: ISuccessResponse<IEmailGroupMaintenance[]> = yield call(
            getAllEmailGroupMaintenanceResponseAPI
        );
        yield put(getAllEmailGrpMaintenanceListSuccessAction(getEmailGroupMaintenanceList.data));
        toast.success('Item added successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* deleteEmailGroupSaga(action: AnyAction) {
    try {
        yield call(deleteEmailGroupAPI, action.value);
        const getEmailGroupMaintenanceList: ISuccessResponse<IEmailGroupMaintenance[]> = yield call(
            getAllEmailGroupMaintenanceResponseAPI
        );
        yield put(getAllEmailGrpMaintenanceListSuccessAction(getEmailGroupMaintenanceList.data));
        toast.success('Item deleted successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
