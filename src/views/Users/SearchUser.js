import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, FormGroup, InputGroup,
 Input, InputGroupAddon, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { userActions } from '../../actions/user.actions.js';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

function getBadge(status){
    return status === 'ACTIVE' ? 'success' :
      status === 'STATGED' ? 'warning' :
        status === 'PROVISIONED' ? 'secondary' :
            'dander'
}

class SearchUser extends Component {

   constructor(props) {
       super(props);

       this.toggle = this.toggle.bind(this);
       this.handleClick = this.handleClick.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.state = {
         collapse: true,
         fadeIn: true,
         timeout: 300
       };
     }

     toggle() {
       this.setState({ collapse: !this.state.collapse });
   }

  handleClick(e){
     if(this.state.searchInput){
        this.props.dispatch(userActions.searchUser(e.target.innerText, this.state.searchInput));
     }
  }

  handleChange(e) {
      e.preventDefault();
      const { name, value} = e.target;
      this.setState({ [name]: value });
  }

  render() {
    const { users } = this.props;
    return (

      <div className="animated fadeIn">
        <Row>
        <Col>
            <FormGroup row>
                                <Col md="4"></Col>
                                <Col md="4">
                                  <InputGroup>
                                    <Input onChange={this.handleChange} type="text" id="searchInput" name="searchInput" placeholder="Search" />
                                    <InputGroupAddon addonType="append">
                                      <ButtonDropdown isOpen={this.state.second}
                                                      toggle={() => { this.setState({ second: !this.state.second }); }}>
                                        <DropdownToggle caret color="primary">
                                          Search by...
                                        </DropdownToggle>
                                        <DropdownMenu className={this.state.second ? 'show' : ''}>
                                          <DropdownItem onClick={ this.handleClick }>email</DropdownItem>
                                          <DropdownItem onClick={ this.handleClick }>name</DropdownItem>
                                        </DropdownMenu>
                                      </ButtonDropdown>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                                <Col md="4"></Col>
            </FormGroup>
            </Col>
        </Row>
        <Row>
          <Col>
          { users.results &&
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Search results <small className="text-muted">users</small>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={users.results.data}
                  columns={
                    [
                      {
                        Header: "ID",
                        accessor: "id",
                        Cell: row => (
                          <Link to={"/users/"+row.value}>{row.value}</Link>
                        )
                      },
                      {
                        Header: "First name",
                        accessor: "first_name"
                      },
                      {
                        Header: "Last name",
                        accessor: "last_name"
                      },
                      {
                        Header: "Email",
                        accessor: "email"
                      },
                      {
                        Header: "Created",
                        accessor: "created",
                        Cell: row => (
                                                  <Moment format="MM/DD/YYYY hh:mm:ss">{row.value}</Moment>
                                                )
                      },
                      {
                        Header: "Status",
                        accessor: "status",
                        Cell: row => (
                          <Badge color={getBadge(row.value)}>{row.value}</Badge>
                        )
                      },
                      {
                        Header: "Status changed",
                        accessor: "status_changed",
                        Cell: row => (
                            <Moment format="MM/DD/YYYY hh:mm:ss">{row.value}</Moment>
                                                )
                      },
                      {
                        Header: "Last updated",
                        accessor: "last_updated",
                        Cell: row => (
                                                  <Moment format="MM/DD/YYYY hh:mm:ss">{row.value}</Moment>
                                                )
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
    );
  }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const connectedPage = connect(mapStateToProps)(SearchUser);
export { connectedPage as SearchUser };
