import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, photos, page, favorites, photosError } from './ItemsReducer';

export  default combineReducers({
    photos,
    photosError,
    page,
    favorites,
    items,
    itemsHasErrored,
    itemsIsLoading
});
