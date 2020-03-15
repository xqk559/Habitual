import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    itemNames: [],
};

const addItem = (state, action) => {
    let updatedList = state.items.push(action.item);
    return {...state, ...updatedList};
};

const nameItem = (state, action) => {
    let updatedNames = state.itemNames.push(action.itemName);
    return {...state, ...updatedNames}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.NAME_ITEM: return nameItem(state, action);
        default: return state;
    }
};

export default reducer;