import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { userActions } from '../../actions/user.actions.js';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Moment from 'react-moment';
import 'moment-timezone';

function TableBody(user) {

  return (
    <tbody>
    <tr key='id'>
      <td>id</td>
      <td>{user.user.id}</td>
    </tr>
    <tr key='firstname'>
      <td>First name</td>
      <td>{user.user.first_name}</td>
    </tr>
    <tr key='lastname'>
      <td>Last name</td>
      <td>{user.user.last_name}</td>
    </tr>
    <tr key='email'>
      <td>Email</td>
      <td>{user.user.email}</td>
    </tr>
    <tr key='created'>
      <td>Created</td>
      <td><Moment format="MM/DD/YYYY hh:mm:ss">{user.user.created}</Moment></td>
    </tr>
    <tr key='status'>
      <td>Status</td>
      <td>{user.user.status}</td>
    </tr>
    <tr key='status_changed'>
      <td>Status changed</td>
      <td><Moment format="MM/DD/YYYY hh:mm:ss">{user.user.status_changed}</Moment></td>
    </tr>
    <tr key='activated'>
      <td>Activated</td>
      <td><Moment format="MM/DD/YYYY hh:mm:ss">{user.user.activated}</Moment></td>
    </tr>
    <tr key='last_updated'>
      <td>Last updated</td>
      <td><Moment format="MM/DD/YYYY hh:mm:ss">{user.user.last_updated}</Moment></td>
    </tr>
    </tbody>
  )
}

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {

      };
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.props.dispatch(userActions.getById(id));
  }

  render() {
    const { users } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
          { users.user &&
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                      <TableBody user={users.user} />
                  </Table>
              </CardBody>
            </Card>
          }
          </Col>
          </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const connectedPage = connect(mapStateToProps)(User);
export { connectedPage as User };