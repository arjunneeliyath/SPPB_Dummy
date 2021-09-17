import { AnyAction } from 'redux';
import { IQaInspectionFormValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/qa-inspection-form-values';
import { IPurchaseOrder } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order';
import { IPurchaseOrderDetails } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order-details';
import { IDoneWithSelection } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import { IDoneWithSelectionRequest } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection-request';
import { IEditFormFields } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';
import { IMultiInspectionEdit } from '../../../interfaces/quality-inspection-record/qa-inspection-record/form-field-values';

export const GET_PURCHASE_ORDER_SUCCESS_ACTION = 'GET_PURCHASE_ORDER_SUCCESS_ACTION';
export const GET_PURCHASE_ORDER_ACTION = 'GET_PURCHASE_ORDER_ACTION';
export const GET_PURCHASE_ORDER_LIST_SUCCESS_ACTION = 'GET_PURCHASE_ORDER_LIST_SUCCESS_ACTION';
export const GET_PURCHASE_ORDER_LIST = 'GET_PURCHASE_ORDER_LIST';
export const GET_DONE_WITH_SELECTION_DATA_SUCCESS_ACTION = 'GET_DONE_WITH_SELECTION_DATA_SUCCESS_ACTION';
export const GET_DONE_WITH_SELECTION_DATA = 'GET_DONE_WITH_SELECTION_DATA';
export const SAVE_INSPECTION_RECORD_ACTION = 'SAVE_INSPECTION_RECORD_ACTION';
export const SAVE_INSPECTION_RECORD_SUCCESS_ACTION = 'SAVE_INSPECTION_RECORD_SUCCESS_ACTION';
export const RESET_INSPECTION_STATUS = 'RESET_INSPECTION_STATUS';
export const GET_MULTI_INSPECTION_EDIT_SUCCESS_ACTION = 'GET_MULTI_INSPECTION_EDIT_SUCCESS_ACTION';
export const GET_MULTI_INSPECTION_EDIT = 'GET_MULTI_INSPECTION_EDIT';

export const getPurchaseOrderList = (value: IQaInspectionFormValues) => ({
    type: GET_PURCHASE_ORDER_LIST,
    value,
});

export const getPurchaseOrderListSuccessAction = (value: IPurchaseOrderDetails[]) => ({
    type: GET_PURCHASE_ORDER_LIST_SUCCESS_ACTION,
    value,
});

export const getPurchaseOrder = (value: IQaInspectionFormValues) => ({
    type: GET_PURCHASE_ORDER_ACTION,
    value,
});

export const getPurchaseOrderSuccessAction = (value?: IPurchaseOrder) => ({
    type: GET_PURCHASE_ORDER_SUCCESS_ACTION,
    value,
});

export const getDoneWithSelectionData = (value: IDoneWithSelectionRequest) => ({
    type: GET_DONE_WITH_SELECTION_DATA,
    value,
});

export const getDoneWithSelectionDataSuccessAction = (value: IDoneWithSelection) => ({
    type: GET_DONE_WITH_SELECTION_DATA_SUCCESS_ACTION,
    value,
});

export const saveQaInspectionRecord = (value: FormData) => ({
    type: SAVE_INSPECTION_RECORD_ACTION,
    value,
});

export const saveQaInspectionSuccessRecord = (value: string) => ({
    type: SAVE_INSPECTION_RECORD_SUCCESS_ACTION,
    value,
});

export const resetInspectionStatus = (value: string) => ({
    type: RESET_INSPECTION_STATUS,
    value,
});

export const getMultiInspectionEdit = (value: IMultiInspectionEdit) => ({
    type: GET_MULTI_INSPECTION_EDIT,
    value,
});

export const getMultiInspectionEditSuccessAction = (value: IEditFormFields) => ({
    type: GET_MULTI_INSPECTION_EDIT_SUCCESS_ACTION,
    value,
});

const purchaseOrderReducerInit = {
    purchaseOrderData: {},
    purchaseOrderList: [],
    doneWithSelection: {},
    inspectionSaved: 'None',
    qaMultiInspectionEdit: {},
};

export interface IPurchaseOrderReducer {
    purchaseOrderData: IPurchaseOrder;
    purchaseOrderList: IPurchaseOrderDetails[];
    doneWithSelection: IDoneWithSelection;
    inspectionSaved: string;
    qaMultiInspectionEdit: IEditFormFields;
}

const purchaseOrderReducer = (state = purchaseOrderReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_PURCHASE_ORDER_SUCCESS_ACTION:
            return {
                ...state,
                purchaseOrderData: { ...action.value },
            };

        case GET_PURCHASE_ORDER_LIST_SUCCESS_ACTION:
            return {
                ...state,
                purchaseOrderList: [...action.value],
            };

        case GET_DONE_WITH_SELECTION_DATA_SUCCESS_ACTION:
            return {
                ...state,
                doneWithSelection: { ...action.value },
            };

        case SAVE_INSPECTION_RECORD_SUCCESS_ACTION:
            return { ...state, inspectionSaved: action.value };

        case RESET_INSPECTION_STATUS:
            return { ...state, inspectionSaved: action.value };

        case GET_MULTI_INSPECTION_EDIT_SUCCESS_ACTION:
            return {
                ...state,
                qaMultiInspectionEdit: { ...action.value },
            };
    }
    return state;
};

export default purchaseOrderReducer;
