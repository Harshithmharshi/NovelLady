import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR
} from "../constants/actionTypes";

const initialState = {
  token: localStorage.getItem("user_token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case AUTH_ERROR:
      localStorage.removeItem("user_token");
      return {
        ...state,
        isAuthenticated: null,
        isLoading: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default auth;
