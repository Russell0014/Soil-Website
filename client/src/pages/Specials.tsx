import { Container, Row } from "react-bootstrap";
import ProductCards from "../components/ProductCards";

function Specials() {
  document.title = "SOIL | Weekly Specials";

  return (
    <Container fluid className="col-lg-8">
      <h1 className="text-center pt-4">Shop</h1>
      <p className="text-center">
        Fresh Deals Every Week: Explore Our Specials
      </p>
      <Row className="mx-auto align-content-center">
        <ProductCards />
      </Row>
    </Container>
  );
}

export default Specials;
