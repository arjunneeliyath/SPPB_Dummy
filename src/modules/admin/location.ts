import { AnyAction } from 'redux';
import { ILocationGetResponse } from '../../interfaces/admin/location/get-location';
import { ILocationAddRequest } from '../../interfaces/admin/location/add-location';
import { ILocationEditRequest } from '../../interfaces/admin/location/edit-location';
import { ILocationList } from '../../interfaces/admin/location/get-all-location';

export const GET_LOCATION_SUCCESS_ACTION = 'GET_LOCATION_SUCCESS_ACTION';
export const GET_ALL_LOCATION_SUCCESS_ACTION = 'GET_ALL_LOCATION_SUCCESS_ACTION';
export const GET_LOCATION_LIST = 'GET_LOCATION_LIST';
export const ADD_LOCATION = 'ADD_LOCATION ';
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const GET_ALL_LOCATION = 'GET_ALL_LOCATION';

export const getLocation = (value: number) => ({
    type: GET_LOCATION_LIST,
    value,
});

export const getAllLocationList = () => ({
    type: GET_ALL_LOCATION,
});

export const getLocationSuccessAction = (value: ILocationGetResponse) => ({
    type: GET_LOCATION_SUCCESS_ACTION,
    value,
});

export const getAllLocationListSuccessAction = (value: ILocationList[]) => ({
    type: GET_ALL_LOCATION_SUCCESS_ACTION,
    value,
});

export const addLocation = (value: ILocationAddRequest) => ({
    type: ADD_LOCATION,
    value,
});

export const editLocation = (value: ILocationEditRequest) => ({
    type: EDIT_LOCATION,
    value,
});

export const deleteLocation = (value: number) => ({
    type: DELETE_LOCATION,
    value,
});

export const locationReducerInit = {
    locationDetails: [],
    locationData: {},
};

export interface ILocationReducer {
    locationData: ILocationGetResponse;
    locationDetails: ILocationList[];
}

const locationReducer = (state = locationReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_LOCATION_SUCCESS_ACTION:
            return {
                ...state,
                locationData: {
                    ...action.value,
                },
            };
        case GET_ALL_LOCATION_SUCCESS_ACTION:
            return {
                ...state,
                locationDetails: [...action.value],
            };
    }
    return state;
};

export default locationReducer;
