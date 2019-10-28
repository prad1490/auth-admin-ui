import { userConstants } from '../constants';

export function users(state = {}, action) {
  switch (action.type) {
      case userConstants.GETBYID_REQUEST:
        return {
        ...state,
          loading: true
        };
      case userConstants.GETBYID_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.user
        };
      case userConstants.GETBYID_FAILURE:
        return {
          ...state,
          loading: false,
          getUserError: action.error
        };
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        getUserError: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
        case userConstants.USER_SEARCH_REQUEST:
          return {
            searchUserLoading: true
          };
        case userConstants.USER_SEARCH_SUCCESS:
          return {
            ...state,
            searchUserLoading: false,
            results: action.searchUser
          };
        case userConstants.USER_SEARCH_FAILURE:
          return {
          ...state,
          searchUserLoading: false,
            error: action.error
          };

      case userConstants.USERS_REGISTER_REQUEST:
            return {
                ...state,
               createUserLoading: true
            };
          case userConstants.USERS_REGISTER_SUCCESS:
            return {
                ...state,
                createUserLoading: false,
                createdUser: action.createdUser
            };
          case userConstants.USERS_REGISTER_FAILURE:
            return {
              createUserError: action.error
            };
    default:
      return state
  }
}
