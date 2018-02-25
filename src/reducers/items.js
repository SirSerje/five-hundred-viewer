export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}


export function favorites(state = [], action) {
    console.log("reducers - favorites");

    switch (action.type) {
        case 'FAVORITES_ADDED':
            return action.favv_s;

        default:
            return state;
    }
}


export function photos(state = [], action) {
    console.log("reducers - photos")
    switch (action.type) {
        case 'PHOTOS_LOADED':
            return action.photos;

        default:
            return state;
    }
}

export function page(state = [], action) {
    console.log("reducers - page",  action.page)
    switch (action.type) {
        case 'PHOTOS_LOADED':
            return action.page;

        default:
            return state;
    }
}