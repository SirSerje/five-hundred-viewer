import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./components/AppComponent";
import configureStore from "./store/MainStore";

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
