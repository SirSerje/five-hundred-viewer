import {withRouter} from "react-router-dom";
import React from "react";

const FavoritesButtonComponent = withRouter(({history}) => (
	<button
		className="btn btn-warning"
		type='button'
		onClick={() => {
			history.push("/favorites");
		}}
	>
        FAV
	</button>
));

export default FavoritesButtonComponent;
