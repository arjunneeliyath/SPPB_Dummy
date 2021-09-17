import { AnyAction } from 'redux';
import { IData, IStatusResponse } from '../interfaces/statusResponse';

export const GET_STATUS = 'GET_STATUS';
export const GET_STATUS_SUCCESS_ACTION = 'GET_STATUS_SUCCESS_ACTION';
export const POST_DATA = 'POST_DATA';
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';

export const getStatusAction = () => ({
    type: GET_STATUS,
});

export const postDataAction = () => ({
    type: POST_DATA,
});

export const getStatusSuccessAction = (value: IStatusResponse) => ({
    type: GET_STATUS_SUCCESS_ACTION,
    value,
});

export const postDataSuccessAction = (value: IData) => ({
    type: POST_DATA_SUCCESS,
    value,
});

export interface IStatusReducer {
    statusData: IStatusResponse;
    data: IData;
}

const statusReducerInit = {
    version: 'Nil',
    apiStatus: 'Nil',
};

const dataReceived = {
    message: 'Nil',
};

const statusReducer = (state = { statusData: statusReducerInit, data: dataReceived }, action: AnyAction) => {
    switch (action.type) {
        case GET_STATUS_SUCCESS_ACTION:
            return {
                ...state,
                statusData: {
                    ...action.value,
                },
            };
        case POST_DATA_SUCCESS:
            return {
                ...state,
                data: {
                    ...action.value,
                },
            };
    }
    return state;
};

export default statusReducer;
