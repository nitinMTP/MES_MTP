// assets
import { BsBuildingFill } from "react-icons/bs";
import { SlEnergy } from "react-icons/sl";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

// icons
const icons = {
  BsBuildingFill,
  SlEnergy,
  StarOutlineIcon,
  TextSnippetIcon,
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
      icon: icons.BsBuildingFill,
      breadcrumbs: true,
    },
  ],
};

export default dashboardItems;
