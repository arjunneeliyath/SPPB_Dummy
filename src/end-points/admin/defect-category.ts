import { defectCategoryResponse, defectCategoryDetails, defectCategoryArray } from '../../mocks/admin/defect-category';
import { mockPromise } from '../../utils/mock-promise';
import { IUpdateDefectCategoryRequest } from '../../interfaces/admin/defect-category/edit-defect-category';
import axios from '../../utils/interceptor';
import _ from 'lodash';
import { IDeleteDefectValues } from '../../interfaces/admin/defect-category/delete-defect';
import { ISaveDefectCategoryRequest } from '../../interfaces/admin/defect-category/save-defect-category';

(window as any).isMockData = true;

export const getDefectCategoryAPI = async (): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/defect-category`);
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            throw new Error(error);
        }
    } else {
        const sortedValue = _.sortBy(defectCategoryResponse, 'id').reverse();
        return mockPromise(sortedValue);
    }
};

export const getDefectCategoryDetailsAPI = async (categoryId: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/defect-category/${categoryId}`
            );
            return response;
        } catch (error) {
            //TODO: Rectify Error Handling
            throw new Error(error);
        }
    } else {
        return mockPromise(defectCategoryArray.find((x) => x.id === categoryId));
    }
};

export const editDefectCategoryDetailsAPI = async (value: IUpdateDefectCategoryRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const { id, ...rest } = value;
            const response = await axios.put(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/defect-category/${id}`, rest);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        return mockPromise(defectCategoryDetails);
    }
};

export const deleteDefectCategoryAPI = async (value: number): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/defect-category/${value}`);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        defectCategoryResponse.splice(
            defectCategoryResponse.findIndex((a) => a.id === value),
            1
        );
        return mockPromise(defectCategoryResponse);
    }
};

export const deleteDefectAPI = async (value: IDeleteDefectValues): Promise<any> => {
    const { categoryId, selectedRowId } = value;
    if (!(window as any).isMockData) {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_SAMPLE_API_DOMAIN}/defect-category/${categoryId}/defect/${selectedRowId}`
            );
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        const category = { ...defectCategoryDetails };
        let defectObject = defectCategoryDetails;
        const newArray = category.defects.filter((row) => row.id !== selectedRowId);
        defectObject = { ...defectCategoryDetails, defects: newArray };
        return mockPromise(defectObject);
    }
};

export const createDefectCategoryAPI = async (request: ISaveDefectCategoryRequest): Promise<any> => {
    if (!(window as any).isMockData) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/defect-category`, request);
            return response;
        } catch (error) {
            // throw new Error(handleError(error));
            throw error.response.data;
        }
    } else {
        return mockPromise(defectCategoryDetails);
    }
};
