import api from 'root/api'
import types from 'root/actions/types'
import * as loader from 'root/actions/common/loaderActions';
import counter from 'root/utils/counter';

export function getBooks(page) {
  return {
    type: types.CLIENT_BOOK_GETBOOKS,
    page
  };
}

export function getBooksAsync(filter) {
  return async (dispatch) => {
    const number = counter.next();
    try {
      dispatch(loader.wait(types.CLIENT_BOOK_GETBOOKS, number));
      var page = await api.client.book.getBooks(filter);
      dispatch(getBooks(page));
      dispatch(loader.ok(types.CLIENT_BOOK_GETBOOKS, number));
    } catch (error) {
      dispatch(loader.error(types.CLIENT_BOOK_GETBOOKS, number));
    }
  };
}

export function getBook(book) {
  return {
    type: types.CLIENT_BOOK_GETBOOK,
    book
  };
}

export function getBookAsync(id) {
  return async (dispatch) => {
    try {
      dispatch(loader.wait(types.CLIENT_BOOK_GETBOOK));
      var book = await api.client.book.getBook(id);
      dispatch(getBook(book));
      dispatch(loader.ok(types.CLIENT_BOOK_GETBOOK));
    } catch (error) {
      dispatch(loader.error(types.CLIENT_BOOK_GETBOOK));
    }
  };
}