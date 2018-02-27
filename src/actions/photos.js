import {reactLocalStorage} from "reactjs-localstorage";
import {fetchPhotos} from "../data/api";
import {isEmptyObject} from "../utils/utils";
import _ from 'lodash'

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
        type: "FAVORITES_RESTORED",
        restored_favs: value,
    };
}
//Если произошла ошибка при загрузке. Не уверен, что так может быть
function restoreError(message) {
    return {
        type: "RESTORE_FAILED",
        message: "RESTORING FAVORITES FAILED, ERROR:" + message,
    };
}
//Если хранилище фаворитов пусто
function restoreEmpty(message) {
    return {
        type: "RESTORE_EMPTY",
        message: message, //TODO надо параметр с брошенной ошибки
    };
}


function FAVS_ADDED(MMM) {
    return {
        type: "FAVORITES_ADDED",
        favv_s: MMM,
    };
}

export const rmv_F_FAVS = (XCX) => (dispatch) => {
    let localStorageItems = reactLocalStorage.getObject("favorites");
    let storagedItems;
    if (!isEmptyObject(localStorageItems)) {
        storagedItems = favoritesRestored(JSON.parse(localStorageItems)).restored_favs;

    }


    let finalData;


    //Пакуем что вышло и сохраняем
    finalData= _.drop(storagedItems)

    a=>reactLocalStorage.setObject("favorites", JSON.stringify(finalData));

    dispatch(FAVS_ADDED(finalData));


}

export const add_X_to_FAVS = (NNN) => (dispatch) => {

    let localStorageItems = reactLocalStorage.getObject("favorites");
    let storagedItems;
    if (!isEmptyObject(localStorageItems)) {
        storagedItems = favoritesRestored(JSON.parse(localStorageItems));

    }

    let finalData = NNN;
    if (NNN != undefined && !isEmptyObject(NNN) && storagedItems != undefined) {
        finalData = NNN.concat(storagedItems.restored_favs)
        finalData = _.uniqBy(finalData, v => v.photo.image_url[0]);
    }


    //Пакуем что вышло и сохраняем
    if (finalData != undefined && !isEmptyObject(finalData)) {
        reactLocalStorage.setObject("favorites", JSON.stringify(finalData));
    }

    dispatch(FAVS_ADDED(finalData));
};

function loadingError(message) {
    return {
        type: "PHOTOS_ERROR",
        message: message,
    };
}

function photosLoaded(photos, page, filter, MMM) {
    return {
        type: "PHOTOS_LOADED",
        photos: photos,
        page: page,
        selectedFilter: filter,
    };
}
