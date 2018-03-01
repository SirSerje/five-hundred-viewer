import {render} from "react-dom";
import configureStore from "./store/MainStore";
import {Provider} from "react-redux"; //{} uses if export default
import App from "../src/components/AppComponent";
import React from "react";

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
