import { useEffect, useRef, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { CartConsumer } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../service/cart";

const heart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="red"
    className="bi bi-heart-fill"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
    />
  </svg>
);

function ThankYou() {
  const nav = useNavigate();

  const {
    userCart: initialUserCart,
    isCheckedOut,
    setCheckedOut,
  } = CartConsumer();

  const [userCart, setUserCart] = useState<CartItem[]>(initialUserCart);

  useEffect(() => {
    const fetchData = async () => {
      setUserCart(initialUserCart);
    };

    fetchData();
  }, [initialUserCart]);

  const removedUserCart = useRef(userCart);

  document.title = "Checkout | Thank you";
  useEffect(() => {
    if (!isCheckedOut) nav("/specials");
    // else emptyUserCart();
  }, [isCheckedOut, nav, userCart]);

  return (
    <Container className="col-9 mb-5">
      <div className="m-5">
        <Link to="/" onClick={setCheckedOut}>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/long-arrow-left.png"
            alt="long-arrow-left"
            className="me-2"
          />
          Go home
        </Link>
      </div>

      <div className="d-flex gap-5 justify-content-center align-items-center">
        <img
          src="/logo.png"
          width={50}
          height={50}
          alt="logo"
          className="mr-1"
        />
        <>{heart}</>
      </div>
      <h1 className="display-4 text-center"> Thanks for your purchase!</h1>
      <div className="text-center mb-2">
        <p className="mb-0">Check out our: </p>
        <div className="d-flex justify-content-center gap-4">
          <Link to="/diet-planner" onClick={setCheckedOut}>
            Diet planner
          </Link>
          <Link to="/garden-help" onClick={setCheckedOut}>
            Garden helper
          </Link>
        </div>
      </div>
      <p className="text-center mb-5">- From the SOIL team</p>

      {removedUserCart.current.map((cartItem) => {
        return (
          <div
            key={cartItem.product_id}
            className="flexible-w mb-1 d-flex gap-3 border rounded-4 p-3 mx-auto"
            style={{ minWidth: 340, maxWidth: 540 }}
          >
            <Image
              key={cartItem.product_id}
              src={"/" + cartItem.Product.image}
              className="rounded-4"
              alt={cartItem.Product?.name}
              style={{ width: 150, height: 150, objectFit: "cover" }}
              fluid
            />

            <div className="flex-grow-1 flex-fill">
              <h4>
                {cartItem.Product?.name}{" "}
                <span className="fs-6">({cartItem.quantity})</span>
              </h4>
              <p>
                {cartItem.Product?.size} {cartItem.Product?.unit} -{"  "}
                <span>${cartItem.Product?.price}</span>
              </p>
              <p>
                <b>Total:</b> $
                {(cartItem.Product?.price * cartItem.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
    </Container>
  );
}

export default ThankYou;
