import { SEND_CARTDETAILS } from "../constants/actionTypes";

const initialState = {
    data: '' ,
};

function sendCartDetails(state = initialState, action) {
    switch (action.type) {
        case SEND_CARTDETAILS:
            return {
                ...state,
                data: action.payload,
            }
            break;
        default:
            return state;
    }
};


export default sendCartDetails;


