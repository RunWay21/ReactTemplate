import types from 'root/actions/types'
import initialState from 'root/reducer/initialState'

export default function (state = initialState.common.loader, action) {
    switch (action.type) {
        case types.COMMON_LOADER_WAIT:
        case types.COMMON_LOADER_ERROR:
        case types.COMMON_LOADER_OK:
            const item = state.find(x => x.id === action.id);
            if (item && item.number > action.number)
                return state;
            let newState = state.filter(x => x.id !== action.id);
            newState.push({
                id: action.id,
                number: action.number,
                state: action.type
            });
            return newState;
        default:
            return state;
    }
}