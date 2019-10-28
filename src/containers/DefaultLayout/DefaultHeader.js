import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/mplatform.svg'

import { userActions } from '../../actions/user.actions.js';
import { alertActions } from '../../actions/alert.actions.js';

class DefaultHeader extends Component {
    // eslint-disable-next-line
    // const { children, ...attributes } = this.props;

    constructor(props) {
      super(props);
      this.state = {
            visible: true,
      };
      const { dispatch } = this.props;
      dispatch(alertActions.clear());
      this.handleLogout = this.handleLogout.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
      this.props.dispatch(alertActions.clear());
  }

    handleLogout(e) {
      e.preventDefault();
          const { dispatch } = this.props;
          dispatch(userActions.logout());

    }
    render() {
      const { user, alert } = this.props;
      return(
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 240, height: 60, alt: 'mPlatform' }}
          minimized={{ src: logo, width: 120, height: 30, alt: 'mPlatform' }}
        />

        <Nav>
            <NavItem className="px-3">
                        {alert.message &&
                                                    <Alert isOpen={this.state.visible} toggle={this.onDismiss} className={`alert ${alert.type}`}>{alert.message}</Alert>
                        }
                      </NavItem>
        </Nav>

        <Nav className="d-md-down-none" navbar>

          <NavItem className="px-3">
            <NavLink href="#">{user.username}</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Button block color="link" onClick={this.handleLogout}>Logout</Button>
          </NavItem>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    )
    }
};

function mapStateToProps(state) {
    const { authentication, alert } = state;
    const { user } = authentication;
    return {
        user,
        alert
    };
}

const connectedHomePage = connect(mapStateToProps)(DefaultHeader);
export { connectedHomePage as DefaultHeader };
