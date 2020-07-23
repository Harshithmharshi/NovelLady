
import {  GET_TRACKING_ORDER,GET_TRACKING_ORDER_FAIL  } from '../actions/types';

const initialState = {
    data: [],
    message: ''
};



export default function trackingorderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRACKING_ORDER:
            return {
                ...state,
                data: action.payload,
            };
            break;
        case GET_TRACKING_ORDER_FAIL:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}

