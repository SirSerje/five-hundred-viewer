import {ADD_ARTICLE, PHOTOS_FETCH} from "../constants/action-types";
import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, photos } from './items';



export  default combineReducers({
    photos,
    items,
    itemsHasErrored,
    itemsIsLoading
});
