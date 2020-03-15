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

const checkboxClicked = (state, action) => {
    state.map(item=>console.log(action.id, item.id))
    return state.map(item =>
        item.id === action.id ? {...item, completed: !item.completed} : item    
    )
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        case actionTypes.CHECKBOX_CLICKED: return checkboxClicked(state, action);
        default: return state;
    }
};

export default reducer;