import {withRouter} from "react-router-dom";
import React from "react";

const TopButtonComponent = withRouter(({history}) => (
	<button
		className="btn btn-primary"
		type='button'
		onClick={() => {
			history.push("/");
		}}
	>
        HOT
	</button>
));

export default TopButtonComponent;