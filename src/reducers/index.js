import {ADD_ARTICLE, PHOTOS_FETCH} from "../constants/action-types";
import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';
import { loadPhotos } from '../actions/photos';



export  default combineReducers({
    loadPhotos,
    items,
    itemsHasErrored,
    itemsIsLoading
});
