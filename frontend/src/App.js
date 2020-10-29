import './App.css';

import Light from './Light'

function App({ lights, onStateChange }) {

  const lightComponents = lights.map((light) => {

    return (
      <Light key={light.id} light={light}/>
    );
  });

  return (
    <div className="App">

      <h1>🏠💡 Control Matt's Lights 💡🏠</h1>

      <div className="lights-container">
        {lightComponents}
      </div>

    </div>
  );
}

export default App;
