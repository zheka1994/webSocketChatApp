import {call, put, select} from "redux-saga/effects";
import ApiMethods from "../../core/api/apiMethods";
import * as apiRequestBuilder from "./business/apiRequestBuilder";
import * as loginPageActions from "./loginPageActions";
import * as validator from "./business/formValidation";

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
    try {
        return await apiMethods.auth(apiRequestBuilder.buildAuthRequest(login));
    } catch (ex) {
        console.log(ex);
    }
    
}

async function registerUser(login) {
    const apiMethods = new ApiMethods();
    try {
        return await apiMethods.register(apiRequestBuilder.buildRegisterRequest(login));
    } catch (ex) {
        console.log(ex);
    }
}

export function* validateNameWorker() {
    const {login} = yield select();
    const name = login.name;
    const fieldName = 'name';
    let validationResult;
    if (!name) {
        validationResult = {
            isValid: false,
            message: 'Введите имя пользователя',
            fieldName
        };
    } else {
        const isValid = validator.validateName(name);
        if (!isValid) {
            validationResult = {
                isValid: false,
                message: 'Имя пользователя должно содержать только буквы алфавита',
                fieldName
            };
        } else {
            validationResult = {
                isValid: true,
                fieldName
            };
        }
    }
    yield put(loginPageActions.setFormValidationResult(validationResult));
}

export function* validateEmailWorker() {
    const {login} = yield select();
    const email = login.email;
    const fieldName = 'email';
    let validationResult;
    if (!email) {
        validationResult = {
            isValid: false,
            message: 'Введите email',
            fieldName
        };
    } else {
        const isValid = validator.validateEmail(email);
        if (!isValid) {
            validationResult = {
                isValid: false,
                message: 'Неверный формат поля email',
                fieldName
            };
        } else {
            validationResult = {
                isValid: true,
                fieldName
            };
        }
    }
    yield put(loginPageActions.setFormValidationResult(validationResult));
}

export function* validatePhoneNumberWorker() {
    const {login} = yield select();
    const phoneNumber = login.phoneNumber;
    const fieldName = 'phoneNumber';
    let validationResult;
    if (!phoneNumber) {
        validationResult = {
            isValid: false,
            message: 'Введите номер телефона',
            fieldName
        };
    } else {
        const isValid = validator.validatePhoneNumber(phoneNumber);
        if (!isValid) {
            validationResult = {
                isValid: false,
                message: 'Неверный формат поля номера телефона',
                fieldName
            };
        } else {
            validationResult = {
                isValid: true,
                fieldName
            };
        }
    }
    yield put(loginPageActions.setFormValidationResult(validationResult));
}

export function* validatePasswordWorker() {
    const {login} = yield select();
    const password = login.password;
    const fieldName = 'password';
    let validationResult;
    if (!password) {
        validationResult = {
            isValid: false,
            message: 'Введите пароль',
            fieldName
        };
    } else {
        const isValid = validator.validatePassword(password);
        if (!isValid) {
            validationResult = {
                isValid: false,
                message: 'Неверный формат поля пароля',
                fieldName
            };
        } else {
            validationResult = {
                isValid: true,
                fieldName
            };
        }
    }
    yield put(loginPageActions.setFormValidationResult(validationResult));
}