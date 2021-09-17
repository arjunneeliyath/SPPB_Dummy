import { dispositionResponse } from '../../mocks/admin/disposition-mock';
import { IDispositionAddRequest } from '../../interfaces/admin/disposition/add-disposition';
import { IDispositionEditRequest } from '../../interfaces/admin/disposition/edit-dispostion';
import { mockPromise } from '../../utils/mock-promise';
import axios from '../../utils/interceptor';
import _ from 'lodash';

(window as any).isMockData = false;

export const getDispositionAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/disposition/${value}`);
            return response;
        } catch (error) {
            //throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        const result = dispositionResponse.find(({ id }) => id === value);
        return mockPromise(result);
    }
};

export const addDispositionAPI = async (request: IDispositionAddRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/disposition`, request);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        const idToAdd = dispositionResponse.length + 1;
        const addDispostion = {
            id: idToAdd,
            name: request.name || '',
            desc: request.desc || '',
        };
        dispositionResponse.push(addDispostion);
        return mockPromise(dispositionResponse);
    }
};

export const editDispositionAPI = async (value: IDispositionEditRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/disposition/${id}`, rest);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        for (const i in dispositionResponse) {
            if (dispositionResponse[i].id == value.id) {
                dispositionResponse[i].name = value.name || dispositionResponse[i].name;
                dispositionResponse[i].desc = value.desc || dispositionResponse[i].desc;
                break;
            }
        }
        return mockPromise(dispositionResponse);
    }
};

export const deleteDispositionAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/disposition/${value}`);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        dispositionResponse.splice(
            dispositionResponse.findIndex((a) => a.id === value),
            1
        );
        return mockPromise(dispositionResponse);
    }
};

export const getDispositionsAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/disposition`);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            //throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(dispositionResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};
