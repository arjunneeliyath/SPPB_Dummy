import { ccMailAddress } from '../../../mocks/email-groups/cc-list-maintenance/cc-list-maintenance';
import { mockPromise } from '../../../utils/mock-promise';
import axios from '../../../utils/interceptor';
import _ from 'lodash';
import { ICcListMailMaintenance } from '../../../interfaces/email-groups/cc-list-maintenance/cc-list-maintenance';

(window as any).isMockData = false;

export const getAllCcMailAddressResponseAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/cclist`);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            throw new Error(error);
        }
    } else {
        const sortedValue = _.sortBy(ccMailAddress, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const updateCcMailAddressAPI = async (value: ICcListMailMaintenance[]): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/cclist`, value);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            throw new Error(error);
        }
    } else {
        return mockPromise(ccMailAddress);
    }
};
