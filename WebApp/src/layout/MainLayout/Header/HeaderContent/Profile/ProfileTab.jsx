import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// assets

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const { loggedIn, accessLevel } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      {accessLevel <= 3 && (
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => {
            handleListItemClick(event, 2);
            navigate("/doc-upload");
          }}
        >
          <ListItemIcon>
            <FileUploadIcon />
          </ListItemIcon>
          <ListItemText primary="Doc Upload" />
        </ListItemButton>
      )}
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => {
          handleListItemClick(event, 0);
          navigate("/user-profile");
        }}
      >
        <ListItemIcon>
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => {
          handleListItemClick(event, 1);
          navigate("/change-password");
        }}
      >
        <ListItemIcon>
          <KeyOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 3} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;
