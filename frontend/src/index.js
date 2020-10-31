import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { loadApiData } from './actions'
import App from './components/App';
import configureStore from './store/configure-store'


const store = configureStore()

// const API_URL = document.location.href.includes('localhost') ? 'http://localhost:8000' : '/api'

// const fetchLights = async () => {

//   const res = await Axios.get(`${API_URL}`);
//   return res.data;
// };

// const onStateChange = async (id, state) => {

//   console.log(state);
//   const res = await Axios.patch(`${API_URL}/${id}`, { state });
//   console.log(res.data);
// };

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

store.dispatch(loadApiData())
