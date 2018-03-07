import { withRouter } from "react-router-dom";
import React from "react";
import "../../styles/main.css";

const FavoritesButtonComponent = withRouter(({ history }) => (
  <button
    className="favorite-button"
    type="button"
    onClick={() => {
      history.push("/favorites");
    }}
  >
    FAV
  </button>
));

export default FavoritesButtonComponent;
