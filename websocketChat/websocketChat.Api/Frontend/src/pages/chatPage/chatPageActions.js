import * as chatPageActionTypes from './chatPageActionTypes';

export function initialize() {
    return {
        type: chatPageActionTypes.INITIALIZE
    };
}

export function setToken(data) {
    return {
        type: chatPageActionTypes.SET_TOKEN,
        data
    };
}

export function setUserInfo(data) {
    return {
        type: chatPageActionTypes.SET_USER_INFO,
        data
    };
}

export function changeNewFriendSearchQuery(data) {
    return {
        type: chatPageActionTypes.CHANGE_NEW_FRIEND_SEARCH_QUERY,
        data
    };
}

export function findNewFriends() {
    return {
        type: chatPageActionTypes.FIND_FRIENDS
    };
}

export function setSuggestFriends(data) {
    return {
        type: chatPageActionTypes.SET_SUGGEST_FRIENDS,
        data
    };
}

export function showChatModalVisibility() {
    return {
        type: chatPageActionTypes.SHOW_CREATE_CHAT_MODAL_VISIBILITY
    };
}

export function hideChatModalVisibility() {
    return {
        type: chatPageActionTypes.HIDE__CREATE_CHAT_MODAL_VISIBILITY
    };
}

export function uploadAvatar() {
    return {
        type: chatPageActionTypes.UPLOAD_AVATAR_PHOTO
    };
}

export function setAvatarFile(file) {
    return {
        type: chatPageActionTypes.SET_AVATAR_FILE,
        data: file
    };
}

export function setAvatarUri(data) {
    return {
        type: chatPageActionTypes.SET_AVATAR_URI,
        data
    };
}