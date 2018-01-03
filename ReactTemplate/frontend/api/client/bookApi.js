import http from 'root/http';
import { filterToQuery } from 'root/utils/url';

export async function getBooks(filter) {
    const response = await http.get('book/getbooks', {
        params: filterToQuery(filter)
    });
    return response.data;
}

export async function getBook(id) {
    const response = await http.get('book/getbook', {
        params: {
            id
        }
    });
    return response.data;
}

export async function saveBook(book) {
    await http.post('book/savebook', book);
}