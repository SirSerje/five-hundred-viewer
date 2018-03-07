import {
  FAVORITES_ADDED,
  FAVORITES_RESTORED,
  PHOTOS_LOADED,
  RESTORE_EMPTY,
  PHOTOS_ERROR
} from "../constants/ActionTypes";

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
