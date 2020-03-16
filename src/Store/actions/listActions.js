import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addItem = (newItem) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: newItem,
        id: newItem + Math.random().toString(),
    }
}

export const removeItem = (itemId) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        id: itemId,
    }
}

export const checkboxClicked = (id) => {
    return {
        type: actionTypes.CHECKBOX_CLICKED,
        id: id
    }
}
