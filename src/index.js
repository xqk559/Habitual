import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import listReducer from "./Store/reducers/listReducer.js";
import loginReducer from "./Store/reducers/loginReducer";
import barChartReducer from "./Store/reducers/barChartReducer";
import selectedItemReducer from "./Store/reducers/selectedItemReducer";
import { BrowserRouter } from "react-router-dom";

const rootReducer = combineReducers({
  listReducer: listReducer,
  loginReducer: loginReducer,
  barChartReducer: barChartReducer,
  selectedItemReducer: selectedItemReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
