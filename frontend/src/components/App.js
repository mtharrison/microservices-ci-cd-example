import '../styles/App.css';

import { useAuth0 } from "@auth0/auth0-react";
import { connect } from 'react-redux'
import { React, useEffect } from 'react'

import { updateAccessToken, updateUser, loadApiData } from '../actions'
import Room from './Room'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton';


const App = ({ rooms, setAccessToken, user, setUser, load }) => {

    const { user: auth0User, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {

        if (!isAuthenticated) {
            return;
        }

        setUser(auth0User);

        const getUserMetadata = async () => {

            const accessToken = await getAccessTokenSilently({
                audience: `http://control-matts-lights.com/api`,
                scope: "read:lights",
            });
        
            setAccessToken(accessToken);
            load();
        };
        
        getUserMetadata();

    }, [getAccessTokenSilently, setAccessToken, isAuthenticated, auth0User, load, setUser]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!isAuthenticated) {
        return (
            <div className="App">
                <header>
                    <h1>🏠💡 Control Matt's Lights 💡🏠</h1> <div className="login-component"><LoginButton/></div>
                </header> 
            </div>
        );
    }
    
    return (
        <div className="App">
            <header>
                <h1>🏠💡 Control Matt's Lights 💡🏠</h1> <div className="login-component">Logged in: {user && user.nickname} <LogoutButton/></div></header> 

            {Object.keys(rooms)
                .sort((a, b) => rooms[b].lights.length - rooms[a].lights.length)
                .map((roomId) => {

                const room = rooms[roomId];
                return <Room key={roomId} room={room} />;
            })}
        </div>
    );
}
        
export default connect(
    (state) => ({ rooms: state.rooms, user: state.user }),
    (dispatch) => ({
        setAccessToken: (token) => dispatch(updateAccessToken(token)),
        setUser: (user) => dispatch(updateUser(user)),
        load: () => dispatch(loadApiData())
    })
)(App);
            