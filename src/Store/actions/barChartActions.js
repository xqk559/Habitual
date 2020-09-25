import * as actionTypes from "./actionTypes";

export const completedItemPairs = (pairs) => {
  return {
    type: actionTypes.COMPLETED_ITEM_PAIRS,
    completedPairs: pairs,
  };
};
