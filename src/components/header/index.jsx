import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/Logo.png";
import "./header.scss";
import { Link } from "react-router-dom";
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
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
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/about" className="homepage-link">
                About
              </Link>
            </Nav.Link>
          </Nav>
          {user ? (
            <Nav>
              <Button variant="primary" className="mr-2">
                <Link to="/homepage" className="homepage-link">
                  Hello, {user.name}
                </Link>
              </Button>
              <Button variant="primary">
                <Link to="/logout" className="homepage-link">
                  Đăng xuất
                </Link>
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Button variant="primary" className="mr-2">
                <Link to="/signup" className="homepage-link">
                  Đăng ký
                </Link>
              </Button>
              <Button variant="primary">
                <Link to="/signin" className="homepage-link">
                  Đăng nhập
                </Link>
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
