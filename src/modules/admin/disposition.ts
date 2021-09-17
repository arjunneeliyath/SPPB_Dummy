import { AnyAction } from 'redux';
import { IDispositionGetResponse } from '../../interfaces/admin/disposition/get-disposition';
import { IDispositionAddRequest } from '../../interfaces/admin/disposition/add-disposition';
import { IDispositionEditRequest } from '../../interfaces/admin/disposition/edit-dispostion';
import { IDispositionList } from '../../interfaces/admin/disposition/get-all-disposition';

export const GET_DISPOSITION_SUCCESS_ACTION = 'GET_DISPOSITION_SUCCESS_ACTION';
export const GET_ALL_DISPOSITION_SUCCESS_ACTION = 'GET_ALL_DISPOSITION_SUCCESS_ACTION';
export const GET_DISPOSITION_LIST = 'GET_DISPOSITION_LIST ';
export const ADD_DISPOSITION = 'ADD_DISPOSITION';
export const EDIT_DISPOSITION = 'EDIT_DISPOSITION ';
export const DELETE_DISPOSITION = 'DELETE_DISPOSITION';
export const GET_ALL_DISPOSITION = 'GET_ALL_DISPOSITION';

export const getDisposition = (value: number) => ({
    type: GET_DISPOSITION_LIST,
    value,
});

export const getAllDispositionList = () => ({
    type: GET_ALL_DISPOSITION,
});

export const getDispositionSuccessAction = (value: IDispositionGetResponse) => ({
    type: GET_DISPOSITION_SUCCESS_ACTION,
    value,
});

export const getAllDispositionListSuccessAction = (value: IDispositionList[]) => ({
    type: GET_ALL_DISPOSITION_SUCCESS_ACTION,
    value,
});

export const addDisposition = (value: IDispositionAddRequest) => ({
    type: ADD_DISPOSITION,
    value,
});

export const editDisposition = (value: IDispositionEditRequest) => ({
    type: EDIT_DISPOSITION,
    value,
});

export const deleteDisposition = (value: number) => ({
    type: DELETE_DISPOSITION,
    value,
});

const dispositionReducerInit = {
    dispositionData: {},
    dispositionDetails: [],
};

export interface IDispositionReducer {
    dispositionData: IDispositionGetResponse;
    dispositionDetails: IDispositionList[];
}

const dispositionReducer = (state = dispositionReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_DISPOSITION_SUCCESS_ACTION:
            return {
                ...state,
                dispositionData: {
                    ...action.value,
                },
            };
        case GET_ALL_DISPOSITION_SUCCESS_ACTION:
            return {
                ...state,
                dispositionDetails: [...action.value],
            };
    }
    return state;
};

export default dispositionReducer;
