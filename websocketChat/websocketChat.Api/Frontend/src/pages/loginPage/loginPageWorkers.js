import {call, put, select} from "redux-saga/effects";
import ApiMethods from "../../core/api/apiMethods";
import * as apiRequestBuilder from "./business/apiRequestBuilder";
import * as loginPageActions from "./loginPageActions";
import login from "./loginPageReducer";

export function* authUserWorker() {
    const {login} = yield select();
    const response = yield call(authUser, login);
    yield put(loginPageActions.setAuthResponse(response));
}

export function* registerUserWorker() {
    const {login} = yield select();
    const response = yield call(registerUser, login);
    yield put(loginPageActions.setRegisterResponse(response));
}

async function authUser(login) {
    const apiMethods = new ApiMethods();
    return await apiMethods.auth(apiRequestBuilder.buildAuthRequest(login));
}

async function registerUser(login) {
    const apiMethods = new ApiMethods();
    return await apiMethods.register(apiRequestBuilder.buildRegisterRequest(login));
}