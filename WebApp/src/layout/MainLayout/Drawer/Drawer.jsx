import PropTypes from "prop-types";
import { useMemo } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import DrawerHeader from "./DrawerHeader/DrawerHeader";

import { drawerWidth } from "../../../config";
import DrawerContent from "./DrawerContent/DrawerContent";
import MiniDrawerStyled from "./MiniDrawerStyled";
import ContactCard from "./DrawerContent/ContactCard";

const MainDrawer = ({ open, handleDrawerToggle, window }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  // responsive drawer container
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent open={open} />, [open]);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);
  const contactCard = useMemo(() => <ContactCard open={open} />, [open]);

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 13000 }}
      aria-label="mailbox folders"
    >
      {!matchDownMD ? (
        <>
          <MiniDrawerStyled variant="permanent" open={open}>
            {drawerHeader}
            {drawerContent}
            {contactCard}
          </MiniDrawerStyled>
        </>
      ) : (
        <>
          <Drawer
            container={container}
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: `1px solid ${theme.palette.divider}`,
                backgroundImage: "none",
                boxShadow: "inherit",
              },
            }}
          >
            {open && drawerHeader}
            {open && drawerContent}
            {open && contactCard}
          </Drawer>
        </>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default MainDrawer;
