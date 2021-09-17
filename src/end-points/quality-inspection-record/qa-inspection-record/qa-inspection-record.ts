import {
    purchaseOrder,
    doneWithSelection,
    purchaseOrderList,
} from '../../../mocks/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import { mockPromise } from '../../../utils/mock-promise';
import axios from '../../../utils/interceptor';
import { IQaInspectionFormValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/qa-inspection-form-values';
import { IDoneWithSelectionRequest } from '../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection-request';
import { formFields } from '../../../mocks/quality-inspection-record/edit-qa-inspection-record/edit-multi-inspection';
import { IMultiInspectionEdit } from '../../../interfaces/quality-inspection-record/qa-inspection-record/form-field-values';
(window as any).isMockData = false;

export const getPurchaseOrderResponseAPI = async (value: IQaInspectionFormValues): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/quality-inspection/po/search?foreignPoNum=${value.po}
                &itemType=${value.section}
                &foreignPo=${value.foreignPo}`
            );
            return response;
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return mockPromise(purchaseOrder);
    }
};

export const getPurchaseOrderListAPI = async (value: IQaInspectionFormValues): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const processEnv = process.env.REACT_APP_SAMPLE_API_DOMAIN;
            const from = value.fromDate;
            const to = value.toDate;
            const sec = value.section;
            const url = `${processEnv}/quality-inspection/po/search?dateFromText=${from}&dateToText=${to}&itemType=${sec}`;
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(purchaseOrderList);
    }
};

export const getDoneWithSelectionListAPI = async (value: IDoneWithSelectionRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const processEnv = process.env.REACT_APP_SAMPLE_API_DOMAIN;
            const url = `${processEnv}/inspection-record/form-fields?itemType=${value.itemType}&inspectionType=${value.inspectionType}`;
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(doneWithSelection);
    }
};

export const saveQaInspectionRecordAPI = async (value: FormData): Promise<any> => {
    if (!(window as any).isMockData) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/inspection-record`,
                value,
                config
            );
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        return mockPromise(doneWithSelection);
    }
};

export const getMultiInspectionEditAPI = async (value: IMultiInspectionEdit): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}
                /inspection-record?recordId=${value.id}&poNum=${value.poNum}&groupCode=${value.itemTypeTxt}`
            );
            return response;
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return mockPromise(formFields);
    }
};
