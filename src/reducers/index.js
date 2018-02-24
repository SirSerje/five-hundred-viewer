import {ADD_ARTICLE} from "../constants/action-types";

const initialState = {
    articles: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            /* this is bad way:
            state.articles.push(action.payload);
            return state;
            good way:*/
            return {...state, articles:
            state.articles.concat(action.payload)};
            /*and better way - with babel-plugin-transform-object-rest-spread:
            return {...state, articles: [...state.articles,
            action.payload]};*/
        default:
            return state;
    }
}

export default rootReducer;