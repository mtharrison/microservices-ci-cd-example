import '../styles/App.css';

import { connect } from 'react-redux'
import React from 'react'

import Room from './Room'


const App = ({ rooms }) => {
    
    return (
        <div className="App">
            <h1>🏠💡 Control Matt's Lights 💡🏠</h1>

            {Object.keys(rooms).sort().map((roomId) => {

                const room = rooms[roomId];
                return <Room key={roomId} room={room} />;
            })}
        </div>
    );
}
        
export default connect(
    (state) => ({ rooms: state.rooms })
)(App);
            