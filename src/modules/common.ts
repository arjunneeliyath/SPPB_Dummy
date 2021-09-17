import { AnyAction } from 'redux';

export const UPDATE_PENDING_API = 'UPDATE_PENDING_API';
export const UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB';

export const updatePendingAPIAction = (value: number) => ({
    type: UPDATE_PENDING_API,
    value,
});
export const updateActiveTabAction = (value?: number) => ({
    type: UPDATE_ACTIVE_TAB,
    value,
});

export interface ICommonReducer {
    pendingAPICount: number;
    activeTab: number;
}

export const commonReducerInit = {
    pendingAPICount: 0,
    activeTab: undefined,
};

export const commonReducer = (state = commonReducerInit, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_PENDING_API:
            return {
                ...state,
                pendingAPICount: state.pendingAPICount + action.value,
            };
        case UPDATE_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.value,
            };
    }
    return state;
};
