import { takeLatest } from 'redux-saga/effects';
import {
    initializeWorker,
    findFriendsWorker
} from './chatPageWorkers';
import {
    INITIALIZE,
    FIND_FRIENDS
} from './chatPageActionTypes';

export default [
    takeLatest(INITIALIZE, initializeWorker),
    takeLatest(FIND_FRIENDS, findFriendsWorker),
];