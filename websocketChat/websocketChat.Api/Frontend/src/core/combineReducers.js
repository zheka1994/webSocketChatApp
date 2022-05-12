import { combineReducers } from 'redux';
import login from '../pages/loginPage/loginPageReducer';
import chat from '../pages/chatPage/chatPageReducer';

const rootReducer = combineReducers({
    login,
    chat
});

export default rootReducer;