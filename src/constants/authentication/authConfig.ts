import { Configuration, PopupRequest } from '@azure/msal-browser';

// Config object to be passed to MSal on creation
let authValue = {
    clientId: '',
    authority: '',
    redirectUri: '',
};

if (process?.env?.REACT_APP_CLIENT_ID && process?.env?.REACT_APP_TENANT_ID && process?.env?.REACT_APP_REDIRECT_URI)
    authValue = {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
        redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    };

export const msalConfig: Configuration = {
    auth: authValue,
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
};

// Coordinates and required scopes for your web API
export const apiConfig = {
    resourceScopes: ['api://6a73f5d5-1cad-4c72-8d5b-fc996e3603d9/User.Read'],
};

// Scopes for access token used at MS-Identity-Platform-endpoints
export const loginRequest: PopupRequest = {
    scopes: ['openid', 'profile', 'offline_access', ...apiConfig.resourceScopes],
};
