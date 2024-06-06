import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthConsumer } from "../AuthContext";
import { deleteUser } from "../../service/user";

function DeleteProfile() {
  const { user, logout } = AuthConsumer();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDelete = async () => {
    handleClose();

    if (await deleteUser(user!.user_id)) {
      toast.warning("Account deleted!", {
        position: "top-center",
      });
      logout();
    } else {
      toast.warning("Internal server error!");
    }
  };

  return (
    <div>
      <h3>Delete profile</h3>
      <hr />

      <Button variant="danger" onClick={handleShow}>
        Delete profile
      </Button>
      <p className="mt-3 text-danger fs-6">You cannot undo this action!</p>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            Confirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteProfile;
