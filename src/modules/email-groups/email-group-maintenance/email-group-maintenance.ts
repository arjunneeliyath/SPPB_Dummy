import { AnyAction } from 'redux';
import { IEmailGroupMaintenance } from '../../../interfaces/email-groups/email-group-maintenance/get-all-email-group-maintenance';
import { IGetEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/get-email-group';
import { ISaveEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/save-email-group';

export const GET_ALL_EMAIL_GROUP_MAINTENANCE_SUCCESS_ACTION = 'GET_ALL_EMAIL_GROUP_MAINTENANCE_SUCCESS_ACTION';
export const GET_ALL_EMAIL_GROUP_MAINTENANCE = 'GET_ALL_EMAIL_GROUP_MAINTENANCE';

export const GET_EMAIL_GROUP_SUCCESS_ACTION = 'GET_EMAIL_GROUP_SUCCESS_ACTION';
export const GET_EMAIL_GROUP = 'GET_EMAIL_GROUP';

export const SAVE_EMAIL_GROUP = 'SAVE_EMAIL_GROUP';

export const UPDATE_EMAIL_GROUP = 'UPDATE_EMAIL_GROUP';

export const COPY_EMAIL_GROUP = 'COPY_EMAIL_GROUP';

export const DELETE_EMAIL_GROUP = 'DELETE_EMAIL_GROUP';

export const getAllEmailGroupMaintenanceList = () => ({
    type: GET_ALL_EMAIL_GROUP_MAINTENANCE,
});

export const getAllEmailGrpMaintenanceListSuccessAction = (value: IEmailGroupMaintenance[]) => ({
    type: GET_ALL_EMAIL_GROUP_MAINTENANCE_SUCCESS_ACTION,
    value,
});

export const getEmailGroup = (value: number) => ({
    type: GET_EMAIL_GROUP,
    value,
});

export const getEmailGroupSuccessAction = (value: IGetEmailGroup) => ({
    type: GET_EMAIL_GROUP_SUCCESS_ACTION,
    value,
});

export const saveEmailGroup = (value: ISaveEmailGroup) => ({
    type: SAVE_EMAIL_GROUP,
    value,
});

export const updateEmailGroup = (value: ISaveEmailGroup) => ({
    type: UPDATE_EMAIL_GROUP,
    value,
});

export const copyEmailGroup = (value: ISaveEmailGroup) => ({
    type: COPY_EMAIL_GROUP,
    value,
});

export const deleteEmailGroup = (value: number) => ({
    type: DELETE_EMAIL_GROUP,
    value,
});

const emailGroupMaintenanceReducerInit = {
    emailGroupMaintenanceList: [],
    emailGroup: {},
};

export interface IEmailGroupMaintenanceReducer {
    emailGroupMaintenanceList: IEmailGroupMaintenance[];
    emailGroup: IGetEmailGroup;
}

const emailGroupMaintenanceReducer = (state = emailGroupMaintenanceReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_EMAIL_GROUP_MAINTENANCE_SUCCESS_ACTION:
            return {
                ...state,
                emailGroupMaintenanceList: [...action.value],
            };
        case GET_EMAIL_GROUP_SUCCESS_ACTION:
            return {
                ...state,
                emailGroup: { ...action.value },
            };
    }
    return state;
};

export default emailGroupMaintenanceReducer;
