import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  console.log(user);

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
