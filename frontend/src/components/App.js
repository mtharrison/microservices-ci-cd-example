import '../styles/App.css';

import { connect } from 'react-redux'
import React from 'react'

import Room from './Room'


let CLIENT_ID = '08f8eb34d09c1786e440';

if (document.location.href.includes('localhost') || 
    document.location.href.includes('192.168')) {
        
    CLIENT_ID = 'c6635e06cf02378a939f';
}

const LoggedIn = ({ rooms }) => (
    <div className="App">
        <h1>🏠💡 Control Matt's Lights 💡🏠</h1>

        {Object.keys(rooms)
            .sort((a, b) => rooms[b].lights.length - rooms[a].lights.length)
            .map((roomId) => {

            const room = rooms[roomId];
            return <Room key={roomId} room={room} />;
        })}
    </div>
);

const NotLoggedIn = () => {

    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

    return (
        <div className="App">
            <a href={url} id="github-button" className="btn btn-block btn-social btn-github">
                <i className="fa fa-github"></i> Sign in with Github
            </a>
        </div>
    );
};

const App = ({ rooms, loggedIn }) => {
    
    return (
        loggedIn ? <LoggedIn rooms={rooms} /> : <NotLoggedIn />
    );
}
        
export default connect(
    (state) => ({ rooms: state.rooms, loggedIn: state.loggedIn })
)(App);
            