import { AnyAction } from 'redux';
import { IEditInspectionFormValues } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-inspection-values';
import { ISearchResultTable } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/search-result-table';
// eslint-disable-next-line max-len
import { IDeleteSearchResultTableRow } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/delete-search-result-table';

export const GET_SEARCH_RESULT_LIST_SUCCESS_ACTION = 'GET_SEARCH_RESULT_LIST_SUCCESS_ACTION';
export const GET_SEARCH_RESULT_LIST = 'GET_SEARCH_RESULT_LIST';
export const GET_ALL_DROPDOWN_OPTIONS = 'GET_ALL_DROPDOWN_OPTIONS';
export const GET_ALL_DROPDOWN_OPTIONS_SUCCESS = 'GET_ALL_DROPDOWN_OPTIONS_SUCCESS';
export const DELETE_SEARCH_RESULT_ROW = 'DELETE_SEARCH_RESULT_ROW';
export const GET_ALL_SEARCH_RESULT_LIST_SUCCESS_ACTION = 'GET_ALL_SEARCH_RESULT_LIST_SUCCESS_ACTION';

export const getAllDropdownList = () => ({
    type: GET_ALL_DROPDOWN_OPTIONS,
});

export const getAllDropdownSuccessAction = (value: string[]) => ({
    type: GET_ALL_DROPDOWN_OPTIONS_SUCCESS,
    value,
});

export const getSearchResultList = (value: IEditInspectionFormValues) => ({
    type: GET_SEARCH_RESULT_LIST,
    value,
});

export const getSearchResultListSuccess = (value: ISearchResultTable[]) => ({
    type: GET_SEARCH_RESULT_LIST_SUCCESS_ACTION,
    value,
});

export const getAllSearchResultSuccessAction = (value: ISearchResultTable[]) => ({
    type: GET_ALL_SEARCH_RESULT_LIST_SUCCESS_ACTION,
    value,
});

export const deleteSearchResultRow = (value: IDeleteSearchResultTableRow) => ({
    type: DELETE_SEARCH_RESULT_ROW,
    value,
});

const searchResultReducerInit = {
    searchResultList: [],
    dropDownOptions: [],
};

export interface ISearchResultReducer {
    searchResultList: ISearchResultTable[];
    dropDownOptions: string[];
}

const searchResultReducer = (state = searchResultReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_SEARCH_RESULT_LIST_SUCCESS_ACTION:
            return {
                ...state,
                searchResultList: [...action.value],
            };
        case GET_ALL_DROPDOWN_OPTIONS_SUCCESS:
            return {
                ...state,
                dropDownOptions: [...action.value],
            };
    }
    return state;
};

export default searchResultReducer;
