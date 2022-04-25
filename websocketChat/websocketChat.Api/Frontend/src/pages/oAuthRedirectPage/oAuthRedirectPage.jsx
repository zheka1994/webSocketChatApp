import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiMethods from "../../core/api/apiMethods";
import { buildOAuthRequest } from './business/apiRequestBuilder';

export default function OAuthRedirectPage() {
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            const api = new ApiMethods();
            const result = await api.vkOAuth(buildOAuthRequest());
            console.log(result);
            navigate('/chat');
        }
        catch (ex) {
            console.log(ex);
            navigate('/');
        }
    }, []);
    
    return (
        <div className="preloader">
            <div className="preloader__container">
                <div className="preloader__wrap">
                    <div className="preloader__one"></div>
                    <div className="preloader__two"></div>
                    <div className="preloader__three"></div>
                    <div className="preloader__four"></div>
                </div>
                <div className="preloader__title">
                    Подождите, идет авторизация...
                </div>
            </div>
        </div>
    )
}