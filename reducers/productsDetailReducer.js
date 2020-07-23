
import { GET_PRODUCTS_DETAIL_LOADING,
     GET_PRODUCTS_DETAIL,
      GET_PRODUCTS_DETAIL_FAILURE } from '../actions/types';

const initialState = {
    data: [],
    message: '',
    isLoading: false,
};



export default function productsDetailReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_DETAIL_LOADING:
            return {
                ...state,
               isLoading : true,
            };
            break;
        case GET_PRODUCTS_DETAIL:
            return {
                ...state,
                data: action.payload,
                isLoading:false,
            };
            break;
        case GET_PRODUCTS_DETAIL_FAILURE:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}

