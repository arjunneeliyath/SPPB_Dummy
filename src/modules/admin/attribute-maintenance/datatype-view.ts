import { AnyAction } from 'redux';
import { IDataType } from '../../../interfaces/admin/attribute-maintenance/attribute-list/get-datatype';

export const GET_DATA_TYPE = 'GET_DATA_TYPE ';
export const GET_DATA_TYPE_SUCCESS_ACTION = 'GET_DATA_TYPE_SUCCESS_ACTION';

export const getDataType = (value: number) => ({
    type: GET_DATA_TYPE,
    value,
});

const dataTypeReducerInit = {
    dataTypeData: {},
};

export interface IDataTypeReducer {
    dataTypeData: IDataType;
}
export const getDataTypeSuccessAction = (value: IDataType) => ({
    type: GET_DATA_TYPE_SUCCESS_ACTION,
    value,
});

const dataTypeReducer = (state = dataTypeReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_DATA_TYPE_SUCCESS_ACTION:
            return {
                ...state,
                dataTypeData: {
                    ...action.value,
                },
            };
    }
    return state;
};

export default dataTypeReducer;
