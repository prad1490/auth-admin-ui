import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { Link } from 'react-router-dom';

import { ownerActions } from '../../actions/owner.actions.js';

class Owners extends Component {

    componentDidMount() {
        this.props.dispatch(ownerActions.getOwners());
    }

    render() {
        const { owner } = this.props;
        return (
         <div className="animated fadeIn">
            <Row>
              <Col lg={6}>
              { owner.owners &&
                  <Card>
                    <CardHeader>
                      <strong><i className="icon-info pr-1"></i>All Owners</strong>
                    </CardHeader>
                    <CardBody>
                       <ReactTable
                        data={owner.owners.data}
                        filterable
                        defaultFilterMethod={(filter, row) =>filterCaseInsensitive(filter, row)}
                        columns={
                          [
                            {
                              Header: "ID",
                              accessor: "ownerId",
                              filterable: false,
                              Cell: row => (
                                <Link to={"/owners/" + row.value}>{row.value}</Link>
                              )
                            },
                            {
                              Header: "Name",
                              accessor: "ownerName",
                              filterMethod: (filter, row) => filterCaseInsensitive(filter, row)
                            },
                            {
                              Header: "Type",
                              accessor: "subType",
                              filterMethod: (filter, row) => filterCaseInsensitive(filter, row)
                            }
                          ]
                        }
                        defaultPageSize={10}
                        className="-striped -highlight"
                      />
                    </CardBody>
                  </Card>
                }
              </Col>
              </Row>
          </div>
          )
    }

}

function filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return (
        row[id] !== undefined ?
            String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
        :
            true
    );
}

function mapStateToProps(state) {
    const { owner } = state;
        return {
            owner
        };
}

const connectedPage = connect(mapStateToProps)(Owners);
export { connectedPage as Owners };