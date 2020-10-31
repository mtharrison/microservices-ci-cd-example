import Axios from 'axios';


export const API_DATA_RECEIVED = 'API_DATA_RECEIVED'

const API_URL = document.location.href.includes('localhost') ? 'http://localhost:8000' : '/api'

export const loadApiData = () => async (dispatch) => {

    const req = Axios.get(`${API_URL}`);
    req.then((res) => dispatch(apiDataReceived(res.data)));
};

export const apiDataReceived = (data) => ({
    type: API_DATA_RECEIVED,
    data
});
