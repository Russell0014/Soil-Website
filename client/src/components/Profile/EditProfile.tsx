import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import useForm from "../../utils/useForm";

import { AuthConsumer } from "../AuthContext";
import { useReducer, useRef, useState } from "react";
import { validateEdit, checkIfEdited } from "../../utils/edit";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../service/user";

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

type EditDisableStates = {
  username: boolean;
  email: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
  oldPassword: boolean;
};

type EditInputs = keyof EditDisableStates;

type InputAction = {
  action: "EDIT" | "RESET" | "CANCEL" | "";
  key: EditInputs;
};

function disableReducer(state: EditDisableStates, action: InputAction) {
  switch (action.action) {
    case "CANCEL":
    case "EDIT":
      return {
        ...state,
        [action.key]: !state[action.key],
      };
    case "RESET":
      return {
        ...state,
        [action.key]: true,
      };
    default:
      return {
        ...state,
      };
  }
}

function EditProfile() {
  const [isDisable, dispatch] = useReducer(disableReducer, {
    username: true,
    email: true,
    newPassword: true,
    confirmNewPassword: true,
    oldPassword: true,
  });
  const [isShow, setIsShow] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });
  const [isEdited, setIsEdited] = useState(false);
  const prevValues = useRef<Record<string, string>>({});
  const { user, login } = AuthConsumer();

  const { values, errors, handleSubmit, handleChangeValues } = useForm(
    async () => {
      if (await updateUserDetails(user!.user_id, values)) {
        toast.warning("Internal server error");
        return;
      }
      login(values.email); // login with possibly new email

      handleReset("newPassword");
      handleReset("oldPassword");

      toast.info("Successfully edited profile");
      setIsEdited(false);
    },
    async () => {
      return await validateEdit(values, user);
    }
  );

  const handleEdit = (key: EditInputs) => {
    let editAnotherInput = false;
    Object.keys(isDisable).forEach((input) => {
      if (!isDisable[input as keyof typeof isDisable] && input != key) {
        editAnotherInput = true;
        errors[input] = `Save ${input} first!`;
      }
    });

    // user tried to edit another input
    if (editAnotherInput) {
      dispatch({ action: "", key });
      return;
    }

    errors[key] = "";
    prevValues.current[key] = values[key]; // save old value incase of cancelling
    dispatch({ action: "EDIT", key });
    setIsEdited(checkIfEdited(values, user));
  };

  const handleCancel = (key: EditInputs) => {
    if (key == "username" || key == "email")
      values[key] = values[key] ? prevValues.current[key] : user![key];
    // reset back to og user values or prev value edited
    else values[key] = values[key] || values[key] == "" ? values[key] : "";
    errors[key] = "";
    dispatch({ action: "CANCEL", key });
  };

  const handleReset = (key: EditInputs) => {
    if (key == "username" || key == "email")
      values[key] = user![key]; // reset back
    else if (key == "newPassword") {
      // just incase if user changes mind on password we don't want to remember these values
      delete values.newPassword;
      delete errors.newPassword;
      delete values.confirmNewPassword;
      delete errors.confirmNewPassword;
    } else values[key] = "";

    delete values.oldPassword;
    delete errors.oldPassword;
    dispatch({ action: "RESET", key });
    setIsEdited(checkIfEdited(values, user));
  };

  // if values is not there and it is not an empty string it falls back to user input
  const setInputValue = (i: "username" | "email") => {
    return (values[i] =
      values[i] || values[i] == "" ? values[i] : user![i] || "");
  };

  // is not editing and not same values
  const canResetEditInput = (i: EditInputs) => {
    if (i == "username" || i == "email")
      return isDisable[i] && values[i] != user![i];
    else return isDisable[i] && values[i];
  };

  const showPassword = (show: "newPassword" | "confirmNewPassword") => {
    setIsShow({ ...isShow, [show]: !isShow[show] });
  };

  return (
    <>
      <h3>My profile</h3>
      <p>You joined: {user?.date_joined.toLocaleString().slice(0, -14)}</p>
      <hr />
      <Form onSubmit={handleSubmit} className="mb-5">
        <Form.Group className="mb-3">
          <h4>Username</h4>

          <InputGroup className="mb-3">
            <Form.Control
              name="username"
              onChange={handleChangeValues}
              value={setInputValue("username")}
              placeholder="Username"
              disabled={isDisable.username}
            />
            <InputGroup.Text
              onClick={() => handleEdit("username")}
              className="user-select-none"
            >
              {isDisable.username ? "Edit" : "Save"}
            </InputGroup.Text>

            {!isDisable.username && (
              <InputGroup.Text
                onClick={() => handleCancel("username")}
                className="user-select-none"
              >
                Cancel
              </InputGroup.Text>
            )}

            {canResetEditInput("username") && (
              <InputGroup.Text
                onClick={() => handleReset("username")}
                className="user-select-none"
              >
                Reset
              </InputGroup.Text>
            )}
          </InputGroup>
          <Form.Text className="text-danger">{errors.username || ""}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <h4>Email</h4>
          <InputGroup className="mb-3">
            <Form.Control
              name="email"
              value={setInputValue("email")}
              onChange={handleChangeValues}
              placeholder="Enter email"
              disabled={isDisable.email}
            />
            <InputGroup.Text
              onClick={() => handleEdit("email")}
              className="user-select-none"
            >
              {isDisable.email ? "Edit" : "Save"}
            </InputGroup.Text>

            {!isDisable.email && (
              <InputGroup.Text
                onClick={() => handleCancel("email")}
                className="user-select-none"
              >
                Cancel
              </InputGroup.Text>
            )}

            {canResetEditInput("email") && (
              <InputGroup.Text
                onClick={() => handleReset("email")}
                className="user-select-none"
              >
                Reset
              </InputGroup.Text>
            )}
          </InputGroup>
          <Form.Text className="text-danger">{errors.email || ""}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <h4>Set new password</h4>
          <InputGroup className="mb-3">
            <Form.Control
              type={isShow.newPassword ? "text" : "password"}
              name="newPassword"
              onChange={handleChangeValues}
              value={values.newPassword || ""}
              placeholder="Enter new password"
              disabled={isDisable.newPassword}
            />
            <InputGroup.Text
              onClick={() => handleEdit("newPassword")}
              className="user-select-none"
            >
              {isDisable.newPassword ? "Edit" : "Save"}
            </InputGroup.Text>

            {!isDisable.newPassword && (
              <InputGroup.Text
                onClick={() => handleCancel("newPassword")}
                className="user-select-none"
              >
                Cancel
              </InputGroup.Text>
            )}

            {canResetEditInput("newPassword") && isDisable.newPassword && (
              <InputGroup.Text
                onClick={() => {
                  handleReset("newPassword");
                }}
                className="user-select-none"
              >
                Reset
              </InputGroup.Text>
            )}

            <InputGroup.Text
              onClick={() => {
                showPassword("newPassword");
              }}
              className="user-select-none"
            >
              View password
            </InputGroup.Text>
          </InputGroup>
          {errors.newPassword === "!" ? (
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
              {errors.newPassword || ""}
            </Form.Text>
          )}
        </Form.Group>

        {/* show if password is not disabled or when we can reset it and when disabled (meaning password is changed) */}
        {(!isDisable.newPassword ||
          (canResetEditInput("newPassword") && isDisable.newPassword)) && (
          <Form.Group className="mb-3">
            <Form.Label>Confirm new password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={isShow.confirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                onChange={handleChangeValues}
                value={values.confirmNewPassword || ""}
                placeholder="Confirm new password"
                disabled={isDisable.newPassword}
              />
              <InputGroup.Text
                onClick={() => {
                  showPassword("confirmNewPassword");
                }}
                className="user-select-none"
              >
                View password
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">
              {errors.confirmNewPassword || ""}
            </Form.Text>
          </Form.Group>
        )}

        {isEdited && (
          <>
            <Form.Group className="mb-3">
              <h4>Confirm old password</h4>
              <Form.Control
                type="password"
                name="oldPassword"
                className="mb-3"
                onChange={handleChangeValues}
                value={values.oldPassword || ""}
                placeholder="Confirm current password"
              />
              <Form.Text className="text-danger">
                {errors.oldPassword || ""}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Edit Profile
            </Button>
          </>
        )}
      </Form>
    </>
  );
}

export default EditProfile;
