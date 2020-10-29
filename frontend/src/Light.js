import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { SketchPicker } from 'react-color';

import * as ColorConversion from './color-conversion'

function Light({ light }) {

  const { id, name, state } = light;
  const { xy, bri, on } = state;

  return (
    <div className="light" key={id}>
        <h3 className="light-name">💡 {name}</h3>

        <div className="light-control">
        <Switch
          checked={on === true}
          onChange={() => {}}
          name={name}
          color="primary"
        />
        <label>Light: {on === true ? 'On' : 'Off'}</label>
        </div>

        <p>Brightness: {bri}</p>

        <Slider
          defaultValue={bri}
          getAriaValueText={() => name}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={254}
        />

        <p></p>

        <SketchPicker
          color={ ColorConversion.cie_to_rgb(xy[0], xy[1], bri) }
        />

    </div>
  );
}

export default Light;
