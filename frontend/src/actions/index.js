import Axios from 'axios';


export const API_DATA_RECEIVED = 'API_DATA_RECEIVED';
export const UPDATE_STATE = 'UPDATE_STATE';
export const STATE_UPDATING = 'STATE_UPDATING';
export const STATE_UPDATED = 'STATE_UPDATED';

const API_URL = document.location.href.includes('localhost') ? 'http://localhost:8000' : '/api'

export const loadApiData = () => async (dispatch, getState) => {

    const { updating } = getState();

    if (updating) {
        return null;
    }

    const req = Axios.get(`${API_URL}`);
    req.then((res) => {

        const { updating } = getState();

        if (updating) {
            return null;
        }
        
        dispatch(apiDataReceived(res.data))
    });
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

export const updateState = (id, state) => async (dispatch) => {

    dispatch(stateUpdating());
    const res = await Axios.patch(`${API_URL}/${id}`, { state });
    dispatch(stateUpdated());
};
