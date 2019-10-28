import {
  userConstants
} from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  loggedIn: true,
  user
} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loginError: action.error,
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return {
        ...state
      };
    default:
      return state
  }
}
