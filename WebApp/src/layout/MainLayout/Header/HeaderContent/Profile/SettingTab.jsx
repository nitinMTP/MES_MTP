import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

// assets
import { UserOutlined } from "@ant-design/icons";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { useNavigate } from "react-router";

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => {
          handleListItemClick(event, 0);
          navigate("/users");
        }}
      >
        <ListItemIcon>
          <PeopleAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => {
          handleListItemClick(event, 1);
          navigate("/meters");
        }}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Meter Setting" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => {
          handleListItemClick(event, 2);
          navigate("/troubleshoot");
        }}
      >
        <ListItemIcon>
          <TroubleshootIcon />
        </ListItemIcon>
        <ListItemText primary="Troubleshoot" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
