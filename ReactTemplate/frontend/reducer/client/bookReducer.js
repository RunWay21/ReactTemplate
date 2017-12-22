import types from 'root/actions/types'
import initialState from 'root/reducer/initialState'

export default function (state = initialState.common.book, action) {
    switch (action.type) {
        case types.CLIENT_BOOK_GETBOOKS:
            return { ...state,
                page: action.page
            };
        case types.CLIENT_BOOK_GETBOOK:
            return { ...state,
                single: action.book
            };
        default:
            return state;
    }
}