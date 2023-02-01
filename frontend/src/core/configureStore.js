import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './combineReducers';
import appSaga from './sagas';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewareEnhancer = applyMiddleware(...[sagaMiddleware]);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    const store = createStore(rootReducer, initialState, composedEnhancers);
    // after applymiddlewar and create store
    sagaMiddleware.run(appSaga);
    return store;
}