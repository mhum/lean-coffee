import React from 'react';
import { Link, Router} from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
            <Navbar.Brand>
              <Link to={{pathname: '/'}} activeClassName='active'>
                Lean Coffee</Link>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/' activeClassName='active'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/sessions' activeClassName='active'>
              <NavItem eventKey={2}>Sessions</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
