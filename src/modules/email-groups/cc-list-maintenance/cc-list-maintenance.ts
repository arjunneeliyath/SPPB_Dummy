import { AnyAction } from 'redux';
import { ICcListMailMaintenance } from '../../../interfaces/email-groups/cc-list-maintenance/cc-list-maintenance';

export const GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE_SUCCESS_ACTION = 'GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE_SUCCESS_ACTION';
export const GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE = 'GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE';
export const UPDATE_CC_MAIL_ADDRESS = 'UPDATE_CC_MAIL_ADDRESS';

export const getAllCcMailAddressMaintenanceList = () => ({
    type: GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE,
});

export const getAllCcMailAddressListSuccessAction = (value: ICcListMailMaintenance[]) => ({
    type: GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE_SUCCESS_ACTION,
    value,
});

export const updateCcMailAddress = (value: ICcListMailMaintenance[]) => ({
    type: UPDATE_CC_MAIL_ADDRESS,
    value,
});

const ccListMaintenanceReducerInit = {
    ccMailAddressList: [],
};

export interface ICcMailAddressReducer {
    ccMailAddressList: ICcListMailMaintenance[];
}

const ccMailAddressMaintenanceReducer = (state = ccListMaintenanceReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE_SUCCESS_ACTION:
            return {
                ...state,
                ccMailAddressList: [...action.value],
            };
    }
    return state;
};

export default ccMailAddressMaintenanceReducer;
