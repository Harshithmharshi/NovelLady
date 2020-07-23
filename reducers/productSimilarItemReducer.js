
import { GET_PRODUCTS_SIMILAR_ITEM, GET_PRODUCTS_SIMILAR_ITEM_FAILURE  } from '../actions/types';

const initialState = {
    data: [],
    message: ''
};



export default function productSimilarItemReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_SIMILAR_ITEM:
            return {
                ...state,
                data: action.payload,
            };
            break;
        case GET_PRODUCTS_SIMILAR_ITEM_FAILURE:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}

