import { connect } from 'react-redux'
import React from 'react'

import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { HuePicker } from 'react-color';

import * as ColorConversion from '../helpers/color-conversion'


const Light = ({ light }) => {

    const { id, name, state } = light;
    const { xy, bri, on } = state;
    const [x, y] = xy;

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

        <HuePicker
            color={ ColorConversion.cie_to_rgb(x, y, bri) }
        />

        </div>
    );
}

export default connect(
    null,
    null
)(Light);
