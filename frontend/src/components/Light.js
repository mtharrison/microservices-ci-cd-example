import { connect } from 'react-redux'
import { React, useState } from 'react'

import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { HuePicker } from 'react-color';

import { updateState } from '../actions'
import * as ColorConversion from '../helpers/color-conversion'


const Light = ({ light, lights, updateState }) => {

    const { name, state, type } = lights[light];
    const { xy, bri, on } = state;

    const [onState, updateOnState] = useState(on);
    const [briState, updateBriState] = useState(bri);
    const [rgbState, updateRgbState] = useState(ColorConversion.cie_to_rgb(xy ? xy[0] : 0, xy ? xy[0] : 0, bri));
    
    const picker = xy ? <HuePicker
        color={rgbState}
        onChange={(rgb) => updateRgbState(rgb)}
        onChangeComplete={({ rgb }) => updateState(light, { xy: ColorConversion.rgb_to_cie(rgb.r, rgb.g, rgb.b) })}
    /> : null;

    return (
        <div className="light" key={name}>
        <h3 className="light-name">💡 {name}</h3>

        <div className="light-control">
            <Switch
                checked={onState}
                onChange={() => {
                    updateOnState(!onState);;
                    updateState(light, { on: !onState });
                }}
                name={name}
                color="primary"
            />
            <label>Light: {onState === true ? 'On' : 'Off'}</label>
        </div>

        <p>Brightness: {briState}</p>

        <Slider
            value={briState}
            getAriaValueText={() => name}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(_, value) => updateBriState(value)}
            onChangeCommitted={(_, value) => updateState(light, { bri: briState })}
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
    (dispatch) => ({
        updateState: (id, state) => dispatch(updateState(id, state))
    })
)(Light);
