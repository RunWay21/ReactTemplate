import react from 'react'
import keyMirror from 'fbjs/lib/keyMirror'

const types = {
    CLIENT_BOOK_GETBOOKS: null,
    CLIENT_BOOK_GETBOOK: null,

    COMMON_LOADER_WAIT: null,
    COMMON_LOADER_ERROR: null,
    COMMON_LOADER_OK: null,
};

const mirror = keyMirror(types);

export default mirror;