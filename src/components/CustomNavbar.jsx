import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = (props) => {
  return (
    <Navbar expand="lg" fixed="top" className="bg-white">
      <Container>
        <Navbar.Brand href="/">RRI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav>
            <Nav.Link style={{fontSize:13}} href="/">Home</Nav.Link>
            <Nav.Link style={{fontSize:13}} href="/about">About</Nav.Link>
            <Nav.Link style={{fontSize:13}} href="/contacts">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar