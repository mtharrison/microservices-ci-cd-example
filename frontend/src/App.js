import './App.css';

import React from 'react'
import Light from './Light'

import _ from 'lodash'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lights: _.cloneDeep(props.lights)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lights: _.cloneDeep(nextProps.lights) });
  }

  lightStateChange(id, state) {

    const newLights = _.cloneDeep(this.state.lights);
    Object.assign(newLights.find((light) => light.id === id).state, state);
    this.setState({ lights: newLights });

    this.props.onStateChange(id, state);
  }

  render() {

    const lightComponents = this.state.lights.map((light) => {

      return (
        <Light key={light.id} light={light} onStateChange={this.lightStateChange.bind(this)}/>
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
}

export default App;
