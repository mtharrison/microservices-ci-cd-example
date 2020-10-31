import { connect } from 'react-redux'
import React from 'react'

import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { HuePicker } from 'react-color';

import * as ColorConversion from '../helpers/color-conversion'


const Light = ({ light, lights }) => {

    if (!lights[light]) {
        return null;
    }

    const { name, state, type } = lights[light];
    const { xy, bri, on } = state;
    
    const picker = xy ? <HuePicker
        color={ ColorConversion.cie_to_rgb(xy[0], xy[0], bri) }
    /> : null;

    return (
        <div className="light" key={name}>
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
            value={bri}
            getAriaValueText={() => name}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(ev, value) => { }}
            step={10}
            marks
            min={0}
            max={254}
        />

        <p></p>

        {picker}

        </div>
    );
}

export default connect(
    (state) => ({ lights: state.lights }),
    null
)(Light);
