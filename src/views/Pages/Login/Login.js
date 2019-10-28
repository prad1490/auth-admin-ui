import React, { Component} from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { userActions } from '../../../actions/user.actions.js';
import logo from '../../../assets/img/brand/logo-mplatform.svg';

class Login extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
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

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
          }
  }

  render() {
    const { username, password } = this.state;
    const { alert } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={ this.handleSubmit }>
                      <h1><img src={logo} alt="Logo" /></h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required type="email" name="username" id="emailInput" placeholder="Username" autoComplete="username" value={ username }

                          onChange={this.handleChange}

                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required type="password" placeholder="Password" name="password" id="passwordInput" autoComplete="current-password" value={ password }

                          onChange={this.handleChange}

                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>
                      {

                      alert.message &&
                      <Row>
                        <Col xs="12">
                          <Alert color='danger'>
                            {alert.message}
                          </Alert>
                        </Col>
                        </Row>
                      }
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };
