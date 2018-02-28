import _ from "lodash";
import {reactLocalStorage} from "reactjs-localstorage";
import {
    FAVORITES_ADDED,
    FAVORITES_RESTORED,
    FETCH_PHOTOS,
    PHOTOS_ERROR,
    PHOTOS_LOADED,
    RESTORE_EMPTY,
    RESTORE_FAILED,
} from "../constants/ActionTypes";
import {fetchPhotos} from "../data/Api";
import {isEmptyObject} from "../utils/Utils";


export const loadNewPhotos = (page, value) => (dispatch) => {
    let filter = ""; //TODO фильтр можно будет заменить на что то
    dispatch({type: FETCH_PHOTOS, selectedFilter: filter});
    fetchPhotos(filter, page).then(function (response) {
        dispatch(photosLoaded(value != undefined ? value.concat(response.data.photos) : response.data.photos, response.data.current_page, filter, value));
    })
        .catch(function (err) {
            dispatch(loadingError(err));
        });
};


export const loadFromFavorites = (value) => (dispatch) => {
    let localStorageItems = reactLocalStorage.getObject("favorites");
    if (isEmptyObject(localStorageItems)) {
        dispatch(restoreEmpty("No Item at all"));
    } else {
        //TODO проверить возможность реализации catch
        dispatch(favoritesRestored(JSON.parse(localStorageItems)));
        /*.catch(function (err) {
         dispatch(restoreError(err));
         });*/
    }
};

export const removeFromFavorites = (value) => (dispatch) => {
    let localStorageItems = reactLocalStorage.getObject("favorites");
    let storagedItems;
    if (!isEmptyObject(localStorageItems)) {
        storagedItems = JSON.parse(localStorageItems);
        var result = _.differenceBy(storagedItems, value, v => v.image_url[0]);
        reactLocalStorage.setObject("favorites", JSON.stringify(result));
        dispatch(favoritesRemoved(result));
    }
};

export const addToFavorites = (value) => (dispatch) => {
    let localStorageItems = reactLocalStorage.getObject("favorites");
    let storagedItems;
    if (!isEmptyObject(localStorageItems)) {
        storagedItems = JSON.parse(localStorageItems);
        favoritesRestored(storagedItems);
    }

    let finalData = value;
    if (value != undefined && !isEmptyObject(value) && storagedItems != undefined) {
        finalData = value.concat(storagedItems);
        finalData = _.uniqBy(finalData, v => v.image_url[0]);
    }


    if (finalData != undefined && !isEmptyObject(finalData)) {
        reactLocalStorage.setObject("favorites", JSON.stringify(finalData));
    }

    dispatch(favoritesAdded(finalData));
};

function favoritesRestored(value) {
    return {
        type         : FAVORITES_RESTORED,
        favoriteItems: value,
    };
}
function restoreError(message) {
    return {
        type   : RESTORE_FAILED,
        message: "RESTORING FAVORITES FAILED, ERROR:" + message,
    };
}
function restoreEmpty(message) {
    return {
        type   : RESTORE_EMPTY,
        message: message,
    };
}


function favoritesAdded(value) {
    return {
        type         : FAVORITES_ADDED,
        favoriteItems: value,
    };
}

function favoritesRemoved(value) {
    return {
        type         : FAVORITES_ADDED,
        favoriteItems: value,
    };
}


function loadingError(message) {
    return {
        type   : PHOTOS_ERROR,
        message: message,
    };
}

function photosLoaded(photos, page, filter) {
    return {
        type          : PHOTOS_LOADED,
        photos        : photos,
        page          : page,
        selectedFilter: filter,
    };
}
