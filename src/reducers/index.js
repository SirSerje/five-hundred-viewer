import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, photos, page, favorites } from './items';



export  default combineReducers({
    photos,
    page,
    favorites,
    items,
    itemsHasErrored,
    itemsIsLoading
});
