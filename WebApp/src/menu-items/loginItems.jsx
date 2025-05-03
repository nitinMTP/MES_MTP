// assets
import { BiLogInCircle } from "react-icons/bi";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

// icons
const icons = {
  LogoutOutlinedIcon,
  LoginlinedIcon,
  PersonOutlineOutlinedIcon,
  KeyOutlinedIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const loginItems = {
  id: "group-login",
  title: "Login",
  type: "group",
  children: [
    {
      id: "login",
      title: "Login",
      type: "item",
      url: "/login",
      icon: icons.LoginlinedIcon,
      breadcrumbs: true,
    },
  ],
};

export default loginItems;
