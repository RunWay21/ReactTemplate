import types from 'root/actions/types'

export function wait(id) {
    return {
        type: types.COMMON_LOADER_WAIT,
        id
    };
}

export function error(id) {
    return {
        type: types.COMMON_LOADER_ERROR,
        id
    };
}

export function ok(id) {
    return {
        type: types.COMMON_LOADER_OK,
        id
    };
}