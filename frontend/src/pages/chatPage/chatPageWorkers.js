import { call, put, select } from 'redux-saga/effects';
import * as chatPageActions from './chatPageActions';
import { restoreFromLocalStorage } from '../../core/utils/localStorageExtensions';
import ApiMethods from '../../core/api/apiMethods';

export function* initializeWorker() {
    const { chat } = yield select();
    let token = chat?.token;
    if (!token) {
        token = restoreFromLocalStorage('TOKEN');
        yield put(chatPageActions.setToken(token));
    }
    const response = yield call(getUserInfo, token);
    if (response) {
        yield put(chatPageActions.setUserInfo(response))
    }
}

async function getUserInfo(token) {
    const apiMethods = new ApiMethods();
    try {
        const response = await apiMethods.getUserInfo(token);
        return response;
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export function* findFriendsWorker() {
    const { chat } = yield select();
    const token = chat?.token;
    const query = chat?.newFriendSearchQuery;
    const response = yield call(findNewFriends, token, query);
    if (response) {
        yield put(chatPageActions.setSuggestFriends(response));
    }
}

async function findNewFriends(token, query) {
    const apiMethods = new ApiMethods();
    try {
        const response = await apiMethods.findNewFriends(token, query);
        return response;
    } catch (ex) {
        console.log(ex);
        return null;
    }
}

export function* uploadAvatarWorker() {
    const { chat } = yield select();
    const avatarFile = chat?.userInfo?.user?.avatarFile;
    const token = chat?.token;
    const response = yield call(uploadAvatar, token, avatarFile);
    if (response) {
        yield put(chatPageActions.setAvatarUri(response.uri));
    }
}


async function uploadAvatar(token, file) {
    const apiMethods = new ApiMethods();
    try {
        const response = await apiMethods.uploadAvatar(token, file);
        return response;
    } catch (ex) {
        console.log(ex);
        return null;
    }
}