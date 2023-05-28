import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavbarKu() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/" className="mx-3">
        Makanan Sehat
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/" active={isActive("/")}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/edit-menu" active={isActive("/edit-menu")}>
          Edit Menu
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarKu;
