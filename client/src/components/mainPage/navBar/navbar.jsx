import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "./navbar.css";

const NavigationalBar = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">
            <span className="title">DevTinder </span>
            <span className="byus">
              by Ricardo Bentin, Juan Varon, Patrick Wang, Nancy Louda, Matthew
              Bogard
            </span>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="/login">
            <i className="fas fa-sign-in-alt" />
            Login
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationalBar;
