import { tokenConstants } from '../constants'

export function token(state = {}, action) {
  switch(action.type) {
    case tokenConstants.TOKEN_VERIFY_REQUEST:
      return {
        verifyingToken: true
      };
    case tokenConstants.TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        verifyingToken: false,
        parsedToken: action.parsedToken
      };
    case tokenConstants.TOKEN_VERIFY_FAILURE:
      return {
        ...state,
        verifyingToken: false,
        tokenError: action.error
      };
    default:
      return state
  }
}