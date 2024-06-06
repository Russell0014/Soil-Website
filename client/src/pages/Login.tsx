import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { AuthConsumer } from "../components/AuthContext";
import useForm from "../utils/useForm";
import { validateLoginIn } from "../utils/login";
import { CartConsumer } from "../components/CartContext";

function Login() {
  const nav = useNavigate();
  const { user, login } = AuthConsumer();
  const { emptyUserCart } = CartConsumer();

  useEffect(() => {
    document.title = "SOIL | Login";
    if (user) {
      toast.success(`Welcome back ${user.username}!`);
      nav("/profile", { replace: true });
    }
  }, [user, nav]);

  const successLogin = async () => {
    // clear the non-logged users cart and products
    await emptyUserCart();

    login(values.email);

    nav("/", { replace: true });
    toast.success("Successfully logged in!");
  };

  const { values, handleChangeValues, handleSubmit, errors } = useForm(
    successLogin,
    validateLoginIn
  );

  return (
    <div
      className="d-flex justify-content-center p-5 my-3"
      data-bg-image="login"
    >
      <Form
        onSubmit={handleSubmit}
        className="p-5 custom-bg-secondary rounded-3 flexible-w"
      >
        <h2 className="mb-3">Login</h2>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={values.email || ""}
            onChange={handleChangeValues}
            placeholder="Enter email"
          />
          <Form.Text className="text-danger">{errors.email || ""}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={values.password || ""}
            onChange={handleChangeValues}
            placeholder="Enter password"
          />
          <Form.Text className="text-danger">{errors.password || ""}</Form.Text>
        </Form.Group>

        <p className="text-danger">{errors.msg || ""}</p>

        <Button
          variant="success"
          type="submit"
          className="mb-3 w-100 custom-btn-primary"
        >
          Login!
        </Button>

        <p>
          Not a user?{" "}
          <Link
            to="/signup"
            className="text-decoration-none text-reset fw-semibold"
          >
            Sign up for free!
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
