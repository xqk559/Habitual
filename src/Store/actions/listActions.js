import * as actionTypes from './actionTypes';

export const addItem = (newItem) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: newItem,
    }
}

export const nameItem = (itemName) => {
    return {
        type: actionTypes.NAME_ITEM,
        itemName: itemName,
    }
}