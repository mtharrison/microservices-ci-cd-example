import './styles/index.css';

import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { loadApiData, tryLogin } from './actions'
import App from './components/App';
import configureStore from './store/configure-store'

const store = configureStore()

const render = async () => {

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

const main = async () => {

    store.dispatch(tryLogin());
    render();
};

main();
