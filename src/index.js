//import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";

//Render the main components
ReactDOM.render(
  <Provider store = {store}>
  {router}
  </Provider>, document.getElementById('root')
);
