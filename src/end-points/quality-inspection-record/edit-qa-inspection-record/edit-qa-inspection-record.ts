import { searchResultList } from '../../../mocks/quality-inspection-record/edit-qa-inspection-record/search-result-table';
import { mockPromise } from '../../../utils/mock-promise';
import axios from '../../../utils/interceptor';
import { IEditInspectionFormValues } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-inspection-values';
import { OPTIONS } from '../../../mocks/quality-inspection-record/edit-qa-inspection-record/dropdown-option';
(window as any).isMockData = false;

export const getSearchResultListAPI = async (value: IEditInspectionFormValues): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const processEnv = process.env.REACT_APP_SAMPLE_API_DOMAIN;
            const cic = value.itemCic;
            const vendorName = value.vendorName;
            const vendorNumber = value.vendorNumber;
            const foreignPo = value.po;
            const recordDate = value.date;
            const section = value.section;
            const showOverturned = value.showOverTurnedRecords;
            const showDeletedRecords = value.showDeletedRecords;
            const url = `${processEnv}/inspection-record/
            search?cic=${cic}&foreignPoNum=${foreignPo}
            &groupCode=${section}&recordDateTxt=${recordDate}
            &showDeleted=${showDeletedRecords}&showOverturned=${showOverturned}
            &vendorName=${vendorName}&vendorNum=${vendorNumber}`;
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(searchResultList);
    }
};

export const getDropdownOptionsAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const processEnv = process.env.REACT_APP_SAMPLE_API_DOMAIN;

            const url = `${processEnv}/inspection-record/`;
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(OPTIONS);
    }
};

export const deleteSearchResultRowAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/search-result-row/${value}`
            );
            return response;
        } catch (error) {
            // throw new Error(error);
            throw error.response.data;
        }
    }
};

export const getSearchResultAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/search-result`);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            //throw new Error(error);
            throw error.response.data;
        }
    } else {
        return mockPromise(searchResultList);
    }
};
