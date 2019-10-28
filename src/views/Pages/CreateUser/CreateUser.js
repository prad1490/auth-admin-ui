import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { userActions } from '../../../actions/user.actions.js';
import { Link } from 'react-router-dom';
import { alertActions } from '../../../actions/alert.actions.js';

class CreateUser extends Component {

    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        dispatch(alertActions.clear());

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            submitted: false
          };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value} = e.target;
        this.setState({ [name]: value });
      }

      handleSubmit(e) {
          e.preventDefault();
          this.props.dispatch(alertActions.clear());
              this.setState({ submitted: true });
              const { firstname, lastname, email } = this.state;
              const { dispatch } = this.props;
              if (firstname && lastname && email) {
                var data = {
                    "first_name": firstname,
                    "last_name": lastname,
                    "email" : email
                };
                  dispatch(userActions.createUser(data));
              }

        }


  render() {
    const { firstname, lastname, email } = this.state;
    const { alert, users } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={ this.handleSubmit }>
                    <h1>Create User</h1>
                    <p className="text-muted">Create an account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required type="text" placeholder="First Name" id="firstnameInput" name="firstname" autoComplete="firstname" value={firstname} onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required type="text" placeholder="Last Name" id="lastnameInput" name="lastname" autoComplete="lastname" value={lastname} onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input required type="text" placeholder="Email" id="email" name="email" autoComplete="email" value={email} onChange={this.handleChange} />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                    {
                        alert.message &&
                        <Row>
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        </Row>
                    }


                    <Row>
                        <Col>
                            <Link to="/dashboard">
                              <Button color="default" size="sm" block>Back home</Button>
                            </Link>
                        </Col>
                        {
                            users.createdUser &&
                            <Col>
                                <Link to={`/users/${users.createdUser.id}`}>
                                  <Button color="default" size="sm" block>{`Go to user ${users.createdUser.first_name} details`}</Button>
                                </Link>
                            </Col>
                        }
                    </Row>


                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { alert, users } = state;
    return {
        alert,
        users
    };
}

const connectedCreateUserPage = connect(mapStateToProps)(CreateUser);
export { connectedCreateUserPage as CreateUser };
