
import {SEND_CARTDETAILS } from "../constants/actionTypes";


export const sendCartData = (data) => {
  return {
    type: SEND_CARTDETAILS,
    payload: data,
  };
};



export const sendCartDetails = data => (dispatch) => {
    return dispatch(sendCartData(data));
  };

  