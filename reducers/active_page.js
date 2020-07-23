import { ACTIVE_PAGE } from "../constants/actionTypes";

const initialState = {
  active_page: []
};

const activePageReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ACTIVE_PAGE:
      newState.active_page.push(action.data);
      break;
  }
  return newState;
};

export default activePageReducer;
