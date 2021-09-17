import jwt_decode from 'jwt-decode';
import { authentication } from '../config/authentication';

export const authProvider = () => {
    const cookies = document.cookie ? document.cookie.split(';') : null;
    let accessCookie = '';
    let idCookie = '';
    let accessToken: string | null;
    let decodedIdToken: any;
    let decodedAccessToken: any;
    if (cookies) {
        accessCookie = cookies[0].includes('ent-abs-auth') ? cookies[0] : cookies[1];
        idCookie = cookies[0].includes('ent-abs-itkn') ? cookies[0] : cookies[1];
    }

    accessToken = accessCookie !== '' ? accessCookie.split('=')[1] : null;
    const idCookieFields = idCookie !== '' ? idCookie.split('=') : null;

    accessToken = accessToken ? accessToken.split('%22')[3] : null;

    const idToken = idCookieFields ? idCookieFields[1] : null;

    try {
        decodedIdToken = typeof idToken === 'string' ? jwt_decode(idToken) : null;
        decodedAccessToken = typeof accessToken === 'string' ? jwt_decode(accessToken) : null;
    } catch (e) {
        decodedIdToken = null;
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace(`${authentication.baseUrl}/authenticate`);
    }
    const clearSession = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace(`${authentication.baseUrl}/authenticate`);
    };
    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace(`${authentication.baseUrl}/logout`);
    };
    return {
        accessToken: accessToken,
        idToken: idToken,
        decodedIdToken: decodedIdToken ? decodedIdToken : null,
        decodedAccessToken: decodedAccessToken ? decodedAccessToken : null,
        name: decodedIdToken ? decodedIdToken.name : null,
        clearSession: clearSession,
        logout: logout,
    };
};
