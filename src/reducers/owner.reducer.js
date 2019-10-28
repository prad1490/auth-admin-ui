import { ownerConstants } from '../constants';

export function owner(state = {}, action) {
    switch(action.type) {
        case ownerConstants.OWNERS_GET_ALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ownerConstants.OWNERS_GET_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                owners: action.owners
            };
        case ownerConstants.OWNERS_GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                getOwnersError: action.error
            };
        case ownerConstants.OWNER_GET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ownerConstants.OWNER_GET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                owner: action.owner
            };
        case ownerConstants.OWNER_GET_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                getOwnerError: action.error
            };
        default:
            return state
    }
}