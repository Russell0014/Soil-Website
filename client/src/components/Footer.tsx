import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="pt-2">
      <Container>
        <Row className="align-items-center">
          <Col md={2}>
            <div className="d-flex justify-content-center">
              <h3>SOIL</h3>
            </div>
          </Col>

          <Col md={8}>
            <ul className="list-unstyled d-flex flex-wrap justify-content-center">
              <li className="mx-3">
                <a href="/diet-planner">Diet Planner</a>
              </li>
              <li className="mx-3">
                <a href="/garden-helper">Garden Helper</a>
              </li>
              <li className="mx-3">
                <a href="/specials">Weekly Specials</a>
              </li>
              <li className="mx-3">
                <a href="/about-us">About Us</a>
              </li>
            </ul>
          </Col>

          <Col md={2} className="d-flex justify-content-end">
            <a href="" className="mx-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material/24/facebook-new.png"
                alt="facebook-new"
              />
            </a>
            <a href="" className="mx-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material/24/instagram-new--v1.png"
                alt="instagram-new--v1"
              />
            </a>
            <a href="" className="mx-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material/24/linkedin--v1.png"
                alt="linkedin--v1"
              />
            </a>
          </Col>
        </Row>

        <div className="text-center">
          <div className="horizontal-divider"></div>
          <p>© 2024 Soil. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
