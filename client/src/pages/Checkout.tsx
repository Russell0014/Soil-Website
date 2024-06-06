import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { CartConsumer } from "../components/CartContext";
import CartItems from "../components/CartItems";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { validateCheckout } from "../utils/checkout";
import useForm from "../utils/useForm";
import { getCartTotal, getCart } from "../service/cart";

function Checkout() {
  const nav = useNavigate();

  const { userCart, setCheckedOut, cartId } = CartConsumer();
  const [isLoading, setIsLoading] = useState(true);

  const checkout = () => {
    setCheckedOut();
    toast.success("Thanks for purchasing!");
    nav("/checkout/thankyou");
  };

  const { values, handleChangeValues, handleSubmit, errors } = useForm(
    checkout,
    validateCheckout
  );

  useEffect(() => {
    document.title = "Checkout";

    const fetchData = async () => {
      if (!cartId) return;
      let result = [];
      if (cartId) result = await getCart(cartId);
      if (result.length === 0) {
        toast.warning("Add items before checking out!");
        nav("/specials", { replace: true });
      } else setIsLoading(() => false);
    };

    fetchData();
  }, [cartId, userCart, nav]);

  return (
    <Container className="col-9 mb-5">
      <div>
        <h1 className="display-4 text-center pt-4">Checkout</h1>
      </div>
      <div className="mb-5">
        <Link to="/specials">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/long-arrow-left.png"
            alt="long-arrow-left"
            className="me-2"
          />
          Continue shopping
        </Link>
      </div>

      <Row className="justify-content-center">
        <Col md={8} className="mb-5">
          <Form onSubmit={handleSubmit}>
            <h3>Personal details</h3>
            <Form.Group className="d-flex flex-wrap mb-3 gap-3">
              <Form.Group className="flex-fill">
                <Form.Label htmlFor="fname">First name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  id="fname"
                  value={values.fname || ""}
                  placeholder="Enter first name"
                  onChange={handleChangeValues}
                />
                <Form.Text className="text-danger">
                  {errors.fname || ""}
                </Form.Text>
              </Form.Group>

              <Form.Group className="flex-fill">
                <Form.Label htmlFor="lname">Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  id="lname"
                  value={values.lname || ""}
                  onChange={handleChangeValues}
                  placeholder="Enter last name"
                />
                <Form.Text className="text-danger">
                  {errors.lname || ""}
                </Form.Text>
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                value={values.email || ""}
                onChange={handleChangeValues}
                placeholder="Enter email"
              />
              <Form.Text className="text-danger">
                {errors.email || ""}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                name="address"
                value={values.address || ""}
                onChange={handleChangeValues}
                placeholder="Enter delivery address"
              />
              <Form.Text className="text-danger">
                {errors.address || ""}
              </Form.Text>
            </Form.Group>

            <Form.Group className="d-flex flex-wrap justify-content-between gap-3 mb-3">
              <Form.Group className="flex-fill">
                <Form.Label htmlFor="country">Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  id="country"
                  onChange={handleChangeValues}
                  value={values.country || ""}
                />
                <Form.Text className="text-danger">
                  {errors.country || ""}
                </Form.Text>
              </Form.Group>

              <Form.Group className="flex-fill">
                <Form.Label htmlFor="state">State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  id="state"
                  onChange={handleChangeValues}
                  value={values.state || ""}
                />
                <Form.Text className="text-danger">
                  {errors.state || ""}
                </Form.Text>
              </Form.Group>

              <Form.Group className="flex-fill">
                <Form.Label htmlFor="postcode">Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="postcode"
                  id="postcode"
                  onChange={handleChangeValues}
                  value={values.postcode || ""}
                />
                <Form.Text className="text-danger">
                  {errors.postcode || ""}
                </Form.Text>
              </Form.Group>
            </Form.Group>

            <h3>Payment options</h3>
            <Form.Group className="d-flex flex-wrap mb-3 gap-3">
              <Form.Group className="flex-fill">
                <Form.Label htmlFor="cname">Name on card</Form.Label>
                <Form.Control
                  type="text"
                  name="cname"
                  id="cname"
                  onChange={handleChangeValues}
                  value={values.cname || ""}
                />
                <Form.Text className="text-danger d-block">
                  {errors.cname || ""}
                </Form.Text>
                <Form.Text className="fs-6">
                  Full name as displayed on card
                </Form.Text>
              </Form.Group>

              <Form.Group className="flex-fill">
                <Form.Label htmlFor="cnum">Credit card number</Form.Label>
                <Form.Control
                  type="text"
                  name="cnum"
                  id="cnum"
                  onChange={handleChangeValues}
                  value={values.cnum || ""}
                />
                <Form.Text className="text-danger">
                  {errors.cnum || ""}
                </Form.Text>
              </Form.Group>
            </Form.Group>

            <Form.Group className="d-flex flex-wrap mb-3 gap-3">
              <Form.Group className="flex-fill">
                <Form.Label htmlFor="cexp">Expiration</Form.Label>
                <Form.Control
                  type="date"
                  name="cexp"
                  id="cexp"
                  onChange={handleChangeValues}
                  value={values.cexp || ""}
                />
                <Form.Text className="text-danger">
                  {errors.cexp || ""}
                </Form.Text>
              </Form.Group>

              <Form.Group className="flex-fill">
                <Form.Label htmlFor="cccv">CCV</Form.Label>
                <Form.Control
                  type="text"
                  name="cccv"
                  id="cccv"
                  onChange={handleChangeValues}
                  value={values.cccv || ""}
                />
                <Form.Text className="text-danger">
                  {errors.cccv || ""}
                </Form.Text>
              </Form.Group>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Checkout
            </Button>
          </Form>
        </Col>

        <Col className="mh50">
          <Row className=" justify-content-center">
            {!isLoading ? (
              <Col className={window.innerWidth < 1472 ? "col-8" : "col-12"}>
                <h3 className="">Cart</h3>
                <CartItems />
                {userCart.length != 0 && (
                  <div className="p-3">
                    <div className="d-flex justify-content-between">
                      <h3 className="mb-0">Total</h3>
                      <p className="fs-4 mb-0">${getCartTotal(userCart)}</p>
                    </div>
                  </div>
                )}
              </Col>
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
