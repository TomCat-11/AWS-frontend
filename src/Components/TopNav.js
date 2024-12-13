import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const TopNav = () => {
  return (
    <Navbar  expand="lg" className="bg-body-tertiary navbar-overlay">
      <Container fluid>
        <Navbar.Brand href="/home">
          <img style={{ width: "35px" }} src="./Images/house.svg" alt="home" />
        </Navbar.Brand>
        <Nav className="ms-auto">
            <Nav.Link href="/">
              <img style={{ width: "35px" }} src="./Images/logout.svg" alt="Logout" />
            </Nav.Link>
          </Nav>       
      </Container>
    </Navbar>
  );
};

export default TopNav;
