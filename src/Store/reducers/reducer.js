import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: ['penis'],
};

const addItem = (state, action) => {
    let updatedList = state.items.push(action.item);
    console.log(state.items);
    return {...state, ...updatedList};
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        default: return state;
    }
};

export default reducer;