import { lazy } from "react";
import Loadable from "../components/Loadable";
import { Outlet } from "react-router";
// import Login from "../pages/Authentication/Login";

// project import

// render - login
// const AuthLogin = Loadable(lazy(() => import("pages/authentication/Login")));
// const AuthRegister = Loadable(
//   lazy(() => import("pages/authentication/Register"))
// );

const Login = Loadable(lazy(() => import("../pages/Authentication/Login")));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: (
    <>
      <Outlet />
    </>
  ),
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <>Register</>,
    },
  ],
};

export default LoginRoutes;
