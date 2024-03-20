import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import { applyMiddleware, createStore, compose } from "redux";
import multi from "redux-multi";
import movie_app_reducer from "./movie_app_reducer";

const loggerMiddleware = createLogger();

const composeEnhancer = compose(
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(loggerMiddleware);
}
middleware.push(multi);

const store = createStore(
  movie_app_reducer,
  compose(applyMiddleware(...middleware), composeEnhancer)
);

export default store;
