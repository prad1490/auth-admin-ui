import { tokenConstants } from '../constants/token.constants'
import { tokenService } from '../services/token.service'
import { alertActions } from './alert.actions';

export const tokenActions = {
    verify
};

function verify(token) {

    return dispatch => {

        dispatch(request());
        tokenService.verify(token)
            .then(
                parsedToken => {
                  dispatch(success(parsedToken));
                  dispatch(alertActions.success('Token parsed successfully.'));
                },
                error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
                }
            );

    };

    function request() { return { type: tokenConstants.TOKEN_VERIFY_REQUEST } }
    function success(parsedToken) { return { type: tokenConstants.TOKEN_VERIFY_SUCCESS, parsedToken } }
    function failure(error) { return { type: tokenConstants.TOKEN_VERIFY_FAILURE, error } }

}