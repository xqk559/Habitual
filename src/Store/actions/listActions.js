import * as actionTypes from "./actionTypes";

export const addItem = (newItem) => {
  return {
    type: actionTypes.ADD_ITEM,
    item: newItem,
    id: newItem + Math.random().toString(),
  };
};

export const addDefaultToState = (defaults) => {
  return {
    type: actionTypes.ADD_DEFAULT_TO_STATE,
    defaults: defaults,
  };
};

export const removeItem = (itemId) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: itemId,
  };
};

export const checkboxClicked = (id) => {
  return {
    type: actionTypes.CHECKBOX_CLICKED,
    id: id,
  };
};

export const getAxiosList = () => {
  return {
    type: actionTypes.GET_AXIOS_LIST,
  };
};

export const clearAll = () => {
  return {
    type: actionTypes.CLEAR_ALL,
  };
};
