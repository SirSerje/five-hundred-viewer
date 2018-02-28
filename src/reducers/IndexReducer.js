import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, photos, page, favorites } from './ItemsReducer';

export  default combineReducers({
    photos,
    page,
    favorites,
    items,
    itemsHasErrored,
    itemsIsLoading
});
