
import { GET_TRACKING_ORDER, GET_TRACKING_ORDER_FAIL } from './types';
import axios from 'axios';
import { BASE_URL } from "../constants/api";


export const getTrackingOrder = data => {
    return {
        type: GET_TRACKING_ORDER,
        payload: data,
    };
};


export const getTrackingOrderFail = () => {
    return {
        type: GET_TRACKING_ORDER_FAIL,

    };
};


// Get Track Order
export const fetchTrackingOrder = (token, id) => dispatch => {
    return axios.get(`${BASE_URL}track-order/${id}/`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
        .then(response => {
            dispatch(getTrackingOrder(response.data));
        })
        .catch(err => {
            dispatch(getTrackingOrder(err))
        }
        );
};


