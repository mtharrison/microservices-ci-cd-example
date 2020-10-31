import { connect } from 'react-redux'
import React from 'react'

import Light from './Light'


const Room = ({ room, lights }) => {

    const lightComponents = [];

    for (const lightId of room.lights) {
        if (lights[lightId]) {
            lightComponents.push(<Light key={lightId} light={lightId} />);
        }
    }

    return (
        lightComponents.length ?
            <div key={room.name}>
                <h2>🚪 {room.name}</h2>
                <div className="lights-container">
                    {lightComponents}
                </div>
            </div> :
            null
    );
};

export default connect(
    (state) => ({ lights: state.lights })
)(Room);
            