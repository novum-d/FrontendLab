import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate, redirect } from "react-router-dom";

export const Auth0ProviderWithHistory = ({ children }) => {

    const redirect = useNavigate();

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    const onRedirectCallback = (appState) => {
        redirect(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={redirectUri}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};