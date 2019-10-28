import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { DefaultLayout } from './containers';
import { Login, Page404, Page500, CreateUser } from './views/Pages';

import { connect } from 'react-redux';
import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './containers/PrivateRoute/PrivateRoute'

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
                        <BrowserRouter basename="/authorization-admin" history={history}>
                            <Switch>
                            <Route path="/login" name="Login Page" component={Login} />
                            <Route path="/404" name="Page 404" component={Page404} />
                            <Route path="/500" name="Page 500" component={Page500} />
                            <Route path="/users/create" name="Create User" component={CreateUser} />
                            <PrivateRoute name="Home" component={DefaultLayout} />
                            </Switch>
                        </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
