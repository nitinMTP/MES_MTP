import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { UserOutlined } from "@ant-design/icons";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

// icons
const icons = {
  PeopleAltOutlinedIcon,
  UserOutlined,
  TroubleshootIcon,
};

// ==============================|| MENU ITEMS - SETTINGS ||============================== //

const settingsItems = {
  id: "group-settings",
  title: "Settings",
  type: "group",
  children: [
    {
      id: "users",
      title: "Users",
      type: "item",
      url: "/users",
      icon: icons.PeopleAltOutlinedIcon,
      breadcrumbs: true,
    },
    {
      id: "trobleshoot",
      title: "Manage Machines",
      type: "item",
      url: "/manage-machines",
      icon: icons.TroubleshootIcon,
      breadcrumbs: true,
    },
  ],
};

export default settingsItems;
