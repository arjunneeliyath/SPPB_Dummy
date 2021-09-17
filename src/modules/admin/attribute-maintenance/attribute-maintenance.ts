import { AnyAction } from 'redux';
import { IAttribute } from '../../../interfaces/admin/attribute-maintenance/attribute-list/get-all-attribute';
import { IAttributeMaintenanceEditRequest } from '../../../interfaces/admin/attribute-maintenance/attribute-list/edit-attribute';

export const GET_ALL_ATTRIBUTES = 'GET_ALL_ATTRIBUTES';
export const GET_ALL_ATTRIBUTES_SUCCESS_ACTION = 'GET_ALL_ATTRIBUTES_SUCCESS_ACTION';
export const EDIT_ATTRIBUTE_MAINTENANCE = 'EDIT_ATTRIBUTE_MAINTENANCE';

export const getAllAttributeList = () => ({
    type: GET_ALL_ATTRIBUTES,
});

export const getAllAttributesSuccessAction = (value: IAttribute[]) => ({
    type: GET_ALL_ATTRIBUTES_SUCCESS_ACTION,
    value,
});

export const editAttributeMaintenance = (value: IAttributeMaintenanceEditRequest) => ({
    type: EDIT_ATTRIBUTE_MAINTENANCE,
    value,
});

const attributeReducerInit = {
    attributeList: [],
};

export interface IAttributeReducer {
    attributeList: IAttribute[];
}

const attributeReducer = (state = attributeReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_ATTRIBUTES_SUCCESS_ACTION:
            return {
                ...state,
                attributeList: [...action.value],
            };
    }
    return state;
};

export default attributeReducer;
