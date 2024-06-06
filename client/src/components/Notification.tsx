import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notification() {
  return (
    <ToastContainer
      closeOnClick
      pauseOnHover={false}
      hideProgressBar={true}
      autoClose={1000}
      stacked
      className={"text-center"}
      closeButton={false}
    />
  );
}

export default Notification;
