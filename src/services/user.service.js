import { authHeader } from '../helpers';
import { commonService } from './common.service'

export const userService = {
    login,
    logout,
    getAll,
    getById,
    createUser,
    searchUser
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch("/authorization-admin/api/token/login", requestOptions)
        .then(handleLogin)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll(appName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch("/authorization-admin/api/"+appName+"/users", requestOptions).then(commonService.handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch("/authorization-admin/api/users/"+id, requestOptions).then(commonService.handleResponse);
}

function createUser(data) {

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch("/authorization-admin/api/users", requestOptions).then(commonService.handleResponse);
}

function searchUser(query, value) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch("/authorization-admin/api/users?"+query+"="+value, requestOptions).then(commonService.handleResponse);
}

function handleLogin(response) {

    return response.text().then(text => {
            var data;
            try{
                data = JSON.parse(text);
            }catch(err){
                data = text;
            }
            if (!response.ok) {

                if (response.status === 401) {
                    return Promise.reject("Invalid Username/Password. Please try again.")
                }
                else{
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
            }
            return data;
        });

}
