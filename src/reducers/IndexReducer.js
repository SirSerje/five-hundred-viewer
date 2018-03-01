import { combineReducers } from "redux";
import { photos, page, favorites, photosError } from "./ItemsReducer";

export  default combineReducers({
	photos,
	photosError,
	page,
	favorites,
});
