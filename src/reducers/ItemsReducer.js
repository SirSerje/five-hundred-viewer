import {
	FAVORITES_ADDED,
	FAVORITES_RESTORED,
	ITEMS_FETCH_DATA_SUCCESS,
	ITEMS_HAS_ERRORED,
	ITEMS_IS_LOADING,
	key,
	PHOTOS_LOADED,
	RESTORE_EMPTY,
	PHOTOS_ERROR
} from "../constants/ActionTypes";

export function itemsHasErrored(state = false, action) {
	switch (action.type) {
	case ITEMS_HAS_ERRORED:
		return action.hasErrored;

	default:
		return state;
	}
}

export function itemsIsLoading(state = false, action) {
	switch (action.type) {
	case ITEMS_IS_LOADING:
		return action.isLoading;

	default:
		return state;
	}
}

export function items(state = [], action) {
	switch (action.type) {
	case ITEMS_FETCH_DATA_SUCCESS:
		return action.items;

	default:
		return state;
	}
}

export function favorites(state = [], action) {
	switch (action.type) {
	case RESTORE_EMPTY:
		return {};
	case FAVORITES_RESTORED:
		return action.favoriteItems;
	case FAVORITES_ADDED:
		return action.favoriteItems;

	default:
		return state;
	}
}
export function photosError(state = [], action) {
	switch (action.type) {
	case PHOTOS_LOADED:
		return "";
	case PHOTOS_ERROR:
		return action.message;
	default:
		return state;
	}
}

export function photos(state = [], action) {
	switch (action.type) {
	case PHOTOS_LOADED:
		return action.photos;
	default:
		return state;
	}
}

export function page(state = [], action) {
	switch (action.type) {
	case PHOTOS_LOADED:
		return action.page;
	default:
		return state;
	}
}