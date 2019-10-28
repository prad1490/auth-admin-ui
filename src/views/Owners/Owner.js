import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { ownerActions } from '../../actions/owner.actions.js';

function TableBody(owner) {
  return (
    <tbody>
    <tr key='id'>
      <td>id</td>
      <td>{owner.owner.id}</td>
    </tr>
    <tr key='ownerName'>
      <td>Name</td>
      <td>{owner.owner.ownerName}</td>
    </tr>
    <tr key='subType'>
      <td>Last name</td>
      <td>{owner.owner.subType}</td>
    </tr>
    </tbody>
  )
}

class Owner extends Component {

    constructor(props) {
        super(props);

        this.state = {

          };
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.dispatch(ownerActions.getById(id));
    }

    render() {
        const { owner } = this.props;
        return (
          <div className="animated fadeIn">
            <Row>
              <Col lg={6}>
              { owner.owner &&
                <Card>
                  <CardHeader>
                    <strong><i className="icon-info pr-1"></i>Owner id: {this.props.match.params.id}</strong>
                  </CardHeader>
                  <CardBody>
                      <Table responsive striped hover>
                          <TableBody owner={owner.owner.data} />
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
    const { owner } = state;
    return {
        owner
    };
}

const connectedPage = connect(mapStateToProps)(Owner);
export { connectedPage as Owner };