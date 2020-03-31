import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const selectedItemPairs = (state, action) => {
  return [
    ...state,
    action.selectedPairs,
  ]
}

const reducer = (state = initialState, action) => {
  switch(action.type){
      case actionTypes.SELECTED_ITEM_PAIRS: return selectedItemPairs(state, action);
      default: return state;
  }
}

export default reducer;