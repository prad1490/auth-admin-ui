import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import JSONTree from 'react-json-tree'

import { connect } from 'react-redux';

import { tokenActions } from '../../actions/token.actions.js';

class TokenVerification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tokenToParse: "",
      token: {}
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
   if(this.state.tokenToParse) {
     this.props.dispatch(tokenActions.verify(this.state.tokenToParse));
   }
 }

  render() {
    return (
    <div>
      <Form onSubmit={this.handleSubmit}>
        <Input onChange={this.handleChange} type="textarea" name="tokenToParse" id="textarea-input" rows="9" value={this.props.tokenToParse}
                                  placeholder="Paste Token Here" />
        <Button size="lg" color="primary">Verify</Button>
      </Form>
      <div>
        {this.props.token && this.props.token.parsedToken ?
          <JSONTree data={this.props.token.parsedToken} />
        : (<div style={{fontSize: "100px"}}></div>) }
      </div>
    </div>)}
}

function mapStateToProps(state) {
    return {
        user: state.authentication,
        tokenverification: state.tokenverification,
        tokenToParse: state.tokenToParse,
        token: state.token
    };
}

const connectedPage = connect(mapStateToProps)(TokenVerification);

export { connectedPage as TokenVerification };