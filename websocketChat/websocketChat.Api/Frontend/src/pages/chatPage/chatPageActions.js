import * as chatPageActionTypes from './chatPageActionTypes';

export function setToken(data) {
    return {
        type: chatPageActionTypes.SET_TOKEN,
        data
    };
}