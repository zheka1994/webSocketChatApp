import React from 'react';
import AppContainer from '../components/appContainer';
import LoginPage from './loginPage/loginPage';
import ChatPage from './chatPage/chatPage';
import OAuthRedirectPage from './oAuthRedirectPage/oAuthRedirectPage';

const routes = [
    {
        element: <AppContainer />,
        children: [
            {
                path: "/",
                element: <LoginPage />
            },
            {
                path: "/chat",
                element: <ChatPage />
            },
            {
                path: "/oauth-redirect",
                element: <OAuthRedirectPage />
            }
        ]
    }
];

export default routes;