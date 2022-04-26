import {getCurrentRoot, getPath, getQueryParamsObject} from '../../../core/utils/urlExtensions';
import * as types from '../../../types';

export function buildOAuthRequest() {
    const queryParams = getQueryParamsObject();
    const authTypeName = queryParams.auth_type;
    return {
        code: queryParams.code,
        redirectUri: getCurrentRoot() + getPath() + `?auth_type=${authTypeName}`,
        type: getOAuthTypeByName(authTypeName)
    };
}

function getOAuthTypeByName(authTypeName) {
    switch (authTypeName) {
        case 'vk':
            return types.authType.VK;
        case 'google':
            return types.authType.GOOGLE;
        default:
            throw Error('Недопустимый тип авторизации');
    }
}