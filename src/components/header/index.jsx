import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/Logo.png";
import "./header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/homepage" className="homepage-link">
              <img
                alt=""
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Home Management
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/homepage" className="homepage-link">
              Homepage
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/about" className="homepage-link">
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about" className="homepage-link">
                Contact
              </Link>
            </Nav.Link>
          </Nav>
          <Navbar.Collapse id="navbarScroll" bg="primary" data-bs-theme="light">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" className="button-search-nav">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
