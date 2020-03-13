import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
};

let updatedList;

const addItem = (state, action) => {
    return updatedList
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM: return addItem(state, action);
        default: return state;
    }
};

export default reducer;