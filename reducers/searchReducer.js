
import { GET_SEACRH_DATA, GET_SEACRH_DATA_FAILURE  } from '../actions/types';


const initialState = {
    data: [],
    message: ''
};


export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SEACRH_DATA:
            return {
                ...state,
                data: action.payload,
            };
            break;
        case GET_SEACRH_DATA_FAILURE:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}

