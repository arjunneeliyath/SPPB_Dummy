import { AnyAction } from 'redux';
import { IPreferenceDropdown, IPreferenceApply } from '../../interfaces/home/preference-dropdown';

export const GET_ALL_PREFERENCE_DROPDOWN_OPTIONS = 'GET_ALL_PREFERENCE_DROPDOWN_OPTIONS';
export const GET_ALL_PREFERENCE_DROPDOWN_OPTIONS_SUCCESS = 'GET_ALL_PREFERENCE_DROPDOWN_OPTIONS_SUCCESS';
export const GET_APPLY_PREFERENCE_DROPDOWN = 'GET_APPLY_PREFERENCE_DROPDOWN';
export const GET_APPLY_PREFERENCE_DROPDOWN_LIST_SUCCESS = 'GET_APPLY_PREFERENCE_DROPDOWN_LIST_SUCCESS';
export const CLEAR_PREFERENCE_SAVED = 'CLEAR_PREFERENCE_SAVED';

export const addApplyPreferenceDropdownList = (value: IPreferenceApply) => ({
    type: GET_APPLY_PREFERENCE_DROPDOWN,
    value,
});

export const clearPreferenceSaved = (value: boolean) => ({
    type: CLEAR_PREFERENCE_SAVED,
    value,
});

export const getAllPreferenceDropdownList = () => ({
    type: GET_ALL_PREFERENCE_DROPDOWN_OPTIONS,
});

export const getAllPreferenceDropdownSuccess = (value: IPreferenceDropdown[]) => ({
    type: GET_ALL_PREFERENCE_DROPDOWN_OPTIONS_SUCCESS,
    value,
});

export const applyPreferenceDropdownListSuccess = (value: boolean) => ({
    type: GET_APPLY_PREFERENCE_DROPDOWN_LIST_SUCCESS,
    value,
});

const homeReducerInit = {
    preferenceDropDownOptions: [],
    preferenceSaved: false,
};

export interface IHomeReducer {
    preferenceDropDownOptions: IPreferenceDropdown[];
    preferenceSaved: boolean;
}

const homeReducer = (state = homeReducerInit, action: AnyAction) => {
    switch (action.type) {
        case GET_ALL_PREFERENCE_DROPDOWN_OPTIONS_SUCCESS:
            return {
                ...state,
                preferenceDropDownOptions: [...action.value],
            };
        case GET_APPLY_PREFERENCE_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                preferenceSaved: action.value,
            };
        case CLEAR_PREFERENCE_SAVED:
            return {
                ...state,
                preferenceSaved: action.value,
            };
    }
    return state;
};

export default homeReducer;
