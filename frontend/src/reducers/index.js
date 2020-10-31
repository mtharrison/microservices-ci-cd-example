import * as ActionTypes from '../actions'

const rootReducer = (state = { rooms: {}, lights: {}, updating: false }, action) => {

    switch(action.type) {
    case ActionTypes.API_DATA_RECEIVED:
        return { ...action.data, updating: false };
    case ActionTypes.STATE_UPDATING:
        return { ...state, updating: true };
    case ActionTypes.STATE_UPDATED:
        return { ...state, updating: false };
    default:
        return state
    }
};

export default rootReducer;
