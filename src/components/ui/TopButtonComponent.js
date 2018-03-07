import {withRouter} from "react-router-dom";
import React from "react";
import "../../styles/main.css";

const TopButtonComponent = withRouter(({history}) => (
	<button
		className="top-button"
		type='button'
		onClick={() => {
			history.push("/");
		}}
	>
        HOT
	</button>
));

export default TopButtonComponent;