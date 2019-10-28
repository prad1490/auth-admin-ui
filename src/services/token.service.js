import {authHeader} from '../helpers'
import { commonService } from './common.service'

export const tokenService = {
    verify
}

function verify(data) {

    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({'token': data})
    }

    return fetch("/authorization-admin/api/token/verification", requestOptions).then(commonService.handleResponse);

}