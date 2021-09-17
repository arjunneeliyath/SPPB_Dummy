import { AnyAction } from 'redux';
import { IDataTypeList } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/data-type-list';
import { ISaveDataTypeRequest } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/add-data-type';
import { IEditDataTypeRequest } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/update-data-type';

export const GET_ALL_DATA_TYPE_LIST = 'GET_ALL_DATA_TYPE_LIST';
export const GET_ALL_DATA_TYPE_LIST_SUCCESS_ACTION = 'GET_ALL_DATA_TYPE_LIST_SUCCESS_ACTION';
export const CREATE_DATA_TYPE = 'CREATE_DATA_TYPE';
export const EDIT_DATA_TYPE = 'EDIT_DATA_TYPE';
export const DELETE_DATA_TYPE = 'DELETE_DATA_TYPE';

export const getAllDataTypeList = () => ({
    type: GET_ALL_DATA_TYPE_LIST,
});

export const getAllDataTypeSuccessAction = (value: IDataTypeList[]) => ({
    type: GET_ALL_DATA_TYPE_LIST_SUCCESS_ACTION,
    value,
});

export const createDataType = (value: ISaveDataTypeRequest) => ({
    type: CREATE_DATA_TYPE,
    value,
});

export const editDataType = (value: IEditDataTypeRequest) => ({
    type: EDIT_DATA_TYPE,
    value,
});

export const deletedDataType = (value: number) => ({
    type: DELETE_DATA_TYPE,
    value,
});

const dataTypeReducerInit = {
    dataTypeList: [],
};

export interface IDataTypeListReducer {
    dataTypeList: IDataTypeList[];
}

const dataTypeListReducer = (state = dataTypeReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_DATA_TYPE_LIST_SUCCESS_ACTION:
            return {
                ...state,
                dataTypeList: [...action.value],
            };
    }
    return state;
};

export default dataTypeListReducer;
