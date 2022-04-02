import * as loginPageActionTypes from './loginPageActionTypes';
import { call, select, put } from 'redux-saga/effects';
import ApiMethods from "../../core/api/apiMethods";
import * as apiRequestBuilder from "./business/apiRequestBuilder";

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

export function changePhoneNumber(data) {
    return {
        type: loginPageActionTypes.CHANGE_PHONE_NUMBER,
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