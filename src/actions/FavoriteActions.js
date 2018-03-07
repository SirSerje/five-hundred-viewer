import _ from "lodash";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  FAVORITES_ADDED,
  FAVORITES_RESTORED,
  RESTORE_EMPTY
} from "../constants/ActionTypes";
import { isEmptyObject } from "../utils/Utils";

export const loadFromFavorites = value => dispatch => {
  let localStorageItems = reactLocalStorage.getObject("favorites");
  if (isEmptyObject(localStorageItems)) {
    dispatch(restoreEmpty("No Item at all"));
  } else {
    dispatch(favoritesRestored(JSON.parse(localStorageItems)));
  }
};

export const removeFromFavorites = value => dispatch => {
  let localStorageItems = reactLocalStorage.getObject("favorites");
  let storagedItems;
  if (!isEmptyObject(localStorageItems)) {
    storagedItems = JSON.parse(localStorageItems);
    var result = _.differenceBy(storagedItems, value, v => v.image_url[0]);
    reactLocalStorage.setObject("favorites", JSON.stringify(result));
    dispatch(favoritesRemoved(result));
  }
};

export const addToFavorites = value => dispatch => {
  let localStorageItems = reactLocalStorage.getObject("favorites");
  let storagedItems;
  if (!isEmptyObject(localStorageItems)) {
    storagedItems = JSON.parse(localStorageItems);
    favoritesRestored(storagedItems);
  }

  let finalData = value;
  if (
    value !== undefined &&
    !isEmptyObject(value) &&
    storagedItems !== undefined
  ) {
    finalData = value.concat(storagedItems);
    finalData = _.uniqBy(finalData, v => v.image_url[0]);
  }

  if (finalData !== undefined && !isEmptyObject(finalData)) {
    reactLocalStorage.setObject("favorites", JSON.stringify(finalData));
  }

  dispatch(favoritesAdded(finalData));
};

function favoritesRestored(value) {
  return {
    type: FAVORITES_RESTORED,
    favoriteItems: value
  };
}

function restoreEmpty(message) {
  return {
    type: RESTORE_EMPTY,
    message: message
  };
}

function favoritesAdded(value) {
  return {
    type: FAVORITES_ADDED,
    favoriteItems: value
  };
}

function favoritesRemoved(value) {
  return {
    type: FAVORITES_ADDED,
    favoriteItems: value
  };
}
