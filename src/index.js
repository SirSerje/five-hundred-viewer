import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "../src/store/index";
import App from "../src/components/App";

render (
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById("root")
);

//import store from "./store/index";
//import { addArticle } from "./actions/index";
//window.store = store;
//window.addArticle = addArticle;