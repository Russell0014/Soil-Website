import { Col, Card, Row, Image } from "react-bootstrap";
import vegData from "../data/veg.json";
import { useState } from "react";

function VegGuide() {
  const numberOfObjects = Object.keys(vegData).length;
  const [selectedCard, setSelectedCard] = useState<number | undefined>();
  const [selectedVeg, setSelectedVeg] = useState<string | undefined>();

  const handleCardClick = (selectedCard: number) => {
    console.log(Object.keys(vegData)[selectedCard]);
    setSelectedCard(selectedCard);
    setSelectedVeg(Object.keys(vegData)[selectedCard]);
  };

  const renderCards = () => {
    const cards = [];

    for (let i = 0; i < numberOfObjects; i++) {
      cards.push(
        <Col
          key={i}
          lg={2}
          md={4}
          sm={6}
          xs={6}
          style={{ marginBottom: "2rem" }}
          className="align-content-center mx-auto"
        >
          <a href="#guide" style={{ textDecoration: "none" }}>
            <Card
              onClick={() => handleCardClick(i)}
              style={{
                boxShadow:
                  i === selectedCard ? "0px 4px 4px rgba(0, 0, 0, 0.45)" : "",
                minHeight: "160px",
                maxHeight: "170px",
                maxWidth: "140px",
              }}
              className="mx-auto align-content-center"
            >
              <Card.Body className=" align-content-center">
                <Card.Img
                  variant="top"
                  src={
                    "src/assets/vegIcons/" +
                    vegData[Object.keys(vegData)[i] as keyof typeof vegData]
                      .icon
                  }
                  className="mx-auto d-block"
                  style={{ maxHeight: "90px" }}
                />
                <Card.Title className="mx-auto text-center">
                  {Object.keys(vegData)[i].charAt(0).toUpperCase() +
                    Object.keys(vegData)[i].slice(1)}
                </Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
      );
    }

    return cards;
  };

  const guide = () => {
    return (
      <Row className="mx-auto align-content-center">
        <h2 id="guide" className="pb-4 text-center">
          Guide
        </h2>
        <Col lg={4} className="align-content-center">
          <Image
            src={
              "src/assets/vegImages/" +
              (selectedVeg &&
                vegData[selectedVeg as keyof typeof vegData]?.image)
            }
            fluid
            className="rounded-4 mh400 mx-auto d-block"
          />
          <h3 className="text-center pt-3">
            {selectedVeg
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h3>
        </Col>
        <Col lg={8}>
          <h4>Description</h4>
          <p>
            {selectedVeg &&
              vegData[selectedVeg as keyof typeof vegData]?.description}
          </p>
          <h4>Planting</h4>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {selectedVeg &&
              Object.entries(
                vegData[selectedVeg as keyof typeof vegData]?.planting || {}
              ).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}
                </li>
              ))}
          </ul>
        </Col>
        <a
          href="#selectVeg"
          className="custom-bg-primary"
          id="selectAnotherVeg"
        >
          Choose Another
        </a>
      </Row>
    );
  };

  return (
    <>
      <h2 className="text-center">Select A Vegetable</h2>
      <Row className="mx-auto align-content-center" id="selectVeg">
        {renderCards()}
      </Row>
      <Row className="mx-auto align-content-center mb-5">
        {selectedVeg !== undefined ? guide() : ""}
      </Row>
    </>
  );
}

export default VegGuide;
