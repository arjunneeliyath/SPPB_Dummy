import {
    emailGroup,
    emailGroupMaintenanceResponse,
} from '../../../mocks/email-groups/email-group-maintenance/email-group-maintenance-mock';
import { mockPromise } from '../../../utils/mock-promise';
import axios from '../../../utils/interceptor';
import _ from 'lodash';
import { ISaveEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/save-email-group';

(window as any).isMockData = false;

export const getAllEmailGroupMaintenanceResponseAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/email-group`);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(emailGroupMaintenanceResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const getEmailGroupAPI = async (id: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/email-group/${id}`);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(emailGroup);
    }
};

export const saveEmailGroupAPI = async (value: ISaveEmailGroup): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/email-group`, value);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(emailGroupMaintenanceResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const updateEmailGroupAPI = async (value: ISaveEmailGroup): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/email-group/${id}`, value);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(emailGroupMaintenanceResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const copyEmailGroupAPI = async (value: ISaveEmailGroup): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = value;
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/email-group`, rest);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(emailGroupMaintenanceResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const deleteEmailGroupAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/email-group/${value}`);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(emailGroupMaintenanceResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};
