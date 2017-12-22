import http from 'root/http';

export async function getBooks(page) {
    const response = await http.get('book/getbooks', {
        params: {
            page
        }
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