import * as actionTypes from '../actions/actionTypes';

let date = new Date().toString();

const initialState = [];

const addItem = (state, action) => {
    return [
        ...state,
        {
            id: action.id,
            name: action.item,
            completed: false,
            date: date.slice(0,15),
        }
    ];
};

//const getAxiosList = (state,action)

const removeItem = (state, action) => {
    let updatedState = state.filter(function( item ) {
        return item.id !== action.id;
    });
    return [...updatedState];
};

const checkboxClicked = (state, action) => {
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