import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>Lean Coffee</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href='/'>Home</NavItem>
          <NavItem eventKey={2} href='/sessions'>Sessions</NavItem>
        </Nav>
      </Navbar>
    );
  }
});
