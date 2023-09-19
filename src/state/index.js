import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { loadSession } from "../helpers/localStorageHelper";

import cardsReducer from "./reducers/cardsReducer";

import { actions as CardsActions } from "./actions/cardsActions";

// Import previous session
const persistedSession = loadSession();

// Add them to this object
const reducers = {
  cards: cardsReducer,
};

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const middlewares = [thunk];
const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  return combinedReducers(
    action.type === CardsActions.clearSession ? undefined : state,
    action
  );
};

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  persistedSession,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
