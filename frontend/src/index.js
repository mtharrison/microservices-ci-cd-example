import './styles/index.css';

import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { loadApiData } from './actions'
import App from './components/App';
import configureStore from './store/configure-store'

let API_URL = '/api';

if (document.location.href.includes('localhost') || document.location.href.includes('192.168')) {
    API_URL = `http://${document.location.hostname}:8000`;
}

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

    // Handle login

    const urlParams = new URLSearchParams(window.location.search);
    const auth_code = urlParams.get('code');

    if(auth_code) {
        const res = await Axios.get(`${API_URL}/login?code=${auth_code}`);
        if (res.data.token) {
            localStorage.token = res.data.token;
        }
    }

    render();
};

main();

// // Start the state flowing
// store.dispatch(loadApiData());
// setInterval(() => store.dispatch(loadApiData()), 1000);
