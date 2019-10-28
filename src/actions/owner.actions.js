import { ownerConstants } from '../constants/owner.constants'
import { ownerService } from '../services/owner.service'

export const ownerActions = {
    getOwners,
    getById
}

function getOwners() {
    return dispatch => {
        dispatch(request());
        ownerService.getOwners()
            .then(
                owners => dispatch(success(owners)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: ownerConstants.OWNERS_GET_ALL_REQUEST }}
    function success(owners) { return { type: ownerConstants.OWNERS_GET_ALL_SUCCESS, owners }}
    function failure(error) { return { type: ownerConstants.OWNERS_GET_ALL_FAILURE, error }}

}

function getById(id) {
    return dispatch => {
        dispatch(request());
        ownerService.getById(id)
            .then(
                owner => dispatch(success(owner)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: ownerConstants.OWNER_GET_BY_ID_REQUEST } }
    function success(owner) { return { type: ownerConstants.OWNER_GET_BY_ID_SUCCESS, owner } }
    function failure(error) {  return { type: ownerConstants.OWNER_GET_BY_ID_FAILURE, error } }

}