import {withRouter} from "react-router-dom";
import React from "react";
import "../../styles/main.css";
import {TOP_BUTTON} from "../../constants/StyleTypes";


const TopButtonComponent = withRouter(({history}) => (
	<button
		className={TOP_BUTTON}
		type='button'
		onClick={() => {
			history.push("/");
		}}
	>
        HOT
	</button>
));

export default TopButtonComponent;