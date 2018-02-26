
export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case "ITEMS_HAS_ERRORED":
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case "ITEMS_IS_LOADING":
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case "ITEMS_FETCH_DATA_SUCCESS":
            return action.items;

        default:
            return state;
    }
}

/*var a = [];
 var b = 1;*/
export function favorites(state = [], action) {
    /*    if (a.length == 0 && action.favv_s) {
     a[b] = action.favv_s[0];
     b++;
     }
     if (action.favv_s) {
     for (var i in a) {
     if(action.favv_s[0].photo.image_url[0]== a[i].photo.image_url[0]) {
     console.log("ITEM PRESENT")
     }
     }
     }*/





    switch (action.type) {
        case "FAVORITES_ADDED":
            console.log("Отдаем фаворитов", action.favv_s);
            return action.favv_s;

        default:
            return state;
    }
}


export function photos(state = [], action) {
    //console.log("reducers - photos")
    switch (action.type) {
        case "PHOTOS_LOADED":
            return action.photos;

        default:
            return state;
    }
}

export function page(state = [], action) {
    //console.log("reducers - page",  action.page)
    switch (action.type) {
        case "PHOTOS_LOADED":
            return action.page;

        default:
            return state;
    }
}