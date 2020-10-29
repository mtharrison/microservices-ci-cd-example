import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

const fetchLights = async () => {

  const res = await Axios.get('http://localhost:8000');
  return res.data;
};

const onStateChange = async (id, state) => {

  console.log(id, state);
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

main();
