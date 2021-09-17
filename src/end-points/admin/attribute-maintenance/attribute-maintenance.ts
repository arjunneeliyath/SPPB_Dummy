import axios from '../../../utils/interceptor';
import { dataTypeResponse } from '../../../mocks/admin/attribute-maintenance/datatype-view-mock';
import { attributeResponse } from '../../../mocks/admin/attribute-maintenance/attribute-maintenance-mock';
import { IAttributeMaintenanceEditRequest } from '../../../interfaces/admin/attribute-maintenance/attribute-list/edit-attribute';
import { mockPromise } from '../../../utils/mock-promise';
import _ from 'lodash';

export const getAllAttributesAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/attribute`);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const sortedValue = _.sortBy(attributeResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const editAttributeAPI = async (value: IAttributeMaintenanceEditRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/attribute/${id}`, rest);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        for (const i in attributeResponse) {
            if (attributeResponse[i].id == value.id) {
                attributeResponse[i].name = value.name || attributeResponse[i].name;
                attributeResponse[i].description = value.description || attributeResponse[i].description;
                attributeResponse[i].attrType = value.attrType || attributeResponse[i].attrType;
                attributeResponse[i].attrRecordType = value.attrRecordType || attributeResponse[i].attrRecordType;
                attributeResponse[i].itemType = value.itemType || attributeResponse[i].itemType;
                attributeResponse[i].itemMock = value.itemMock || attributeResponse[i].itemMock;
                attributeResponse[i].dataType = value.dataType || attributeResponse[i].dataType;
                break;
            }
        }
        return mockPromise(attributeResponse);
    }
};
export const getDataTypeViewAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/attribute/${value}`);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    } else {
        const modifiedData = dataTypeResponse.find((x) => x.id === value);
        return mockPromise(modifiedData);
    }
};
