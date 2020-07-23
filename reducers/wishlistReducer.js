
import {GET_USER_WISHLIST_LOAD, GET_USER_WISHLIST, GET_USER_WISHLIST_FAIL,POST_WISHLIST_ID,POST_WISHLIST_ID_FAIL  } from '../actions/types';


const initialState = {
    token: localStorage.getItem("user_token"),
    isUserLogin: false,
    data: [],
    message: '',
    isloading:false
};



export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_WISHLIST_LOAD:
            return{
                ...state,
                isloading:true
            }
        case GET_USER_WISHLIST:
            return {
                ...state,
                data: action.payload,
                isUserLogin: true,
                isloading:false
            };
            break;
        case GET_USER_WISHLIST_FAIL:
            return {
                // isUserLogin: false,
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
};


