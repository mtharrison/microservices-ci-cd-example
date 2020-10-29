import './App.css';

import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { SketchPicker } from 'react-color';




function App({ lights }) {

  const lightComponents = lights.map((light) => {

    return (
      <div className="light" key={light.id}>
        <h3 className="light-name">💡 {light.name}</h3>

        <div className="light-control">
          <Switch
            checked={light.state.on === true}
            onChange={() => {}}
            name="checkedB"
            color="primary"
          />
          <label>Light: {light.state.on === true ? 'On' : 'Off'}</label>
        </div>

        <p>Brightness: {light.state.bri}</p>

        <Slider
          defaultValue={light.state.bri}
          getAriaValueText={() => light.name}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={254}
        />

        <p></p>

        <SketchPicker />

      </div>
    );
  });

  return (
    <div className="App">

      <h1>🏠💡 Control Matt's Lights 💡🏠</h1>

      <div className="lights-container">
        {lightComponents}
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reloads.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React this way
        </a>
      </header> */}
    </div>
  );
}

export default App;
