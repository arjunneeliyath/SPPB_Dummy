import { AnyAction } from 'redux';
import { IGetDefectCategory } from '../../interfaces/admin/defect-category/get-defect-category';
import { IDefectList } from '../../interfaces/admin/defect-category/get-all-defect-category';
import { IUpdateDefectCategoryRequest } from '../../interfaces/admin/defect-category/edit-defect-category';
import { IDeleteDefectValues } from '../../interfaces/admin/defect-category/delete-defect';
import { ISaveDefectCategoryRequest } from '../../interfaces/admin/defect-category/save-defect-category';

export const GET_ALL_DEFECT_CATEGORY_SUCCESS_ACTION = 'GET_ALL_DEFECT_CATEGORY_SUCCESS_ACTION';
export const GET_DEFECT_CATEGORY_DETAILS_SUCCESS_ACTION = 'GET_DEFECT_CATEGORY_DETAILS_SUCCESS_ACTION';
export const GET_DEFECT_CATEGORY_DETAILS = 'GET_DEFECT_CATEGORY_DETAILS ';
export const GET_ALL_DEFECT_CATEGORY = 'GET_ALL_DEFECT_CATEGORY';
export const EDIT_DEFECT_CATEGORY = 'EDIT_DEFECT_CATEGORY';
export const DELETE_DEFECT_CATEGORY = 'DELETE_DEFECT_CATEGORY';
export const DELETE_DEFECT = 'DELETE_DEFECT';
export const CREATE_DEFECT_CATEGORY = 'CREATE_DEFECT_CATEGORY';

export const getDefectCategoryDetails = (value: number) => ({
    type: GET_DEFECT_CATEGORY_DETAILS,
    value,
});

export const getAllDefectList = () => ({
    type: GET_ALL_DEFECT_CATEGORY,
});

export const getDefectCatergoryDetailsSuccessAction = (value: IGetDefectCategory) => ({
    type: GET_DEFECT_CATEGORY_DETAILS_SUCCESS_ACTION,
    value,
});

export const getAllDefectListSuccessAction = (value: IDefectList[]) => ({
    type: GET_ALL_DEFECT_CATEGORY_SUCCESS_ACTION,
    value,
});

export const editDefectCategoryDetails = (value: IUpdateDefectCategoryRequest) => ({
    type: EDIT_DEFECT_CATEGORY,
    value,
});
export const deleteDefectCategory = (value: number) => ({
    type: DELETE_DEFECT_CATEGORY,
    value,
});

export const deleteDefect = (value: IDeleteDefectValues) => ({
    type: DELETE_DEFECT,
    value,
});

export const createDefectCategory = (value: ISaveDefectCategoryRequest) => ({
    type: CREATE_DEFECT_CATEGORY,
    value,
});

const defectCategoryReducerInit = {
    defectCategoryDetails: {},
    defectCategoryList: [],
};

export interface IDefectReducer {
    defectCategoryDetails: IGetDefectCategory;
    defectCategoryList: IDefectList[];
}

const defectCategoryReducer = (state = defectCategoryReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_DEFECT_CATEGORY_DETAILS_SUCCESS_ACTION:
            return {
                ...state,
                defectCategoryDetails: {
                    ...action.value,
                },
            };
        case GET_ALL_DEFECT_CATEGORY_SUCCESS_ACTION:
            return {
                ...state,
                defectCategoryList: [...action.value],
            };
    }
    return state;
};

export default defectCategoryReducer;
