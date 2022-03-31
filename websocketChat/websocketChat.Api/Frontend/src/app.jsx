import './scss/app.scss';
import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';

import Router from './components/router';
import configureStore from './core/configureStore';

const store = configureStore({});
console.log(store);

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById("chat-app")
);