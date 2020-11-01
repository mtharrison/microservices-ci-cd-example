import './styles/index.css';

import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './components/App';
import configureStore from './store/configure-store'

const store = configureStore()

const render = async () => {

    ReactDOM.render(
        <Auth0Provider
            domain="dev-jbom1tp8.eu.auth0.com"
            clientId="mleAPSZ6pAIqR6sOJJjRh0lXvaq1o4UU"
            redirectUri={window.location.origin}
            audience="http://control-matts-lights.com/api">
                
            <Provider store={store}>
                <App />
            </Provider>

        </Auth0Provider>,
        document.getElementById('root')
    );
}

const main = async () => {

    render();
};

main();
