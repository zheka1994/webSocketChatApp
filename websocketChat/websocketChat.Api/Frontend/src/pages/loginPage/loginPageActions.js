import * as loginPageActionTypes from './loginPageActionTypes';

export function changeName(data) {
    return {
        type: loginPageActionTypes.CHANGE_NAME,
        data
    };
}

export function changeLastName(data) {
    return {
        type: loginPageActionTypes.CHANGE_LAST_NAME,
        data
    };
}

export function changephoneNumber(data) {
    return {
        type: loginPageActionTypes.CHANGE_PHONE_NUMBER,
        data
    };
}