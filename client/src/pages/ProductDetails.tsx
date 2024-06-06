import {
  Container,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { findProductByID, ProductType } from "../service/product";
import { checkProductInCart } from "../service/cart";
import { CartConsumer } from "../components/CartContext";
import ReviewContainer from "../components/ReviewContainer";

function ProductDetails() {
  const productID = Number(useParams().id);

  const { cartId, deleteItem, updateItem, addItem, userCart } = CartConsumer();
  const [productInCartData, setProductInCart] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // useEffect for productInCart
  useEffect(() => {
    if (cartId) {
      checkProductInCart(cartId, productID).then((value) => {
        if (value !== null) {
          setProductInCart(value);
        } else {
          setProductInCart(null);
        }
      });
    }
  }, [cartId, productID, quantity, deleteItem, updateItem, addItem]);

  //useEffect for quantity
  useEffect(() => {
    if (cartId) {
      checkProductInCart(cartId, productID).then((value) => {
        if (value !== null) {
          setQuantity(value.quantity);
        }
      });
    }
  }, [cartId, productID, userCart]);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect for getting product by ID
  useEffect(() => {
    setIsLoading(true);
    findProductByID(productID).then((res) => {
      setProduct(res);
      setIsLoading(false);
    });
  }, [productID]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!product) return <Navigate to="/404" replace />;
  document.title = "SOIL | Product";

  return (
    <Container fluid className="col-lg-8 mb-5">
      <Row className="pt-4">
        <Link to="/specials" className="pb-3">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/long-arrow-left.png"
            alt="long-arrow-left"
            className="me-2"
          />
          Back to products
        </Link>

        <Col xs={12} md={6}>
          <div style={{ position: "relative" }}>
            {product.onSpecial && (
              <div
                className="mx-3 my-3"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: "3",
                  width: "100px",
                  height: "100px",
                }}
              >
                <img src="/src/assets/specials/special2.svg" />
              </div>
            )}
            <Image
              src={`/${product.image}`}
              className="rounded-4"
              alt={product.name}
              fluid
            />
          </div>
        </Col>
        <Col>
          <h2 className="pt-4">${product.price}</h2>
          <h3 className="fw-bold">
            {product.name} | {product.size} {product.unit}
          </h3>

          {product.onSpecial && (
            <div className="pb-4">
              <span className="bg-warning rounded-3 py-1 px-3">
                On special!
              </span>
            </div>
          )}

          <div className="d-flex justify-content-start align-items-center gap-2">
            <InputGroup className="w-25">
              <InputGroup.Text
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    if (cartId && productInCartData !== null)
                      updateItem(productID, Number(quantity - 1));
                  }
                }}
              >
                -
              </InputGroup.Text>
              <Form.Control
                name="number"
                value={quantity}
                className="text-center no-border-on-focus"
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(Number(value))) {
                    setQuantity(1);
                  } else {
                    const quantity =
                      value === ""
                        ? ""
                        : Math.min(100, Math.max(1, Number(value)));

                    //@ts-expect-error Don't know how to fix it
                    setQuantity(quantity);
                    if (
                      cartId &&
                      productInCartData !== null &&
                      Number(quantity) > 0
                    )
                      updateItem(product.id, Number(quantity));
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "" || isNaN(Number(e.target.value))) {
                    setQuantity(1);
                    if (cartId && productInCartData !== null)
                      updateItem(product.id, 1);
                  }
                }}
              />
              <InputGroup.Text
                onClick={() => {
                  if (quantity < 100) {
                    setQuantity(quantity + 1);
                    if (cartId && productInCartData !== null)
                      updateItem(productID, Number(quantity + 1));
                  }
                }}
              >
                +
              </InputGroup.Text>
            </InputGroup>

            {productInCartData === null && (
              <Button
                variant="success"
                onClick={async () => {
                  try {
                    if (cartId) {
                      await addItem(productID, quantity);
                      toast.success("Product added to cart!");
                    }
                  } catch (e) {
                    console.log(e);
                    toast.warning("Failed to add item to cart!");
                  }
                }}
              >
                Add to cart
              </Button>
            )}

            {productInCartData !== null && (
              <Button
                variant="danger"
                onClick={async () => {
                  try {
                    if (cartId) {
                      deleteItem(productID);
                      toast.warning("Item removed from cart!");
                    }
                  } catch (e) {
                    toast.warning("Failed to remove item from cart!");
                  }
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Col className="mb-5">
        <div className="pt-4 mw500">
          <h3 className="">Product details</h3>
          <p>{product.description}</p>
        </div>
      </Col>

      <Row>
        <Col>
          <ReviewContainer productID={productID} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
