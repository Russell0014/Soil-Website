import { Offcanvas } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { CartConsumer } from "./CartContext";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import { getCartTotal } from "../service/cart";

function Cart({ toggleShowCart }: { toggleShowCart: () => void }) {
  const nav = useNavigate();
  const { userCart, emptyUserCart } = CartConsumer();

  return (
    <Offcanvas show={true} onHide={toggleShowCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-2 fw-semibold">CART</Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="mx-4" />
      <Offcanvas.Body>
        {userCart.length === 0 ? (
          <>
            <p className="fs-5">Your cart is currently empty &#128557;</p>
          </>
        ) : (
          <CartItems />
        )}
      </Offcanvas.Body>

      {userCart.length != 0 && (
        <div className="p-3">
          <Button
            variant=""
            className="text-danger fs-6 mx-0 p-0 pb-2 w-100"
            onClick={async () => {
              await emptyUserCart();
            }}
          >
            <img
              width={35}
              height={35}
              src="../src/assets/emptyCart.svg"
              alt=""
            />
            Clear Cart
          </Button>
          <div className="d-flex justify-content-between pb-3">
            <h3 className="mb-0">Total</h3>
            <p className="fs-4 mb-0">${getCartTotal(userCart)}</p>
          </div>

          <Button
            className="w-100"
            variant="success"
            onClick={() => {
              toggleShowCart();
              nav("/checkout");
            }}
          >
            Check out
          </Button>
        </div>
      )}
    </Offcanvas>
  );
}

export default Cart;
