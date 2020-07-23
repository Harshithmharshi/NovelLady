
import { GET_PRODUCTS_LIST_LOAD,GET_LISTING_PRODUCTS_LIST_LOAD,GET_PRODUCTS_LIST, GET_PRODUCTS_LIST_FAILURE, GET_LISTING_PRODUCTS_LIST,GET_LISTING_PRODUCTS_LIST_FAIL } from '../actions/types';
import { FETCH_SHOP_PRODUCT_DATA_START, FETCH_SHOP_PRODUCT_DATA_SUCCESS, FETCH_SHOP_PRODUCT_DATA_FAILURE } from '../constants/actionTypes';

const initialState = {
    data: [],
    message: '',
    isLoading:false
};

const shopInitialState = {

}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LIST_LOAD:
            return {
                ...state,
                isLoading:true
            };
            break;
        case GET_PRODUCTS_LIST:
            return {
                ...state,
                data: action.payload,
                isLoading:false
            };
            break;
      
        case GET_PRODUCTS_LIST_FAILURE:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}


export  const productsListingReducer=(state = initialState, action)=> {
    switch (action.type) {
        case GET_LISTING_PRODUCTS_LIST_LOAD:
            return {
                ...state,
                isLoading:true
            };
            break;
        case GET_LISTING_PRODUCTS_LIST:
            return {
                ...state,
                data: action.payload,
                isLoading:false
            };
            break;
        case GET_LISTING_PRODUCTS_LIST_FAIL:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
}

export const shopProductReducer = (state = shopInitialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case FETCH_SHOP_PRODUCT_DATA_START:
            newState.isShopDataLoading = true;
            break;
        case FETCH_SHOP_PRODUCT_DATA_SUCCESS:
            newState.isShopDataLoading = false;
            newState.shopData = action.data;
            break;
        case FETCH_SHOP_PRODUCT_DATA_FAILURE:
            newState.isShopDataLoading = false;
            newState.shopErrorMessage = 'There was some error while fetching the data';
            break;
    }
    return newState;
}

