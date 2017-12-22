import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducer from 'root/reducer';

function configureStoreProd(initialState) {
    return createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
}

function configureStoreDev(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                reduxImmutableStateInvariant(),
                thunk)
        )
    );
    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;