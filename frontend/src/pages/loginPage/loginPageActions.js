import * as loginPageActionTypes from './loginPageActionTypes';

export function changeActiveTabNumber(data) {
    return {
        type: loginPageActionTypes.CHANGE_ACTIVE_TAB_NUMBER,
        data
    };
}

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

export function setFormValidationResult(data) {
    return {
        type: loginPageActionTypes.SET_FORM_VALIDATION_RESULT,
        data
    }
}