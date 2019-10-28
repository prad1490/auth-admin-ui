import { domainsConstants } from '../constants/domains.constants'
import { domainsService } from '../services/domains.service';
import { alertActions } from './alert.actions';

export const domainsActions = {
    getDomains,
    updateDomains
};

function getDomains() {

   return dispatch => {

        dispatch(request());

        domainsService.getDomains()
            .then(
                domains => dispatch(success(domains)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: domainsConstants.DOMAINS_GETALL_REQUEST } }
    function success(domains) { return { type: domainsConstants.DOMAINS_GETALL_SUCCESS, domains } }
    function failure(error) { return { type: domainsConstants.DOMAINS_GETALL_FAILURE, error } }
}

function updateDomains(d) {
    return dispatch => {
        dispatch(request());
        domainsService.updateDomains(d)
            .then(
                domain => {
                    dispatch(success(d));
                    dispatch(alertActions.success('Updated domains successfully.'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: domainsConstants.DOMAINS_UPDATE_REQUEST } }
    function success(domain) { return { type: domainsConstants.DOMAINS_UPDATE_SUCCESS, domain } }
    function failure(error) { return { type: domainsConstants.DOMAINS_UPDATE_FAILURE, error } }

}