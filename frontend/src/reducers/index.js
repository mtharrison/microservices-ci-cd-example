import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

const lights = (state = {}, action) => {

    switch(action.type) {
    case ActionTypes.API_DATA_RECEIVED:
        return action.data;
    default:
        return state
    }
};

const rootReducer = combineReducers({
    lights
});

export default rootReducer;
