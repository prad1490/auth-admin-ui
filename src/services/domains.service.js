import { authHeader } from '../helpers';
import { commonService } from './common.service'

export const domainsService = {
    getDomains,
    updateDomains
};

function getDomains() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch("/authorization-admin/api/domains", requestOptions).then(commonService.handleResponse);
}

function updateDomains(data) {

    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    return fetch("/authorization-admin/api/domains", requestOptions).then(commonService.handleResponse);

}