import { takeLatest } from 'redux-saga/effects';
import {
    authUserWorker,
    registerUserWorker,
    validateEmailWorker,
    validateNameWorker,
    validatePasswordWorker,
    validatePhoneNumberWorker
} from './loginPageWorkers';
import {
    AUTH_USER,
    REGISTER_USER,
    CHANGE_NAME,
    CHANGE_EMAIL,
    CHANGE_PHONE_NUMBER,
    CHANGE_PASSWORD
} from './loginPageActionTypes';

export default [
    takeLatest(AUTH_USER, authUserWorker),
    takeLatest(REGISTER_USER, registerUserWorker),
    takeLatest(CHANGE_NAME, validateNameWorker),
    takeLatest(CHANGE_EMAIL, validateEmailWorker),
    takeLatest(CHANGE_PHONE_NUMBER, validatePhoneNumberWorker),
    takeLatest(CHANGE_PASSWORD, validatePasswordWorker),
];