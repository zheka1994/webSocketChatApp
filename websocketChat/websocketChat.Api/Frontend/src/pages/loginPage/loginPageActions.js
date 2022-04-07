import * as loginPageActionTypes from './loginPageActionTypes';

export function changeName(data) {
    return {
        type: loginPageActionTypes.CHANGE_NAME,
        data
    };
}

export function changeEmail(data) {
    return {
        type: loginPageActionTypes.CHANGE_EMAIL,
        data
    };
}

export function changePhoneNumber(data) {
    return {
        type: loginPageActionTypes.CHANGE_PHONE_NUMBER,
        data
    };
}

export function changePassword(data) {
    return {
        type: loginPageActionTypes.CHANGE_PASSWORD,
        data
    };
}

export function authUser() {
    return {
        type: loginPageActionTypes.AUTH_USER
    };
}

export function registerUser() {
    return {
        type: loginPageActionTypes.REGISTER_USER
    };
}

export function setAuthResponse(data) {
    return {
        type: loginPageActionTypes.SET_AUTH_RESPONSE,
        data
    };
}

export function setRegisterResponse(data) {
    return {
        type: loginPageActionTypes.SET_REGISTER_RESPONSE,
        data
    };
}