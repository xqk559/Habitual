import * as actionTypes from './actionTypes';

export const selectedItemPairs = (pairs) => {
  return {
    type: actionTypes.SELECTED_ITEM_PAIRS,
    selectedPairs: pairs,
  }
}