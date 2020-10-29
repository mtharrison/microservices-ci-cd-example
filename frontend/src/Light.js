import _ from 'lodash'
import React from 'react'
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { HuePicker } from 'react-color';

import * as ColorConversion from './color-conversion'

class Light extends React.Component {

  constructor(props) {
    super(props);

    const { light } = props
    const { state } = light;
    const { xy, bri } = state;

    this.state = {
      rgb: ColorConversion.cie_to_rgb(xy[0], xy[1], bri) };
  }

  componentWillReceiveProps(nextProps) {

    const { light } = nextProps
    const { state } = light;
    const { xy, bri } = state;
    this.setState({ rgb: ColorConversion.cie_to_rgb(xy[0], xy[1], bri) });
  }

  render() {

    const { light, onStateChange } = this.props
    const { id, name, state } = light;
    const { xy, bri, on } = state;

    const throttledOnStateChange = _.debounce(onStateChange, 200);

    return (
      <div className="light" key={id}>
          <h3 className="light-name">💡 {name}</h3>

          <div className="light-control">
          <Switch
            checked={on === true}
            onChange={() => { onStateChange(id, { on: !on }) }}
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
            onChange={(ev, value) => { throttledOnStateChange(id, { bri: value }) }}
            step={10}
            marks
            min={0}
            max={254}
          />

          <p></p>

          <HuePicker
            color={ this.state.rgb }
            onChange={ (val) => this.setState({ rgb: val.rgb }) }
            onChangeComplete={ (val) => {
              this.setState({ rgb: val.rgb })
              onStateChange(id, { xy: ColorConversion.rgb_to_cie(val.rgb.r, val.rgb.g, val.rgb.b) })
            } }
          />

      </div>
    );
  }
}

export default Light;
