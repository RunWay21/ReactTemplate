import { combineReducers } from 'redux';
import book from './bookReducer';

const reducer = combineReducers({
    book
});

export default reducer;