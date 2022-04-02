import { takeLatest } from 'redux-saga/effects';
import { authUserWorker, registerUserWorker } from './loginPageWorkers';
import { AUTH_USER, REGISTER_USER } from './loginPageActionTypes';

export default [
    takeLatest(AUTH_USER, authUserWorker),
    takeLatest(REGISTER_USER, registerUserWorker)
];