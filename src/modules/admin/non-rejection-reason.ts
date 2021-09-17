import { AnyAction } from 'redux';
import {
    INonRejectionReasonGetResponse,
    INonRejectionReasonGetRequest,
} from '../../interfaces/admin/non-rejection-reason/get-non-rejection-reason';
import { INonRejectionReasonAddRequest } from '../../interfaces/admin/non-rejection-reason/add-non-rejection-reason';
import { INonRejectionReasonEditRequest } from '../../interfaces/admin/non-rejection-reason/edit-non-rejection-reason';
import { INonRejectionReasonList } from '../../interfaces/admin/non-rejection-reason/get-all-non-rejection-reason';

export const GET_NON_REJECTION_SUCCESS_ACTION = 'GET_NON_REJECTION_SUCCESS_ACTION';
export const GET_ALL_NON_REJECTION_SUCCESS_ACTION = 'GET_ALL_NON_REJECTION_SUCCESS_ACTION';
export const GET_NON_REJECTION_LIST = 'GET_NON_REJECTION_LIST';
export const ADD_NON_REJECTION_REASON = 'ADD_NON_REJECTION_REASON';
export const EDIT_NON_REJECTION_REASON = ' EDIT_NON_REJECTION_REASON';
export const DELETE_NON_REJECTION_REASON = ' DELETE_NON_REJECTION_REASON';
export const GET_ALL_NON_REJECTION_REASON = 'GET_ALL_NON_REJECTION_REASON';

export const getNonRejectionListAction = (value: INonRejectionReasonGetRequest) => ({
    type: GET_NON_REJECTION_LIST,
    value,
});

export const getAllNonRejectionList = () => ({
    type: GET_ALL_NON_REJECTION_REASON,
});

export const getNonRejectionListSuccessAction = (value: INonRejectionReasonGetResponse) => ({
    type: GET_NON_REJECTION_SUCCESS_ACTION,
    value,
});

export const getAllNonRejectionListSuccessAction = (value: INonRejectionReasonList[]) => ({
    type: GET_ALL_NON_REJECTION_SUCCESS_ACTION,
    value,
});

export const addNonRejectionReason = (value: INonRejectionReasonAddRequest) => ({
    type: ADD_NON_REJECTION_REASON,
    value,
});

export const editNonRejectionReason = (value: INonRejectionReasonEditRequest) => ({
    type: EDIT_NON_REJECTION_REASON,
    value,
});

export const deleteNonRejectionReason = (value: number) => ({
    type: DELETE_NON_REJECTION_REASON,
    value,
});

const nonRejectionReducerInit = {
    nonRejectionReasonDetails: [],
};

export interface INonRejectionReasonReducer {
    nonRejectionReasonData: INonRejectionReasonGetResponse;
    nonRejectionReasonDetails: INonRejectionReasonList[];
}

const nonRejectionReasonReducer = (state = nonRejectionReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_NON_REJECTION_SUCCESS_ACTION:
            return {
                ...state,
                nonRejectionReasonData: {
                    ...action.value,
                },
            };
        case GET_ALL_NON_REJECTION_SUCCESS_ACTION:
            return {
                ...state,
                nonRejectionReasonDetails: [...action.value],
            };
    }
    return state;
};

export default nonRejectionReasonReducer;
