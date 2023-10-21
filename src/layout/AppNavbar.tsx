import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export const AppNavbar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Navbar
      expanded={expanded}
      bg="light"
      expand="lg"
      className="border-bottom"
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="nav-link" onClick={() => setExpanded(false)}>
            단어장
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Home
            </Link>
            <Link
              to="intro"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              소개
            </Link>
            <Link
              to="word"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              추가
            </Link>
            <Link
              to="signin"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              로그인
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
