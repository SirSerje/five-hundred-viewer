import {reactLocalStorage} from "reactjs-localstorage";
import {fetchPhotos} from "../data/api";
import {isEmptyObject} from "../utils/utils";

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


//Эта штука в компонент фаворитов закинет по запросу сохранненые фавориты
export const ld_fvs = (DATA) => (dispatch) => {
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

function favoritesRestored(value) {
    return {
        type         : "FAVORITES_RESTORED",
        restored_favs: value,
    };
}
//Если произошла ошибка при загрузке. Не уверен, что так может быть
function restoreError(message) {
    return {
        type   : "RESTORE_FAILED",
        message: "RESTORING FAVORITES FAILED, ERROR:" + message,
    };
}
//Если хранилище фаворитов пусто
function restoreEmpty(message) {
    return {
        type   : "RESTORE_EMPTY",
        message: message, //TODO надо параметр с брошенной ошибки
    };
}


//TODO Тут обработаем доставание и складывание в фавориты
export const add_X_to_FAVS = (NNN) => (dispatch) => {
    if (NNN != undefined) {
        reactLocalStorage.setObject("favorites", JSON.stringify(NNN));
    }
    //TODO добавить проверку на уже сувществующие элементы в сторе


    dispatch(FAVS_ADDED(NNN));
};

function FAVS_ADDED(MMM) {
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
    return {
        type          : "PHOTOS_LOADED",
        photos        : photos,
        page          : page,
        selectedFilter: filter,
    };
}
