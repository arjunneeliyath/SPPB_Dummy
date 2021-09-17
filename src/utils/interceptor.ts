import axios, { AxiosRequestConfig } from 'axios';
import { updatePendingAPIAction } from '../modules/common';
import store from '../modules/store';
import { authProvider } from './authProvider';

const auth = authProvider();

const instance = axios.create({});

let isTestEnv = false;

export const setTestEnv = (value: boolean) => {
    isTestEnv = value;
};

// Add a request interceptor
instance.interceptors.request.use(async function (config: any): Promise<AxiosRequestConfig> {
    try {
        if (!isTestEnv) {
            const accessToken = auth.accessToken;
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                config.headers['userId'] = 'IRWO USER';
                config.headers['Access-Control-Allow-Credentials'] = true;
            }
            return config;
        } else {
            return config;
        }
    } catch (error) {
        //Handle Error
        return config;
    }
});

instance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
        store.dispatch(updatePendingAPIAction(-1));
        if (!error.response) {
            throw new Error(JSON.stringify({ message: error.message }));
        } else {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

export default instance;
