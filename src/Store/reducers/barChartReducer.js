import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const completedItemPairs = (state, action) => {
  return [
    ...state,
    action.completedPairs,
  ]
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.COMPLETED_ITEM_PAIRS: return completedItemPairs(state, action);
    default: return state;
  }
}

export default reducer;