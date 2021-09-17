import { mockPromise } from '../../utils/mock-promise';
import axios from '../../utils/interceptor';
import { preferenceDropdownList } from '../../mocks/home/preference-dropdown';
import { IPreferenceApply } from '../../interfaces/home/preference-dropdown';
(window as any).isMockData = false;

export const getPreferenceDropdownOptionsAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const processEnv = process.env.REACT_APP_SAMPLE_API_DOMAIN;
            const url = `${processEnv}/inspection-record/prodwhlist`;
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(preferenceDropdownList);
    }
};

export const addPreferenceApplyAPI = async (value: IPreferenceApply): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const processEnv = process.env.REACT_APP_SAMPLE_API_DOMAIN;
            const userDiv = value.userDiv;
            const userId = value.userId;
            const url = `${processEnv}/inspection-record/updateDivision?userDiv=${userDiv}&userId=${userId}`;
            const response = await axios.post(url);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(preferenceDropdownList);
    }
};
