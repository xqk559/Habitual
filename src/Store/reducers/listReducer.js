import * as actionTypes from "../actions/actionTypes";

let userId = null;
if (localStorage.getItem("userId")) {
  userId = localStorage.getItem("userId");
}

let todaysDate = new Date().toString().slice(0, 15);

const initialState = [];

const addItem = (state, action) => {
  return [
    ...state,
    {
      id: action.id,
      name: action.item,
      completed: false,
      userId: userId,
      date: todaysDate,
    },
  ];
};

const addDefaultToState = (state, action) => {
  let updatedState = state.concat(action.defaults);
  return [...updatedState];
};

const removeItem = (state, action) => {
  let updatedState = state.filter(function (item) {
    return item.id !== action.id;
  });
  return [...updatedState];
};

const checkboxClicked = (state, action) => {
  return state.map((item) =>
    item.id === action.id ? { ...item, completed: !item.completed } : item
  );
};

const clearAll = (state, action) => {
  return [];
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return addItem(state, action);
    case actionTypes.REMOVE_ITEM:
      return removeItem(state, action);
    case actionTypes.CHECKBOX_CLICKED:
      return checkboxClicked(state, action);
    case actionTypes.ADD_DEFAULT_TO_STATE:
      return addDefaultToState(state, action);
    case actionTypes.CLEAR_ALL:
      return clearAll(state, action);
    default:
      return state;
  }
};

export default reducer;
