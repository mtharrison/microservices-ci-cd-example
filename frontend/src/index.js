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

  console.log(state);
  const res = await Axios.patch(`http://localhost:8000/${id}`, { state });
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

// setInterval(() => main(), 5000);

main();
