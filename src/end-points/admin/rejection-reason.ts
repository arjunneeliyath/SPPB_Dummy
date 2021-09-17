import axios from '../../utils/interceptor';
import { mockPromise } from '../../utils/mock-promise';
import { rejectionReasonsResponse } from '../../mocks/admin/rejectable-reason-mock';
import { IRejectionReasonAddRequest } from '../../interfaces/admin/rejection-reason/add-rejection-reason';
import { IRejectionReasonEditRequest } from '../../interfaces/admin/rejection-reason/edit-rejection-reason';
import { IRejectionReasonGetRequest } from '../../interfaces/admin/rejection-reason/get-rejection-reason';
import _ from 'lodash';

(window as any).isMockData = false;

export const getRejectionReasonAPI = async (value: IRejectionReasonGetRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/rejection-reason/${value.id}`);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const result = rejectionReasonsResponse.find(({ id }) => id === value.id);
        return mockPromise(result);
    }
};

export const addRejectionReasonAPI = async (request: IRejectionReasonAddRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/rejection-reason`, request);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const idToAdd = rejectionReasonsResponse.length + 1;
        const addRejection = {
            id: idToAdd,
            reasonName: request.reasonName || '',
            reasonDesc: request.reasonDesc || '',
            itemTypeInd: request.itemTypeInd || '',
        };
        rejectionReasonsResponse.push(addRejection);
        return mockPromise(rejectionReasonsResponse);
    }
};

export const editRejectionReasonAPI = async (value: IRejectionReasonEditRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/rejection-reason/${id}`, rest);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        for (const i in rejectionReasonsResponse) {
            if (rejectionReasonsResponse[i].id == value.id) {
                rejectionReasonsResponse[i].reasonName = value.reasonName || rejectionReasonsResponse[i].reasonName;
                rejectionReasonsResponse[i].reasonDesc = value.reasonDesc || rejectionReasonsResponse[i].reasonDesc;
                rejectionReasonsResponse[i].itemTypeInd = value.itemTypeInd || rejectionReasonsResponse[i].itemTypeInd;
                break;
            }
        }
        return mockPromise(rejectionReasonsResponse);
    }
};

export const deleteRejectionReasonAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/rejection-reason/${value}`);
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        rejectionReasonsResponse.splice(
            rejectionReasonsResponse.findIndex((a) => a.id === value),
            1
        );
        return mockPromise(rejectionReasonsResponse);
    }
};

export const getRejectionReasonsAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/rejection-reason`);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            // throw new Error(error);
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(rejectionReasonsResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};
