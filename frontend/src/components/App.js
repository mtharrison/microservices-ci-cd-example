import '../styles/App.css';

import { connect } from 'react-redux'
import React from 'react'

import Room from './Room'


const App = ({ rooms, loggedIn }) => {
    
    return (
        loggedIn ?
        <div className="App">
            <h1>🏠💡 Control Matt's Lights 💡🏠</h1>

            {Object.keys(rooms)
                .sort((a, b) => rooms[b].lights.length - rooms[a].lights.length)
                .map((roomId) => {

                const room = rooms[roomId];
                return <Room key={roomId} room={room} />;
            })}
        </div> :
        <div className="App">
            <h1>🏠💡 Control Matt's Lights 💡🏠</h1>
            <a href="https://github.com/login/oauth/authorize?client_id=c6635e06cf02378a939f" id="github-button" className="btn btn-block btn-social btn-github">
                <i className="fa fa-github"></i> Sign in with Github
            </a>
        </div>
    );
}
        
export default connect(
    (state) => ({ rooms: state.rooms, loggedIn: state.loggedIn })
)(App);
            