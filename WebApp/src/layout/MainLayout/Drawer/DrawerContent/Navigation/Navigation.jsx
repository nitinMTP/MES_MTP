// material-ui
import { Box, Typography } from "@mui/material";
import NavGroup from "./NavGroup";
import menuItems from "../../../../../menu-items/menuItems";
import { useSelector } from "react-redux";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { mode } = useSelector((state) => state.siteConfig);
  const { loggedIn, accessLevel } = useSelector((state) => state.user);

  const navGroups = menuItems(loggedIn, accessLevel).items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} mode={mode} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
