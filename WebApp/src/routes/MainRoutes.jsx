import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout/MainLayout";

import ProtectedRoutes from "./ProtectedRoutes";
import RedirectRoutes from "./RedirectRoutes";
import { element } from "prop-types";

// import Dashboard from "../pages/Dashboard";
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard/Dashboard")));
const MachineInfo = Loadable(
  lazy(() => import("../pages/MachineInfo/MachineInfo"))
);
const UserProfile = Loadable(
  lazy(() => import("../pages/Profile/UserProfile"))
);

const PriorityMachines = Loadable(
  lazy(() => import("../pages/PrioMachines/PriorityMachines"))
);

const Report = Loadable(lazy(() => import("../pages/Report/Report")));

const Users = Loadable(lazy(() => import("../pages/Setting/Users/Users")));

const ManageMachines = Loadable(
  lazy(() => import("../pages/Setting/Manage Machines/ManageMachines"))
);

// ==============================|| MAIN ROUTING ||============================== //

function MainRoutes(loggedIn, accessLevel) {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: loggedIn ? <Dashboard /> : <RedirectRoutes route={"/"} />,
        children: [],
      },
      {
        path: "/machine-info/:machineId",
        element: loggedIn ? <MachineInfo /> : <ProtectedRoutes />,
        children: [],
      },
      {
        path: "/priority-machines",
        element: <PriorityMachines />,
        children: [],
      },
      {
        path: "/report",
        element: <Report />,
        children: [],
      },
      {
        path: "/user-profile",
        element: loggedIn ? <UserProfile /> : <RedirectRoutes route={"/"} />,
        children: [],
      },
      {
        path: "/users",
        element: <Users />,
        children: [],
      },
      {
        path: "/manage-machines",
        element: <ManageMachines />,
        children: [],
      },
    ],
  };
}

export default MainRoutes;
