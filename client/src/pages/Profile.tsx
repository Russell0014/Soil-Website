import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { AuthConsumer } from "../components/AuthContext";
import { toast } from "react-toastify";

function Profile() {
  // todo: add icons
  const { logout } = AuthConsumer();

  return (
    <Container fluid className="col-lg-9">
      <h2>Profile settings</h2>
      <Row>
        <Nav className="col-auto d-flex flex-column gap-2 flex-shrink-0 p-5 border">
          <Link to="./" className="nav-link text-decoration-none text-reset">
            Profile
          </Link>
          <Link
            to="./diet-plan"
            className="nav-link text-decoration-none text-reset"
          >
            My Diet Plan
          </Link>
          <Nav.Link
            onClick={() => {
              toast.success("You logged out! See you soon!");
              logout();
            }}
            className="nav-link text-decoration-none text-reset"
          >
            Logout
          </Nav.Link>
        </Nav>
        <Col className="p-5">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
