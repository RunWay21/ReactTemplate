import {
    combineReducers
} from 'redux';
import common from './common';
import client from './client';

const reducer = combineReducers({
    common,
    client
});

export default reducer;