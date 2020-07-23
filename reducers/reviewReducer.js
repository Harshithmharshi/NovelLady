
import { ADD_REVIEW, ADD_REVIEW_FAIL, 
    GET_REVIEW, GET_REVIEW_FAIL,
    EDIT_REVIEW, EDIT_REVIEW_FAIL, 
    CUSTOMER_REVIEW, CUSTOMER_REVIEW_FAIL
 } from '../actions/types';


const initialState = {
    token: localStorage.getItem("user_token"),
    isUserLogin: false,
    data: [],
    message: ''
};



function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_REVIEW:
            return {
                ...state,
                data: action.payload,
                isUserLogin: true,
            };
            break;
        case ADD_REVIEW_FAIL:
            return {
                isUserLogin: false,
                token: localStorage.removeItem("user_token"),
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
};


export const getReviewDetails=(state = initialState, action)=> {
    switch (action.type) {
        case GET_REVIEW:
            return {
                ...state,
                data: action.payload,
            };
            break;
        case GET_REVIEW_FAIL:
            return {
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
};


export const getEditReviewDetails=(state = initialState, action)=> {
    switch (action.type) {
        case EDIT_REVIEW:
            return {
                ...state,
                data: action.payload,
                isUserLogin: true,
            };
            break;
        case EDIT_REVIEW_FAIL:
            return {
                isUserLogin: false,
                token: localStorage.removeItem("user_token"),
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
};


export const getCustomerReviewDetails=(state = initialState, action)=> {
    switch (action.type) {
        case CUSTOMER_REVIEW:
            return {
                ...state,
                data: action.payload,
                isUserLogin: true,
            };
            break;
        case CUSTOMER_REVIEW_FAIL:
            return {
                isUserLogin: false,
                message: 'There was a problem while connecting to the server',
            };
            break;
        default:
            return state;
    }
};


export default reviewReducer;


