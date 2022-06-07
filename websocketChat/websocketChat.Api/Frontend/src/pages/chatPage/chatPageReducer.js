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
            };
        }
        case chatPageActionTypes.SET_SUGGEST_FRIENDS: {
            return {
                ...state,
                suggestFriends: action.data
            };
        }
        case chatPageActionTypes.SHOW_CREATE_CHAT_MODAL_VISIBILITY: {
            return {
                ...state,
                createChatModalVisible: true
            };
        }
        case chatPageActionTypes.HIDE__CREATE_CHAT_MODAL_VISIBILITY: {
            return {
                ...state,
                createChatModalVisible: false
            };
        };
        case chatPageActionTypes.SET_AVATAR_FILE: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    user: {
                        ...state.userInfo.user,
                        avatarFile: action.data
                    }
                }
            };
        }
        case chatPageActionTypes.SET_AVATAR_URI: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    user: {
                        ...state.userInfo.user,
                        avatarUri: action.data
                    }
                }
            };
        }
        default:
            return state;

    }
}