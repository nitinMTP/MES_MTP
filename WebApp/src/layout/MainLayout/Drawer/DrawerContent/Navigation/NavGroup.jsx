import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import NavItem from "./NavItem";

// material-ui
import { Box, List, Typography } from "@mui/material";

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item, mode }) => {
  const { drawerOpen } = useSelector((state) => state.menu);

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "collapse":
        return (
          <Typography
            key={menuItem.id}
            variant="caption"
            color="error"
            sx={{ p: 2.5 }}
          ></Typography>
        );
      case "item":
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={1}
            mode={mode}
            type={menuItem.type}
          />
        );
      case "button":
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={1}
            mode={mode}
            type={menuItem.type}
            command={menuItem.command}
          />
        );
      default:
        return (
          <Typography
            key={menuItem.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="overline" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0, overflow: "auto" }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
