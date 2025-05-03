import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { AppBar, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent/HeaderContent";

export default function Header({ open, handleDrawerToggle }) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  // common header
  const mainHeader = (
    <Toolbar sx={{}}>
      <IconButton
        // disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        // color="secondary"
        sx={
          {
            // // bgcolor: open ? iconBackColorOpen : iconBackColor,
            // ml: { xs: 0, lg: -2 },
          }
        }
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      // borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
}

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};
