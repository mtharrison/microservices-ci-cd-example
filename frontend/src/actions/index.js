import Axios from 'axios';


export const API_DATA_RECEIVED = 'API_DATA_RECEIVED';
export const UPDATE_STATE = 'UPDATE_STATE';
export const STATE_UPDATED = 'STATE_UPDATED';

const API_URL = document.location.href.includes('localhost') ? 'http://localhost:8000' : '/api'

export const loadApiData = () => async (dispatch) => {

    const req = Axios.get(`${API_URL}`);
    req.then((res) => dispatch(apiDataReceived(res.data)));
};

export const apiDataReceived = (data) => ({
    type: API_DATA_RECEIVED,
    data
});

export const stateUpdated = (data) => ({
    type: STATE_UPDATED
});

export const updateState = (id, state) => async (dispatch) => {

    const res = await Axios.patch(`${API_URL}/${id}`, { state });
    dispatch(stateUpdated());
};
