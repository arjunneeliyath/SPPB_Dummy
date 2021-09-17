import { locationResponse } from '../../mocks/admin/location-mock';
import { ILocationAddRequest } from '../../interfaces/admin/location/add-location';
import { ILocationEditRequest } from '../../interfaces/admin/location/edit-location';
import { mockPromise } from '../../utils/mock-promise';
import axios from '../../utils/interceptor';
import _ from 'lodash';

(window as any).isMockData = false;

export const getLocationAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/location/${value}`);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const result = locationResponse.find(({ id }) => id === value);
        return mockPromise(result);
    }
};

export const addLocationAPI = async (request: ILocationAddRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/location`, request);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const idToAdd = locationResponse.length + 1;
        const addLocation = {
            id: idToAdd,
            locationName: request.locationName || '',
            locationDesc: request.locationDesc || '',
        };
        locationResponse.push(addLocation);
        return mockPromise(locationResponse);
    }
};

export const editLocationAPI = async (value: ILocationEditRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/location/${id}`, rest);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        for (const i in locationResponse) {
            if (locationResponse[i].id == value.id) {
                locationResponse[i].locationName = value.locationName || locationResponse[i].locationName;
                locationResponse[i].locationDesc = value.locationDesc || locationResponse[i].locationDesc;
                break;
            }
        }
        return mockPromise(locationResponse);
    }
};

export const deleteLocationAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/location/${value}`);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        locationResponse.splice(
            locationResponse.findIndex((a) => a.id === value),
            1
        );
        return mockPromise(locationResponse);
    }
};

export const getLocationsAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/location`, {});
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(locationResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};
