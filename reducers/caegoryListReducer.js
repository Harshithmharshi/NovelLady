import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_START,
  CATEGORY_LIST_FAILURE
} from "../constants/actionTypes";

const initialState = {
  data: []
};

const categoryListReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CATEGORY_LIST_START:
      newState.loadingCategory = true;
      break;
    case CATEGORY_LIST_SUCCESS:
      newState.loadingCategory = false;
      newState.data = [...action.data];
      break;
    case CATEGORY_LIST_FAILURE:
      newState.categoryFailureMessage =
        "There was a problem while connecting to the server";
  }
  return newState;
};

export default categoryListReducer;
