import { fetchPhotos, fetchPhotoDetail } from '../data/api';
import {itemsFetchDataSuccess} from "../actions/items";

export const PHOTOS_FETCH = 'FETCH_PHOTOS';
export const PHOTOS_ERROR = 'PHOTOS_ERROR';
export const PHOTOS_LOADED = 'PHOTOS_LOADED';

export const load_X_Photos = (page, NNN) => (dispatch) => {

    {console.log("LOAD PHOTOS", page)}

  let filter = ""; //TODO фильтр можно будет заменить на что то

  dispatch({type: PHOTOS_FETCH, selectedFilter: filter});
  fetchPhotos(filter, page)

  .then(function(response){

    dispatch(photosLoaded(NNN != undefined ? NNN.concat(response.data.photos) : response.data.photos, response.data.current_page, filter, NNN));

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

function photosLoaded(photos, page, filter, MMM){
  console.log("photos loaded",MMM);
  return {
    type: PHOTOS_LOADED,
    photos: photos,
    page: page,
    selectedFilter: filter
  }
}
