import React, { Component } from 'react';
import { Container, Col, Row, Card, CardBody, Table, Form, Input, Button } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import

import { connect } from 'react-redux';
import { domainsActions } from '../../actions/domains.actions.js';
import { alertActions } from '../../actions/alert.actions.js';

const re = /^([A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,}$/;

class Domains extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.removeDomain = this.removeDomain.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(domainsActions.getDomains());
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value} = e.target;
        this.setState({ [name]: value });
    }

render() {
const domains = this.props.domains;
return (
    <div className="animated fadeIn">
    {domains.items ? (
    <Container>
     <Row>
       <Col xs="12" lg="6">
         <Card>
           <CardBody>
             <Table responsive>
               <thead>
                 <tr><th>VALID EMAIL DOMAINS</th></tr>
                </thead>
                <tbody>
                  {domains.items.map((v) => {
                    return <tr><td>{v}</td><td><Button onClick={() => this.removeDomain(v)} size="sm" color="danger"><i className="icon-close"></i></Button></td></tr>
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
    </Row>
    <Row>
        <Col xs="12" lg="6">
          <Card>
            <CardBody>
            <Form onSubmit={this.formSubmitHandler}>
              <Input onChange={this.handleChange} type="text" name="newDomain" id="newDomain"/>
              <Button> Add </Button>
            </Form>
            </CardBody>
          </Card>
        </Col>
    </Row>
    </Container>

) : (<div style={{fontSize: "100px"}}>
                          <Row><Col></Col>
                         <Col><i className="fa fa-spinner fa-10x fa-spin"></i></Col><Col></Col> </Row></div>)
}
</div>
 );
}

    formSubmitHandler(e) {

        e.preventDefault();
        this.props.dispatch(alertActions.clear());

        var newDomain = this.state.newDomain;
        if(!newDomain) return false;

        var existing = this.props.domains.items;
        if(existing.includes(newDomain)) {
            this.props.dispatch(alertActions.error("Domain " + newDomain + " is already in the list"));
            return false;
        }

        if(!re.test(newDomain)) {
            this.props.dispatch(alertActions.error(newDomain + " isn't a valid domain"));
            return false;
        }

        this.setState({newDomain: ""})
        existing.push(newDomain);
        this.props.dispatch(domainsActions.updateDomains(existing));

    }

    removeDomain(d) {

        this.props.dispatch(alertActions.clear());
        var newDomains = this.props.domains.items.filter(x => x !== d);

        if(newDomains.length < 1) {
            this.props.dispatch(alertActions.error("There must be at least one valid domain"));
            return false;
        }

        confirmAlert({
            title: 'Confirm to remove domain',
            message: 'Are you sure you want to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  this.props.dispatch(domainsActions.updateDomains(newDomains))
              },
              {
                label: 'No'
              }
            ]
        })

    }

}

function mapStateToProps(state) {
    return {
        user: state.authentication,
        domains: state.domains
    };
}

const connectedPage = connect(mapStateToProps)(Domains);

export { connectedPage as Domains };