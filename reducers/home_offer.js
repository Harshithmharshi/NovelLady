import { HOME_OFFER_SUCCESS, HOME_OFFER_START } from "../constants/actionTypes";

const initialState = {
  homeData: []
};

const homeOfferReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case HOME_OFFER_START:
      newState.loadingHomeOffer = true;
      break;
    case HOME_OFFER_SUCCESS:
      newState.loadingHomeOffer = false;
      newState.homeData = [...action.data];
      break;
  }
  return newState;
};

export default homeOfferReducer;
