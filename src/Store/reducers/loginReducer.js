import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const signup = (state, action) => {
    let updatedState = [{
        token: action.token,
        userId: action.userId,
        email: action.email,
    }]
    return [
        ...state,
        ...updatedState,
    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGN_UP: return signup(state,action);
        default: return state; 
    }
}

export default reducer;