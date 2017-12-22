import types from 'root/actions/types'
import initialState from 'root/reducer/initialState'

function clearState(state, id) {
    return {
        error: state.error.filter(x => x !== id),
        wait: state.wait.filter(x => x !== id)
    }
}

export default function (state = initialState.common.loader, action) {
    let newState;
    switch (action.type) {
        case types.COMMON_LOADER_WAIT:
            newState = clearState(state, action.id);
            newState.wait.push(action.id);
            return newState;
        case types.COMMON_LOADER_ERROR:
            newState = clearState(state, action.id);
            newState.error.push(action.id);
            return newState;
        case types.COMMON_LOADER_OK:
            return clearState(state, action.id);
        default:
            return state;
    }
}