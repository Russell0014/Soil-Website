import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useState } from "react";
import { CartConsumer } from "./CartContext";
import { AuthConsumer } from "./AuthContext";
import Cart from "./Cart";
import { toast } from "react-toastify";

const cart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="currentColor"
    width={30}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg>
);

const userImg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="bi bi-person-circle"
    viewBox="0 0 16 16"
  >
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
    <path
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
    />
  </svg>
);

function Header() {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = AuthConsumer();

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  //For the cart badge and button
  const { userCart } = CartConsumer();

  const CartButton = () => (
    <button className="cartButton mx-auto" onClick={toggleShow}>
      <div className="d-flex align-items-center">
        {cart}
        {userCart.length > 0 && (
          <Badge pill bg="danger" className="cartBadge">
            {userCart.length}
          </Badge>
        )}
      </div>
    </button>
  );

  const handleToggle = () => setExpanded(!expanded);
  return (
    <>
      <Navbar expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0"
            style={{ boxShadow: "none", color: "black" }}
            onClick={handleToggle}
          />

          <Link to="/" className="navbar-brand">
            <img src="/logo.png" width={50} alt="logo" />
          </Link>

          <Nav className="ml-auto cart2">
            <CartButton />
          </Nav>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Link
                to="/"
                className="mx-auto nav-link text-decoration-none text-reset"
                onClick={handleToggle}
              >
                Home
              </Link>

              <Link
                to="/diet-planner"
                className="mx-auto nav-link text-decoration-none text-reset"
                onClick={handleToggle}
              >
                Diet planner
              </Link>

              <Link
                to="/garden-helper"
                className="mx-auto nav-link text-decoration-none text-reset"
                onClick={handleToggle}
              >
                Garden helper
              </Link>

              <Link
                to="/specials"
                className="mx-auto nav-link text-decoration-none text-reset"
                onClick={handleToggle}
              >
                Specials
              </Link>
            </Nav>

            <Nav className="login-signup ml-auto">
              {user ? (
                <>
                  <span className="mx-auto nav-link user-email">
                    {user.email}
                  </span>
                  <Link
                    to="/profile"
                    className="mx-auto nav-link text-decoration-none text-reset user-profile"
                  >
                    {userImg}
                  </Link>

                  <Link
                    to="/profile"
                    className="mx-auto nav-link text-decoration-none text-reset user-profile-word"
                    onClick={handleToggle}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      toast.success("You logged out! See you soon!");
                      logout();
                    }}
                    className="mx-auto nav-link"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mx-auto custom-bg-secondary rounded login nav-link text-decoration-none text-reset"
                    onClick={handleToggle}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="mx-auto custom-bg-primary rounded login nav-link text-decoration-none text-reset"
                    onClick={handleToggle}
                  >
                    Signup
                  </Link>
                </>
              )}
            </Nav>

            <Nav className="ml-auto cart mx-5">
              <CartButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {show && <Cart toggleShowCart={toggleShow} />}{" "}
    </>
  );
}

export default Header;
