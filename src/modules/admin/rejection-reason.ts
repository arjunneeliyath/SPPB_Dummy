import { AnyAction } from 'redux';
import {
    IRejectionReasonGetResponse,
    IRejectionReasonGetRequest,
} from '../../interfaces/admin/rejection-reason/get-rejection-reason';
import { IRejectionReasonAddRequest } from '../../interfaces/admin/rejection-reason/add-rejection-reason';
import { IRejectionReasonEditRequest } from '../../interfaces/admin/rejection-reason/edit-rejection-reason';
import { IRejectionReason } from '../../interfaces/admin/rejection-reason/get-all-rejection-reason';

export const GET_REJECTION_SUCCESS_ACTION = 'GET_REJECTION_SUCCESS_ACTION';
export const GET_ALL_REJECTION_SUCCESS_ACTION = 'GET_ALL_REJECTION_SUCCESS_ACTION';
export const GET_REJECTION_LIST = 'GET_REJECTION_LIST';
export const ADD_REJECTION_REASON = 'ADD_REJECTION_REASON';
export const EDIT_REJECTION_REASON = ' EDIT_REJECTION_REASON';
export const DELETE_REJECTION_REASON = ' DELETE_REJECTION_REASON';
export const GET_ALL_REJECTION_REASON = 'GET_ALL_REJECTION_REASON';

export const getRejectionListAction = (value: IRejectionReasonGetRequest) => ({
    type: GET_REJECTION_LIST,
    value,
});

export const getAllRejectionList = () => ({
    type: GET_ALL_REJECTION_REASON,
});

export const getRejectionListSuccessAction = (value: IRejectionReasonGetResponse) => ({
    type: GET_REJECTION_SUCCESS_ACTION,
    value,
});

export const getAllRejectionListSuccessAction = (value: IRejectionReason[]) => ({
    type: GET_ALL_REJECTION_SUCCESS_ACTION,
    value,
});

export const addRejectionReason = (value: IRejectionReasonAddRequest) => ({
    type: ADD_REJECTION_REASON,
    value,
});

export const editRejectionReason = (value: IRejectionReasonEditRequest) => ({
    type: EDIT_REJECTION_REASON,
    value,
});

export const deleteRejectionReason = (value: number) => ({
    type: DELETE_REJECTION_REASON,
    value,
});

const RejectionReducerInit = {
    rejectionReasonDetails: [],
};

export interface IRejectionReasonReducer {
    rejectionReasonData: IRejectionReasonGetResponse;
    rejectionReasonDetails: IRejectionReason[];
}

const RejectionReasonReducer = (state = RejectionReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_REJECTION_SUCCESS_ACTION:
            return {
                ...state,
                rejectionReasonData: {
                    ...action.value,
                },
            };
        case GET_ALL_REJECTION_SUCCESS_ACTION:
            return {
                ...state,
                rejectionReasonDetails: [...action.value],
            };
    }
    return state;
};

export default RejectionReasonReducer;
