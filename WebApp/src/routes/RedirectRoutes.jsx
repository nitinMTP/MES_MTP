import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";

export default function RedirectRoutes({ route }) {
  const { firstLogIn } = useSelector((state) => state.user);

  return firstLogIn ? <Navigate to={route} /> : <ProtectedRoutes />;
}
