
import { GET_BIG_DEALS, GET_BIG_DEALS_FAILURE } from '../actions/types';


const initialState = {
    data: [],
    message: ''
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BIG_DEALS:
            return {
                ...state,
                data: action.payload
            }
            break;

            case GET_BIG_DEALS_FAILURE:
            return {
                message:'There was a problem while connecting to the server'
            }

        default:
            return state;
    }
}