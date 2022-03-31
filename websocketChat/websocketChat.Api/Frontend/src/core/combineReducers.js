import { combineReducers } from 'redux';
import login from '../pages/loginPage/loginPageReducer';

const rootReducer = combineReducers({
    login
});

export default rootReducer;