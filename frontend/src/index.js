import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { loadApiData } from './actions'
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

render();

// Start the state flowing
store.dispatch(loadApiData());
setInterval(() => store.dispatch(loadApiData()), 1000);
