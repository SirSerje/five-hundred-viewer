import { fetchPhotos, fetchPhotoDetail } from '../data/api';
import {itemsFetchDataSuccess} from "../actions/items";

export const PHOTOS_FETCH = 'FETCH_PHOTOS';
export const PHOTOS_ERROR = 'PHOTOS_ERROR';
export const PHOTOS_LOADED = 'PHOTOS_LOADED';

export const load_X_Photos = (page) => (dispatch) => {
    {console.log("LOAD PHOTOS")}
  let filter = "";
  dispatch({type: PHOTOS_FETCH, selectedFilter: filter});
  fetchPhotos(filter, page)
  .then(function(response){
    dispatch(photosLoaded(response.data.photos, response.data.current_page, filter));
      (response.data.photos);

  })
  .catch(function(err){
    dispatch(loadingError(err))
  });
}

function loadingError(message){
  return {
    type: PHOTOS_ERROR,
    message: message
  }
}

function photosLoaded(photos, page, filter){
  console.log("photos loaded",photos);
  return {
    type: PHOTOS_LOADED,
    photos: photos,
    page: page,
    selectedFilter: filter
  }
}
