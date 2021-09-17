import { dataTypeResponse } from '../../../mocks/admin/attribute-maintenance/datatype-view-mock';
import { ISaveDataTypeRequest } from '../../../interfaces/admin/attribute-maintenance/data-type-list/add-data-type';
import { IEditDataTypeRequest } from '../../../interfaces/admin/attribute-maintenance/data-type-list/update-data-type';
import { mockPromise } from '../../../utils/mock-promise';
import axios from '../../../utils/interceptor';
import _ from 'lodash';

export const getAllDataTypeAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/datatype`);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(dataTypeResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const createDataTypeAPI = async (request: ISaveDataTypeRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/datatype`, request);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const idToAdd = dataTypeResponse.length + 1;
        const addDataTypeResponse = {
            id: idToAdd,
            name: request.name || '',
            code: request.code || '',
            desc: request.desc || '',
            valueSetSW: '',
            valueSetList: request.valueSetList,
        };
        dataTypeResponse.push(addDataTypeResponse);
        const sortedValue = _.sortBy(dataTypeResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const editDataTypeAPI = async (value: IEditDataTypeRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/datatype/${id}`, rest);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(dataTypeResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const deleteDataTypeAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/datatype/${value}`);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        dataTypeResponse.splice(
            dataTypeResponse.findIndex((a) => a.id === value),
            1
        );
        return mockPromise(dataTypeResponse);
    }
};
