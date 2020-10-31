import '../styles/App.css';

import { connect } from 'react-redux'
import React from 'react'

import Light from './Light'


const App = ({ lights }) => {
    
    const lightComponents = (lights) => lights.map((light) => <Light key={light.id} light={light} />);
    
    return (
        <div className="App">
            <h1>🏠💡 Control Matt's Lights 💡🏠</h1>
            
            {Object.entries(lights).map(([name, room]) => {
                
                return (
                    <div key={name}>
                        <h2>🚪 {name}</h2>
                        <div className="lights-container">
                            {lightComponents(room.lights)}
                        </div>
                    </div>
                );
                
            })}
        </div>
    );
}
        
export default connect(
    (state) => ({ lights: state.lights })
)(App);
            