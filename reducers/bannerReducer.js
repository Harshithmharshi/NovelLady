
import { GET_BANNER_LIST, GET_BANNER_LIST_FAILURE  } from '../actions/types';

const initialState = {
    data: [],
    message: ''
};



export default function bannerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BANNER_LIST:
            return {
                ...state,
                data: action.payload,
            };
            break;
        case GET_BANNER_LIST_FAILURE:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}

