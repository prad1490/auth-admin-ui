import { commonService } from './common.service'

export const ownerService = {
    getOwners,
    getById
}

function getOwners() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch("/authorization-admin/api/owners", requestOptions).then(commonService.handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch("/authorization-admin/api/owners/" + id, requestOptions).then(commonService.handleResponse);
}