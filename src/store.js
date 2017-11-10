import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./Reducers/index";
import { sagas } from "./Sagas/index";

//Add the middleware
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(browserHistory));

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// create the store
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);

export  { store, history };
