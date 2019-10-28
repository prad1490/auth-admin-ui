import { domainsConstants } from '../constants';

export function domains(state = {}, action) {
switch (action.type) {
    case domainsConstants.DOMAINS_GETALL_REQUEST:
        return {
            getDomainsLoading: true
        };
    case domainsConstants.DOMAINS_GETALL_SUCCESS:
        return {
            getDomainsLoading: false,
            items: action.domains
        };
    case domainsConstants.DOMAINS_GETALL_FAILURE:
        return {
            getDomainsError: action.error
        };
     case domainsConstants.DOMAINS_UPDATE_REQUEST:
        return {
            updateDomain: true
        };
     case domainsConstants.DOMAINS_UPDATE_SUCCESS:
        return {
            ...state,
            updateDomain: false,
            items: action.domain
        };
     case domainsConstants.DOMAINS_UPDATE_FAILURE:
        return {
            ...state,
            updateDomain: false,
            error: action.error
        };
     default:
        return state
}}