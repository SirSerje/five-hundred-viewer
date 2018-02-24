import {ADD_ARTICLE, PHOTOS_FETCH} from "../constants/action-types";

const initialState = {
    articles: [],
    photos: [],
};

const rootReducer = (state = initialState, action) => {
    console.log("ROOT REDUCER:", action.type);
    switch (action.type) {

        case ADD_ARTICLE:
            /* this is bad way:
             state.articles.push(action.payload);
             return state;
             good way:*/
            return {
                ...state, articles: state.articles.concat(action.payload),
            };
        /*and better way - with babel-plugin-transform-object-rest-spread:
         return {...state, articles: [...state.articles,
         action.payload]};*/

        case PHOTOS_FETCH:
            /* this is bad way:
             state.articles.push(action.payload);
             return state;
             good way:*/
            return {
                ...state, photos: state.photos.concat(action.payload),
            };

        default:
            return state;
    }
};

export default rootReducer;