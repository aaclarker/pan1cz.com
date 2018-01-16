import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Pan1cz</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav />
      <Nav pullRight>
        <LinkContainer to="/login">
          <NavItem eventKey={1}>Login</NavItem>
        </LinkContainer>
        <LinkContainer to="/budget">
          <NavItem eventKey={2}>Budget</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Navigation
