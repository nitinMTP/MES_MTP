// assets
import DashboardIcon from "@mui/icons-material/Dashboard";

// icons
const icons = {
  DashboardIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboardItems = {
  id: "group-dashboard",
  title: "Overview",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Machines",
      type: "item",
      url: "/",
      icon: icons.DashboardIcon,
      breadcrumbs: true,
    },
  ],
};

export default dashboardItems;
