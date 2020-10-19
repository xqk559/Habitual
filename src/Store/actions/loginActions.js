import * as actionTypes from "./actionTypes";

export const signUp = (token, userId, email) => {
  return {
    type: actionTypes.SIGN_UP,
    token: token,
    userId: userId,
    email: email,
  };
};

export const login = (token, userId, email) => {
  return {
    type: actionTypes.SIGN_UP,
    token: token,
    userId: userId,
    email: email,
  };
};

export const logout = () => {
  return {
    type: actionTypes.SIGN_UP,
  };
};
