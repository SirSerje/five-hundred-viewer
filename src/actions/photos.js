import {fetchPhotos} from "../data/api";
import {reactLocalStorage} from 'reactjs-localstorage';

export const load_X_Photos = (page, NNN) => (dispatch) => {

    //{console.log("LOAD PHOTOS", page)}

    let filter = ""; //TODO фильтр можно будет заменить на что то

    dispatch({type: "FETCH_PHOTOS", selectedFilter: filter});
    fetchPhotos(filter, page).then(function (response) {
        dispatch(photosLoaded(NNN != undefined ? NNN.concat(response.data.photos) : response.data.photos, response.data.current_page, filter, NNN));
    })
        .catch(function (err) {
            dispatch(loadingError(err));
        });
};


export const add_X_to_FAVS = (NNN) => (dispatch) => {
    if(NNN != undefined) {
        reactLocalStorage.setObject('favs', JSON.stringify(NNN));
    }

    dispatch(FAVS_LOADDDED(NNN));
};

function FAVS_LOADDDED(MMM) {
    return {
        type  : "FAVORITES_ADDED",
        favv_s: MMM,
    };
}

function loadingError(message) {
    return {
        type   : "PHOTOS_ERROR",
        message: message,
    };
}

function photosLoaded(photos, page, filter, MMM) {
    //console.log("photos loaded",MMM);
    return {
        type          : "PHOTOS_LOADED",
        photos        : photos,
        page          : page,
        selectedFilter: filter,
    };
}
