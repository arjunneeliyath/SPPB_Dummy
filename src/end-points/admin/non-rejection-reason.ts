import { nonRejectionReasonsResponse } from '../../mocks/admin/non-rejection-reason-mock';
import { INonRejectionReasonAddRequest } from '../../interfaces/admin/non-rejection-reason/add-non-rejection-reason';
import { INonRejectionReasonEditRequest } from '../../interfaces/admin/non-rejection-reason/edit-non-rejection-reason';
import { INonRejectionReasonGetRequest } from '../../interfaces/admin/non-rejection-reason/get-non-rejection-reason';
import { mockPromise } from '../../utils/mock-promise';
import axios from '../../utils/interceptor';
import _ from 'lodash';

(window as any).isMockData = false;

export const getNonRejectionReasonAPI = async (value: INonRejectionReasonGetRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/non-rejection-reason/${value.id}`
            );
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const result = nonRejectionReasonsResponse.find(({ id }) => id === value.id);
        return mockPromise(result);
    }
};

export const addNonRejectionReasonAPI = async (request: INonRejectionReasonAddRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/non-rejection-reason`,
                request
            );
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const idToAdd = nonRejectionReasonsResponse.length + 1;
        const addNonRejection = {
            id: idToAdd,
            nonRejReasonName: request.nonRejReasonName || '',
            nonRejReasonDesc: request.nonRejReasonDesc || '',
            itemTypeInd: request.itemTypeInd || '',
        };
        nonRejectionReasonsResponse.push(addNonRejection);
        return mockPromise(nonRejectionReasonsResponse);
    }
};

export const editNonRejectionReasonAPI = async (value: INonRejectionReasonEditRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/non-rejection-reason/${id}`,
                rest
            );
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        for (const i in nonRejectionReasonsResponse) {
            if (nonRejectionReasonsResponse[i].id == value.id) {
                nonRejectionReasonsResponse[i].nonRejReasonName =
                    value.nonRejReasonName || nonRejectionReasonsResponse[i].nonRejReasonName;
                nonRejectionReasonsResponse[i].nonRejReasonDesc =
                    value.nonRejReasonDesc || nonRejectionReasonsResponse[i].nonRejReasonDesc;
                nonRejectionReasonsResponse[i].itemTypeInd =
                    value.itemTypeInd || nonRejectionReasonsResponse[i].itemTypeInd;
                break;
            }
        }
        return mockPromise(nonRejectionReasonsResponse);
    }
};

export const deleteNonRejectionReasonAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/non-rejection-reason/${value}`
            );
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        nonRejectionReasonsResponse.splice(
            nonRejectionReasonsResponse.findIndex((a) => a.id === value),
            1
        );
        return mockPromise(nonRejectionReasonsResponse);
    }
};

export const getNonRejectionReasonsAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/non-rejection-reason`);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            //throw new Error(error);
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(nonRejectionReasonsResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};
