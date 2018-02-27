
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


    switch (action.type) {
        case "RESTORE_EMPTY":
            return {};
        case "FAVORITES_RESTORED":
            return action.fvs;
        case "FAVORITES_ADDED":
            return action.fvs

        default:
            return state;
    }
}


export function photos(state = [], action) {
    switch (action.type) {
        case "PHOTOS_LOADED":
            return action.photos;

        default:
            return state;
    }
}

export function page(state = [], action) {
    switch (action.type) {
        case "PHOTOS_LOADED":
            return action.page;

        default:
            return state;
    }
}