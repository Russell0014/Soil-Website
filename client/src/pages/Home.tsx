import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Card } from "react-bootstrap";
import rightArrow from "/arrow.svg";

function Home() {
  document.title = "SOIL | Home";

  return (
    <Container fluid className="col-lg-10">
      {/* Hero */}
      <Row className="p-5 pt-0 min-vh-100 d-flex align-items-center">
        <Col lg={6} sm={10} md={10} className="align-content-center">
          <div>
            <h1 className="mx-auto mw500">
              Discover the Finest <br /> Organic Products in <br /> Melbourne
            </h1>
            <p className="mx-auto mw500">
              At SOIL, we bring you the highest quality organic food, carefully
              sourced from local farms and delivered fresh to your doorstep.
              Join our movement towards sustainability and elevate your culinary
              experience today.
            </p>

            <div className="d-flex gap-3 mx-auto mw500">
              <a
                className="custom-bg-secondary"
                id="LandingPageShop"
                href="/specials"
              >
                Shop
              </a>
              <a
                className="custom-bg-primary"
                id="LandingPageLearnMore"
                href="#info"
              >
                Learn more
              </a>
            </div>
          </div>
        </Col>

        <Col lg={6} className="text-center align-content-center">
          <Image src="Vector.png" fluid className="mx-auto pt-4 mh550" />
        </Col>
      </Row>

      <Row className="px-5 py-3">
        <Col
          className="mx-lg-5 order-sm-2 order-md-2 d-flex align-items-center justify-content-center"
          id="info"
        >
          <div>
            <Row>
              <h2>Our Organic Journey</h2>
              <p>
                We're not just passionate about providing you with the highest
                quality organic food - we're committed to revolutionizing the
                way you think about sustainable living and holistic well-being.
                Founded in Melbourne with a vision to transform the local food
                landscape, SOIL has emerged as a leading advocate for organic
                farming practices and community education.
              </p>
            </Row>
            <Row>
              <Col sm={12} xl={6}>
                <h2>Sustainability</h2>
                <p>
                  Sustainability is at our core. We collaborate with local
                  farmers who share our values, ensuring our products are
                  eco-friendly. From reducing waste to minimizing food miles,
                  we're committed to a regenerative approach.
                </p>
              </Col>
              <Col sm={12} xl={6}>
                <h2>Community</h2>
                <p>
                  We're a hub for community engagement and education. In
                  addition to providing top-quality organic food, we offer
                  guides on diet, nutrition, and small-scale organic farming.
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          sm={12}
          lg={6}
          className=" text-center order-sm-1 order-md-1 align-content-center"
        >
          <Image src="home2.jpg" fluid className="rounded-4 mh400" />
        </Col>
      </Row>

      <Row className="p-lg-5 mx-5">
        <h2 className="text-center mb-5">Discover our features</h2>

        {/* FIX IMAGE AROUND 800px RESPONSIVE */}
        <Col sm={12} md={12} lg={6} className="p-lg-5 py-lg-3 mb-3 mb-md-4">
          <Image
            src="home3.jpg"
            className="mb-3 rounded-4 mx-auto d-block mh400"
            fluid
          ></Image>
          <h3>Garden Helper</h3>
          <p>
            Turn your outdoor space into a thriving oasis with our Garden Helper
            feature. From planting to harvesting, our tool provides the guidance
            and support you need to cultivate a beautiful and productive garden.
          </p>
        </Col>

        {/* FIX IMAGE AROUND 800px RESPONSIVE */}
        <Col sm={12} md={12} lg={6} className="p-lg-5 py-lg-3 mb-3 mb-md-4">
          {/*** CHANGE IMAGE ***/}
          <Image
            src="home5.jpg"
            className="mb-3 rounded-4 mx-auto d-block mh400"
            fluid
          ></Image>
          <h3>Diet Planner</h3>
          <p>
            Take the guesswork out of meal planning with our Diet Planner
            feature. Personalize your nutrition journey based on your dietary
            preferences and health goals, ensuring every bite aligns with your
            needs for optimal well-being.
          </p>
        </Col>
        <Col sm={12} md={12} lg={6} className="p-lg-5 py-lg-3 mb-3 mb-md-4">
          <h2 className="mb-3">Weekly Specials</h2>
          <p className="mb-lg-3">
            Explore our Weekly Specials for fresh deals every week! Discover
            hand picked selections of premium organic produce at unbeatable
            prices. Don't miss out - check back regularly for new offers!
          </p>

          <div className="d-flex gap-2">
            <a href="/specials">
              Shop Now
              <img src={rightArrow} height={50} className="px-2" />
            </a>
          </div>
        </Col>
        <Col sm={12} md={12} lg={6} className="p-lg-5 py-lg-3">
          <Row className="d-flex justify-content-center">
            <Col md={9} lg={12} xl={6}>
              <Card className="rounded-4 custom-bg-secondary2" border="0">
                <Card.Img variant="top" src="apple.png" alt="Fruit Image" />
                <Card.Body>
                  <Card.Title>Orchard Delights</Card.Title>
                  <Card.Text>
                    Handpicked, juicy fruits straight from the orchard.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={9} lg={12} xl={6}>
              <Card
                className="rounded-4 mt-5 mb-5 custom-bg-secondary2"
                border="0"
              >
                <Card.Img variant="top" src="potato.png" alt="Veg Image" />
                <Card.Body>
                  <Card.Title>Fresh Harvest</Card.Title>
                  <Card.Text>Locally sourced, farm-fresh vegetables.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
