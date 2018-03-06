import {withRouter} from "react-router-dom";
import React from "react";
import "../../styles/main.css";
import {FAVORITE_BUTTON} from "../../constants/StyleTypes";


const FavoritesButtonComponent = withRouter(({history}) => (
	<button
		className={FAVORITE_BUTTON}
		type='button'
		onClick={() => {
			history.push("/favorites");
		}}
	>
        FAV
	</button>
));

export default FavoritesButtonComponent;