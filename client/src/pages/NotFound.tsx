import { Link } from "react-router-dom";

function NotFound() {
  document.title = "Page Not Found";

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center p-5 my-5"
        style={{ height: "65vh" }}
      >
        <h2>404 Page Not found</h2>
        <Link to="/" className="fs-5" replace>
          Go home?
        </Link>
      </div>
    </>
  );
}

export default NotFound;
