import * as chatPageActionTypes from './chatPageActionTypes';

export default function chat(state = {}, action) {
    switch (action.type) {
        case chatPageActionTypes.SET_TOKEN: {
            return {
                ...state,
                token: action.data
            }
        }
        default:
            return state;

    }
}