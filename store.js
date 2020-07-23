import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';
import {createBrowserHistory} from 'history';
import logger from 'redux-logger'
import rootReducer from "./reducers/index";
import {persistStore} from 'redux-persist'
import { fetchUserProfileApi } from "./actions/user_profile";
import userProfileReducer from "./reducers/user_profile";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history),thunk))
);

// export const persistor = persistStore(store);

export default store;
