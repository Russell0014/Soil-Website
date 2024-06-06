import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";

type Props = {
  children: ReactNode;
};

// A route that requires users to be logged in

function ProtectedRoute({ children }: Props) {
  const { user } = AuthConsumer();

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
