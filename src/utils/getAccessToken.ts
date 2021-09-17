import msalInstance from '../constants/authentication/authProvider';
import { loginRequest } from '../constants/authentication/authConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

export const getAccessToken = async () => {
    const accounts = await msalInstance.getAllAccounts();
    const username: string = accounts[0]?.username;
    const request = {
        scopes: ['Mail.Read'],
        loginHint: username, // For v1 endpoints, use upn from idToken claims
    };
    loginRequest.account = msalInstance.getAccountByUsername(username) ?? undefined;
    const token =
        (await msalInstance.acquireTokenSilent(loginRequest).catch(async (error) => {
            if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return await msalInstance.acquireTokenPopup(request).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log('Error: ', err);
                });
            }
        })) ?? undefined;
    if (token) return token?.accessToken;
    else return 'No Token Received';
};
