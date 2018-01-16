import React from 'react'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { isAuthenticated, logout } from './auth'

function handleClick(event) {
  return logout()
}

const Navigation = () =>
  isAuthenticated() ? (
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
          <LinkContainer to="/budget">
            <NavItem eventKey={2}>Budget</NavItem>
          </LinkContainer>
          <LinkContainer to="/">
            <NavItem>
              <Button bsSize="xsmall" onClick={handleClick}>
                Logout
              </Button>
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : (
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
