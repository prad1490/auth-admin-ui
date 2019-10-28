import {
  userConstants
} from '../constants/user.constants';
import {
  alertActions
} from './alert.actions';

import { userService } from '../services';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  getAll,
  getById,
  getPrivileges,
  getRoles,
  updatePrivileges,
  searchUser,
  createUser,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/authorization-admin');
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/authorization-admin/login');
    return { type: userConstants.LOGOUT };
}

function getAll(appName) {
    return dispatch => {
        dispatch(request());

        userService.getAll(appName)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getPrivileges(userId, appName) {
    return dispatch => {
        dispatch(request());

        userService.getPrivileges(userId, appName)
            .then(
                privileges => dispatch(success(privileges)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETPRIVILEGES_REQUEST } }
    function success(privileges) { return { type: userConstants.GETPRIVILEGES_SUCCESS, privileges } }
    function failure(error) { return { type: userConstants.GETPRIVILEGES_FAILURE, error } }
}

function updatePrivileges(userId, appName, data) {
    return dispatch => {
        dispatch(request());

        userService.updatePrivileges(userId, appName, data)
            .then(
                privileges => {

                    dispatch(success(data));
                    dispatch(alertActions.success('Updated roles successfully.'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                 }
            );
    };

    function request() { return { type: userConstants.UPDATEPRIVILEGES_REQUEST } }
    function success(privileges) { return { type: userConstants.UPDATEPRIVILEGES_SUCCESS, privileges } }
    function failure(error) { return { type: userConstants.UPDATEPRIVILEGES_FAILURE, error } }
}

function getRoles(appName) {
    return dispatch => {
        dispatch(request());

        userService.getRoles(appName)
            .then(
                roles => dispatch(success(roles)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETROLES_REQUEST } }
    function success(roles) { return { type: userConstants.GETROLES_SUCCESS, roles } }
    function failure(error) { return { type: userConstants.GETROLES_FAILURE, error } }
}

function getById(id) {

    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) {  return { type: userConstants.GETBYID_FAILURE, error } }
}

function searchUser(query, value) {
    return dispatch => {
        dispatch(request());

        userService.searchUser(query, value)
            .then(
                searchUser => dispatch(success(searchUser)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.USER_SEARCH_REQUEST } }
    function success(searchUser) { return { type: userConstants.USER_SEARCH_SUCCESS, searchUser } }
    function failure(error) { return { type: userConstants.USER_SEARCH_FAILURE, error } }
}

function createUser(userData) {
    return dispatch => {
        dispatch(request());

        userService.createUser(userData)
            .then(
                createdUser => {
                    dispatch(success(createdUser));
                    dispatch(alertActions.success('An email has been sent to '+userData.email+'.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.USERS_REGISTER_REQUEST} }
    function success(createdUser) { return { type: userConstants.USERS_REGISTER_SUCCESS, createdUser } }
    function failure(error) { return { type: userConstants.USERS_REGISTER_FAILURE, error } }
}