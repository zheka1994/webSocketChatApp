import * as chatPageActionTypes from './chatPageActionTypes';

export default function chat(state = {}, action) {
    switch (action.type) {
        case chatPageActionTypes.SET_TOKEN: {
            return {
                ...state,
                token: action.data
            };
        }
        case chatPageActionTypes.SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.data
            };
        }
        case chatPageActionTypes.CHANGE_NEW_FRIEND_SEARCH_QUERY: {
            return {
                ...state,
                newFriendSearchQuery: action.data
            }
        }
        case chatPageActionTypes.SET_SUGGEST_FRIENDS: {
            return {
                ...state,
                suggestFriends: action.data
            }
        }
        default:
            return state;

    }
}