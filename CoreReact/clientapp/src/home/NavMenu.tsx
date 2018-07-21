import * as React from 'react'
import { Link } from 'react-router-dom'
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './NavMenu1.css'
import logo from '../logo.svg'

export class NavMenu extends React.Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fluid collapseOnSelect className="react-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>
              <span>Core React</span>
              <img width={40} src={logo} className="react-logo" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/news'}>
              <NavItem>
                <Glyphicon glyph='cloud' /> News
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/northwind'}>
              <NavItem>
                <Glyphicon glyph='tent' /> Northwind
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/chinook'}>
              <NavItem>
                <Glyphicon glyph='music' /> Chinook
              </NavItem>
          </LinkContainer>
          <LinkContainer to={'/scaffold'}>
              <NavItem>
                <Glyphicon glyph='bishop' /> Scaffold
              </NavItem>
          </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
