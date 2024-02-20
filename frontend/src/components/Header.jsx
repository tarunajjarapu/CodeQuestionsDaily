import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">Score Setter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="text-center ">
            <Nav.Link as={Link} to="/login">
              <FaSignInAlt /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              <FaUser /> Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
