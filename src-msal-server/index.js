/* eslint-disable */
const express = require('express');
const msal = require('@azure/msal-node');
const AlbertsonsMsal = require('@albertsons-authn/abs-node-authn');
const client = require('./proxyclient');

var cookieParser = require('cookie-parser');
var path = require('path');
// require('custom-env').env();
require('custom-env').env('local');

const SERVER_PORT = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());
// eslint-disable-next-line no-console
console.log('App configured with client id : ' + process.env.CLIENT_ID);

// Azure AD application configuration
const config = {
    scopes: ['openid', process.env.RESOURCE_SCOPE],
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: process.env.AUTHORITY,
        knownAuthorities: [process.env.AUTHORITY],
        clientSecret: process.env.CLIENT_SECRET,
        validateAuthority: false,
        redirectUri: process.env.REDIRECT_URI,
        postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
    },
    system: {
        networkClient: client,
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                // eslint-disable-next-line no-console
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        },
    },
};

AlbertsonsMsal.msalInitialize(config);

app.get('/loginError', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/authenticate', (req, res) => {
    // eslint-disable-next-line no-console
    console.log('authenticate called token  in browser');
    AlbertsonsMsal.msalCheckAuthStatus(res, req.cookies, function (authResult) {
        res.redirect(process.env.BASE_URL);
    });
});

app.get('/exchange', (req, res) => {
    AlbertsonsMsal.msalExchangeCodeForToken(req, res, function () {
        res.redirect(process.env.BASE_URL);
    });
});

app.get('/logout', (req, res) => {
    AlbertsonsMsal.msalLogout(req, res);
});

// eslint-disable-next-line no-console
app.listen(SERVER_PORT, () => console.log(`SDOVM-MSAL-SERVER: listening on port ${SERVER_PORT}!`));
