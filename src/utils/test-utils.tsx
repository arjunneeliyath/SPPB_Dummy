import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Router } from 'react-router';
import '@testing-library/jest-dom/extend-expect';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../constants/theme';

import { createMemoryHistory } from 'history';
import statusReducer from '../modules/status';
import { commonReducer } from '../modules/common';
import locationReducer from '../modules/admin/location';

const history = createMemoryHistory();

const customRender = (ui: any, { initialState, ...renderOptions }: any = {}) => {
    const store = createStore(
        combineReducers({
            status: statusReducer,
            common: commonReducer,
            location: locationReducer,
        }),
        initialState
    );
    const AllTheProviders = ({ children }: any) => {
        return (
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>{children}</Provider>
                </ThemeProvider>
            </Router>
        );
    };
    return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
