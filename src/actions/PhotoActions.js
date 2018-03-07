import _ from "lodash";
import {
  FETCH_PHOTOS,
  PHOTOS_ERROR,
  PHOTOS_LOADED
} from "../constants/ActionTypes";
import { fetchPhotos } from "../data/Api";
import { filters } from "../constants/FilterTypes";

export const loadNewPhotos = (page, value) => dispatch => {
  //update collection, if not first page
  let filter =
    page === 1 || page.length === 0
      ? filters[_.random(0, filters.length - 1)].key
      : "";
  dispatch({ type: FETCH_PHOTOS, selectedFilter: filter });
  fetchPhotos(filter, page)
    .then(function(response) {
      dispatch(
        photosLoaded(
          value !== undefined
            ? value.concat(response.data.photos)
            : response.data.photos,
          response.data.current_page,
          filter,
          value
        )
      );
    })
    .catch(function(err) {
      dispatch(loadingError(err));
    });
};

function loadingError(message) {
  return {
    type: PHOTOS_ERROR,
    message: message
  };
}

function photosLoaded(photos, page, filter) {
  return {
    type: PHOTOS_LOADED,
    photos: photos,
    page: page,
    selectedFilter: filter
  };
}
