import Axios from 'axios';

// Actions (process by reducer)

export const API_DATA_RECEIVED = 'API_DATA_RECEIVED';
export const UPDATE_STATE = 'UPDATE_STATE';
export const STATE_UPDATING = 'STATE_UPDATING';
export const STATE_UPDATED = 'STATE_UPDATED';
export const LOGGED_IN = 'LOGGED_IN';

let API_URL = '/api';

if (document.location.href.includes('localhost') || document.location.href.includes('192.168')) {
    API_URL = `http://${document.location.hostname}:8000`;
}

// Action creators

export const loadApiData = () => async (dispatch, getState) => {

    const { updating } = getState();

    if (updating) {
        return null;
    }

    const req = Axios.get(`${API_URL}?token=${localStorage.token}`);
    req.then((res) => {

        const { updating } = getState();

        if (updating) {
            return null;
        }
        
        dispatch(apiDataReceived(res.data))
    });
};


export const updateState = (id, state) => async (dispatch) => {

    dispatch(stateUpdating());
    await Axios.patch(`${API_URL}/${id}?token=${localStorage.token}`, { state });
    dispatch(stateUpdated());
};

export const apiDataReceived = (data) => ({
    type: API_DATA_RECEIVED,
    data
});

export const stateUpdated = (data) => ({
    type: STATE_UPDATED
});

export const stateUpdating = (data) => ({
    type: STATE_UPDATING
});

export const loggedIn = () => async (dispatch) => {

    dispatch(loadApiData());
    dispatch({ type: LOGGED_IN });
};

export const tryLogin = () => async (dispatch) => {

    // Check if there's already a token

    const token = localStorage.token;

    if (token) {
        dispatch(loggedIn());
        return;
    }

    // Check if there's an auth code and try to login

    const urlParams = new URLSearchParams(window.location.search);
    const auth_code = urlParams.get('code');

    if(auth_code) {
        // Get an application token

        const res = await Axios.get(`${API_URL}/login?code=${auth_code}`);
        if (res.data.token) {
            localStorage.token = res.data.token;
        }

        // Reload to remove code from url

        document.location.href = `${document.location.protocol}//${document.location.host}`;
    }
};
