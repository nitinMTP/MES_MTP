import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import { useSelector } from "react-redux";

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  const { loggedIn, accessLevel } = useSelector((state) => state.user);

  return useRoutes([MainRoutes(loggedIn, accessLevel), LoginRoutes]);
}
