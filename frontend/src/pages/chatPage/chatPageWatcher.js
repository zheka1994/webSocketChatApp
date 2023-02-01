import { takeLatest } from 'redux-saga/effects';
import {
    initializeWorker,
    findFriendsWorker,
    uploadAvatarWorker
} from './chatPageWorkers';
import {
    INITIALIZE,
    FIND_FRIENDS,
    UPLOAD_AVATAR_PHOTO
} from './chatPageActionTypes';

export default [
    takeLatest(INITIALIZE, initializeWorker),
    takeLatest(FIND_FRIENDS, findFriendsWorker),
    takeLatest(UPLOAD_AVATAR_PHOTO, uploadAvatarWorker)
];