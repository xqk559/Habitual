import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const addItem = (state, action) => {
    return [
        ...state,
        {
            id: action.id,
            name: action.item,
            completed: false
        }
    ];
};

const removeItem = (state, action) => {
    let updatedList = state.splice(-1);
    return {...state, ...updatedList};
};

// const checkboxClicked = (state, action) => {
//     return state.items.map(item =>
//         items.id === action.id ? {...items}    
//     )
// }

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        default: return state;
    }
};

export default reducer;