import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './combineReducers';

export default function configureStore(initialState) {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...getMiddlewares());
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    const store = createStore(rootReducer, initialState, composedEnhancers);
    return store;
}

function getMiddlewares() {
    return []
}