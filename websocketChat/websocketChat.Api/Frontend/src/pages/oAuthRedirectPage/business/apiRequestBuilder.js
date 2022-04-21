import {getCurrentRoot, getPath, getQueryParamsObject} from '../../../core/utils/urlExtensions';
import * as types from '../../../types';

export function buildOAuthRequest() {
    const queryParams = getQueryParamsObject();
    return {
        code: queryParams.code,
        redirectUri: getCurrentRoot() + getPath(),
        type: types.authType.VK
    };
}