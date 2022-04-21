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
        <div/>
    )
}