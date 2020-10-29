import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

const API_URL = document.location.href.includes('localhost') ? 'http://localhost:8000' : '/api'

const fetchLights = async () => {

  const res = await Axios.get(`${API_URL}`);
  return res.data;
};

const onStateChange = async (id, state) => {

  console.log(state);
  const res = await Axios.patch(`${API_URL}/${id}`, { state });
  console.log(res.data);
};

const main = async () => {

  const lights = await fetchLights();

  ReactDOM.render(
    <React.StrictMode>
      <App lights={lights} onStateChange={onStateChange}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

setInterval(() => main(), 5000);

main();
