import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;


export default function configureStore(initialState) {
    return createStore(rootReducer ,/* preloadedState, */ composeEnhancers(
        applyMiddleware(thunk)
    ))
}