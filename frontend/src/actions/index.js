import Axios from 'axios';

// Actions (process by reducer)

export const API_DATA_RECEIVED = 'API_DATA_RECEIVED';
export const UPDATE_STATE = 'UPDATE_STATE';
export const STATE_UPDATING = 'STATE_UPDATING';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';
export const STATE_UPDATED = 'STATE_UPDATED';
export const LOGGED_IN = 'LOGGED_IN';
export const SET_USER = 'SET_USER';

let API_URL = '/api';

if (document.location.href.includes('localhost') || document.location.href.includes('192.168')) {
    API_URL = `http://${document.location.hostname}:8000`;
}

// Action creators

export const loadApiData = () => async (dispatch, getState) => {

    const { updating, accessToken } = getState();

    if (updating) {
        return null;
    }

    const req = Axios.get(`${API_URL}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    });
    req.then((res) => {

        const { updating } = getState();

        if (updating) {
            return null;
        }
        
        dispatch(apiDataReceived(res.data))
    });
};


export const updateState = (id, state) => async (dispatch, getState) => {

    const { accessToken } = getState();

    dispatch(stateUpdating(id, state));
    await Axios.patch(`${API_URL}/${id}`, { state }, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    });
    dispatch(stateUpdated());
};

export const apiDataReceived = (data) => ({
    type: API_DATA_RECEIVED,
    data
});

export const stateUpdated = (data) => ({
    type: STATE_UPDATED
});

export const stateUpdating = (id, state) => ({
    type: STATE_UPDATING,
    payload: { id, state }
});

export const updateAccessToken = (token) => ({
    type: UPDATE_ACCESS_TOKEN,
    payload: { token }
});

export const updateUser = (user) => ({
    type: SET_USER,
    payload: { user }
});

export const loggedIn = () => async (dispatch) => {

    dispatch(loadApiData());
    setInterval(() => dispatch(loadApiData()), 4000);
    dispatch({ type: LOGGED_IN });
};
