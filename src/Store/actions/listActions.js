import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addItem = (newItem) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: newItem,
        id: newItem + Math.random().toString(),
    }
}

export const removeItem = () => {
    return {
        type: actionTypes.REMOVE_ITEM,
    }
}

export const checkboxClicked = () => {
    return {
        type: actionTypes.CHECKBOX_CLICKED,
    }
}
