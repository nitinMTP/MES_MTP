// assets
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// icons
const icons = {
  LogoutOutlinedIcon,
  PersonOutlineOutlinedIcon,
  KeyOutlinedIcon,
  FileUploadIcon,
};

// ==============================|| MENU ITEMS - PROFILE ||============================== //

// const profileItems = {
//   id: "group-profile",
//   title: "User",
//   type: "group",
//   children: [
//     {
//       id: "user-profile",
//       title: "User Profile",
//       type: "item",
//       url: "/user-profile",
//       icon: icons.PersonOutlineOutlinedIcon,
//       breadcrumbs: true,
//     },
//     {
//       id: "change-password",
//       title: "Change Password",
//       type: "item",
//       url: "/change-password",
//       icon: icons.KeyOutlinedIcon,
//       breadcrumbs: true,
//     },
//     {
//       id: "site-settings",
//       title: "Doc Upload",
//       type: "item",
//       url: "/doc-upload",
//       icon: icons.SettingsIcon,
//       breadcrumbs: true,
//     },
//     {
//       id: "logout",
//       title: "Logout",
//       type: "button",
//       url: "/",
//       icon: icons.LogoutOutlinedIcon,
//       breadcrumbs: true,
//       command: "logout",
//     },
//   ],
// };

function profileItems(accessLevel) {
  var items = {
    id: "group-profile",
    title: "User",
    type: "group",
    children: [],
  };

  if (accessLevel <= 3) {
    items.children = [
      {
        id: "user-profile",
        title: "User Profile",
        type: "item",
        url: "/user-profile",
        icon: icons.PersonOutlineOutlinedIcon,
        breadcrumbs: true,
      },
      {
        id: "logout",
        title: "Logout",
        type: "button",
        url: "/",
        icon: icons.LogoutOutlinedIcon,
        breadcrumbs: true,
        command: "logout",
      },
    ];
  } else {
    items.children = [
      {
        id: "user-profile",
        title: "User Profile",
        type: "item",
        url: "/user-profile",
        icon: icons.PersonOutlineOutlinedIcon,
        breadcrumbs: true,
      },
      {
        id: "logout",
        title: "Logout",
        type: "button",
        url: "/",
        icon: icons.LogoutOutlinedIcon,
        breadcrumbs: true,
        command: "logout",
      },
    ];
  }

  return items;
}

export default profileItems;
