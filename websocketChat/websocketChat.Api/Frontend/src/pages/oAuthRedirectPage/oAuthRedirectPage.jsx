import React, { useEffect } from 'react';
import ApiMethods from "../../core/api/apiMethods";
import { buildOAuthRequest } from './business/apiRequestBuilder';

export default function OAuthRedirectPage() {
    useEffect(async () => {
        try {
            const api = new ApiMethods();
            const result = await api.vkOAuth(buildOAuthRequest());
            console.log(result);
        }
        catch (ex) {
            console.log(ex);
        }
    }, []);
    
    return (
        <div className="preloader">
            <div className="preloader__wrap">
                <div class="preloader__one one"></div>
                <div class="preloader__one two"></div>
                <div class="preloader__one three"></div>
                <div class="preloader__one four"></div>
                <div class="preloader__two five"></div>
                <div class="preloader__two six"></div>
                <div class="preloader__two seven"></div>
            </div>
        </div>
    )
}