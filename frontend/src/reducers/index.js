import * as ActionTypes from '../actions'

const rootReducer = (state = { rooms: {}, lights: {} }, action) => {

    switch(action.type) {
    case ActionTypes.API_DATA_RECEIVED:
        return action.data;
    default:
        return state
    }
};

export default rootReducer;
