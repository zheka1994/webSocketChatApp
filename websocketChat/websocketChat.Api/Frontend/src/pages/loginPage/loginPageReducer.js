import * as loginPageActionTypes from './loginPageActionTypes';

export default function login(state = {}, action) {
    switch (action.type) {
        case loginPageActionTypes.CHANGE_ACTIVE_TAB_NUMBER: {
            return {
                ...state,
                name: '',
                email: '',
                phoneNumber: '',
                password: '',
                registerResult: '',
                authResult: '',
                validationResult: {},
                activeTabNumber: action.data
            }
        }
        case loginPageActionTypes.CHANGE_NAME: {
            return {
                ...state,
                name: action.data
            };
        }
        case loginPageActionTypes.CHANGE_EMAIL: {
            return {
                ...state,
                email: action.data
            };
        }
        case loginPageActionTypes.CHANGE_PHONE_NUMBER: {
            return {
                ...state,
                phoneNumber: action.data
            };
        }
        case loginPageActionTypes.CHANGE_PASSWORD: {
            return {
                ...state,
                password: action.data
            };
        }
        case loginPageActionTypes.SET_FORM_VALIDATION_RESULT: {
            return {
                ...state,
                validationResult: {
                    ...state.validationResult, [action.data.fieldName]: action.data
                }
            }
        }
        case loginPageActionTypes.SET_REGISTER_RESPONSE: {
            return {
                ...state,
                registerResult: action.data
            }
        }
        case loginPageActionTypes.SET_AUTH_RESPONSE: {
            return {
                ...state,
                authResult: action.data
            }
        }
        default:
            return state;

    }
}