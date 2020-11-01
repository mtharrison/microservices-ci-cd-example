import * as ActionTypes from '../actions'

const rootReducer = (state = { rooms: {}, lights: {}, updating: false, loggedIn: false, accessToken: null, user: null }, action) => {

    switch(action.type) {
    case ActionTypes.API_DATA_RECEIVED:
        return { ...state, ...action.data, updating: false };
    case ActionTypes.STATE_UPDATING:
        return { ...state, updating: true };
    case ActionTypes.STATE_UPDATED:
        return { ...state, updating: false };
    case ActionTypes.LOGGED_IN:
        return { ...state, loggedIn: true };
    case ActionTypes.UPDATE_ACCESS_TOKEN:
        return { ...state, accessToken: action.payload.token };
    case ActionTypes.SET_USER:
        return { ...state, user: action.payload.user };
    default:
        return state
    }
};

export default rootReducer;
