import { Container, Row, Col } from "react-bootstrap";
import VegGuide from "../components/VegGuide";

function GardenHelper() {
  document.title = "SOIL | Garden Helper";

  return (
    <Container fluid className="col-lg-8">
      <Row className="pt-5">
        <Col lg={6} md={10} className="mx-auto px-4 align-content-center">
          <h1>Garden Helper</h1>
          <p>
            Welcome to the SOIL Garden Helper! Get ready to dive into all the
            essentials for starting your own small vegetable garden. No matter
            if you've got a big backyard or a tiny balcony, we've got you
            covered with everything you need to grow your own fresh produce
          </p>
        </Col>
        <Col lg={6} md={10} className="mx-auto px-4">
          <img
            src="/gardenHelperHero.jpg"
            alt="Garden"
            className="img-fluid mx-auto d-block rounded"
          />
        </Col>
      </Row>
      <Row className="pt-5">
        <VegGuide />
      </Row>
    </Container>
  );
}

export default GardenHelper;
