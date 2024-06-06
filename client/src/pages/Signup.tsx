import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Tooltip } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { toast } from "react-toastify";

import { AuthConsumer } from "../components/AuthContext";
import useForm from "../utils/useForm";
import { signupUser, validateSignUp } from "../utils/signup";

const info = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-info-circle"
    viewBox="0 0 16 16"
  >
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
  </svg>
);

function Signup() {
  const nav = useNavigate();
  const { user } = AuthConsumer();

  useEffect(() => {
    document.title = "SOIL | Signup";
    if (user) {
      toast.success(`Welcome back ${user.username}!`);
      nav("/profile", { replace: true });
    }
  }, [user, nav]);

  const successSignUp = async () => {
    if (await signupUser(values)) {
      toast.success(`Successfully signed up!`);
      nav("/login", { replace: true });
    } else {
      toast.success(`Server error, signup fail`);
    }
  };

  const { values, handleChangeValues, handleSubmit, errors } = useForm(
    successSignUp,
    validateSignUp
  );

  return (
    <div
      className="d-flex justify-content-center p-5 my-3"
      data-bg-image="signup"
    >
      <Form
        onSubmit={handleSubmit}
        className="p-5 custom-bg-secondary rounded-3 flexible-w"
        method="POST"
        noValidate
      >
        <h2 className="mb-3">Signup</h2>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={handleChangeValues}
            value={values.username || ""}
            placeholder="Username"
          />
          <Form.Text className="text-danger">{errors.username || ""}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChangeValues}
            value={values.email || ""}
            placeholder="Enter Email"
          />
          <Form.Text className="text-danger">{errors.email || ""}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChangeValues}
            value={values.password || ""}
            placeholder="Enter password"
          />
          {errors.password === "!" ? (
            <OverlayTrigger
              delay={{ show: 150, hide: 150 }}
              placement="right"
              overlay={
                <Tooltip placement="right" className="p-2">
                  <>
                    <Form.Text className="text-white d-block">
                      - Password must be &ge; 10 characters in length
                    </Form.Text>
                    <Form.Text className="text-white d-block">
                      - Has at least one lower and upper case character (A-Z,
                      a-z)
                    </Form.Text>
                    <Form.Text className="text-white d-block">
                      - Has at least one number (0-9)
                    </Form.Text>
                    <Form.Text className="text-white  d-block">
                      - Has at least one special characters (eg. _*?!)
                    </Form.Text>
                  </>
                </Tooltip>
              }
            >
              <Form.Text className="text-danger d-inline-flex align-items-center gap-1">
                {info}
                <span>Invalid password</span>
              </Form.Text>
            </OverlayTrigger>
          ) : (
            <Form.Text className="text-danger">
              {errors.password || ""}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            name="cPassword"
            onChange={handleChangeValues}
            value={values.cPassword || ""}
            placeholder="Confirm password"
          />
          <Form.Text className="text-danger">
            {errors.cPassword || ""}
          </Form.Text>
        </Form.Group>

        <Button variant="success" type="submit" className="mb-3 w-100">
          Sign up!
        </Button>

        <p className="mb-0">
          Already a user?{" "}
          <Link
            to="/login"
            className="text-decoration-none text-reset fw-semibold"
          >
            Login!
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Signup;
