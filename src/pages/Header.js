import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
function Header() {
    return (
        <div>
            <>
  <Navbar bg="light">
    <Container>
      <Navbar.Brand href="#home">Brand link</Navbar.Brand>
    </Container>
  </Navbar>
  <br />
  <Navbar bg="light">
    <Container>
      <Navbar.Brand>Brand text</Navbar.Brand>
    </Container>
  </Navbar>
  <br />
  <Navbar bg="dark">
  <Container>
    <Navbar.Brand href="#home">
      <img
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
  </Container>
  </Navbar>
  <br />
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      Bill-Stack
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">Mark Otto</a>
      </Navbar.Text>
    </Navbar.Collapse>

    </Container>
  </Navbar>
</>
        </div>
    )
}

export default Header