import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const hasWindow = typeof window === 'object'
const composeEnhancers = (hasWindow && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export default function configureStore(preloadedState ) {
    return createStore(rootReducer ,preloadedState,  composeEnhancers(
        applyMiddleware(thunk)
    ))
}