import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { allProducts, ProductType } from "../service/product";
import { CartConsumer } from "./CartContext";

function ProductCards() {
  // create or find cart
  const { cartId, addItem } = CartConsumer();

  const handleButtonClick = async (productId: number) => {
    try {
      if (cartId) {
        // just add one
        await addItem(productId, 1);
        toast.success("Product added to cart!");
      }
    } catch (e) {
      console.log(e);
      toast.warning("Failed to add item to cart!");
    }
  };

  // getting the product from the server
  const [data, setData] = useState<ProductType[] | null>(null);

  useEffect(() => {
    allProducts().then((value) => {
      setData(value);
    });
  }, []);

  if (data === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const numberOfProducts = data.length;
  const products = [];

  for (let i = 0; i < numberOfProducts; i++) {
    products.push(
      <Col
        key={i}
        xxl={3}
        xl={6}
        lg={6}
        md={6}
        sm={6}
        xs={6}
        style={{ marginBottom: "2rem" }}
        className="align-content-center"
      >
        <Card
          className="mx-auto align-content-center"
          style={{ minHeight: 350, maxHeight: 350, maxWidth: 280 }}
        >
          <Card.Body className="">
            <Link
              to={"/product/" + data[i].id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{ maxHeight: 180, minHeight: 100, overflow: "hidden" }}
              >
                {data[i].onSpecial ? (
                  <div
                    className=""
                    style={{
                      position: "absolute",
                      top: "20px",
                      zIndex: "3",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <img src="src/assets/specials/special2.svg" />
                  </div>
                ) : null}
                <div
                  style={{
                    maxHeight: "160px",
                  }}
                  className="rounded-2 overflow-hidden"
                >
                  <img
                    src={data[i].image}
                    className="mx-auto d-block rounded-2"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>

              <p className="pt-4">
                <b>
                  {data[i].name} | {data[i].size} {data[i].unit}
                </b>
              </p>
              <p>
                <b>${data[i].price}</b>
              </p>
            </Link>

            <Button
              variant="success"
              className="rounded-2 position-absolute d-flex justify-content-center"
              style={{
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                minWidth: "70%",
              }}
              onClick={() => {
                handleButtonClick(data[i].id);
              }}
            >
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return products;
}
export default ProductCards;
